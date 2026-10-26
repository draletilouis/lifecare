/* Appointment requests and contact enquiries.

   Where requests go
   -----------------
   FORM_ENDPOINT is a form service that accepts a POST of form fields and answers with JSON,
   such as Formspree (https://formspree.io/f/your-id) or Web3Forms. Requests then arrive by email.

   While FORM_ENDPOINT is empty, or if the service cannot be reached, the request is handed to
   WhatsApp instead: the visitor's WhatsApp opens with the request written out, addressed to the
   hospital's WhatsApp number (the form's data-whatsapp, set from data/site.js by the build).
   Nothing is sent until the visitor presses Send in WhatsApp.

   The submit button is disabled in the HTML and enabled here, so a form can never be sent
   by the browser itself (with its fields in the address) before this script has loaded. */
const FORM_ENDPOINT = '';

(function initRequestForms() {
  const forms = document.querySelectorAll('form[data-request-form]');
  if (!forms.length) return;

  const params = new URLSearchParams(window.location.search);

  forms.forEach((form) => {
    const type = form.dataset.requestForm; // "appointment" or "contact"
    const success = form.querySelector('[data-form-success]');
    const failure = form.querySelector('[data-form-error]');
    const submit = form.querySelector('button[type="submit"]');
    const submitLabel = submit.innerHTML;

    /* Department and package pages link here with ?department=<slug> or ?package=<id>; choose them in the lists. */
    ['department', 'package'].forEach((name) => {
      const select = form.elements[name];
      if (!select || !params.get(name)) return;
      const option = select.querySelector(`option[value="${CSS.escape(params.get(name))}"]`);
      if (option) select.value = option.value;
    });

    /* Appointments can only be requested from today onwards. */
    const date = form.elements.date;
    if (date) {
      const today = new Date();
      const iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      date.min = iso;
    }

    /* Show the insurer field only for insured patients. */
    const insurer = form.querySelector('[data-insurer]');
    if (insurer) {
      const update = () => {
        insurer.hidden = form.elements.payment.value !== 'Insurance or employer scheme';
      };
      form.querySelectorAll('input[name="payment"]').forEach((input) => input.addEventListener('change', update));
      update();
    }

    const fieldOf = (control) => control.closest('.field');

    const setError = (control, message) => {
      const field = fieldOf(control);
      if (!field) return;
      let error = field.querySelector('.field__error');
      if (!message) {
        field.classList.remove('has-error');
        control.removeAttribute('aria-invalid');
        error?.remove();
        return;
      }
      field.classList.add('has-error');
      control.setAttribute('aria-invalid', 'true');
      if (!error) {
        error = document.createElement('p');
        error.className = 'field__error';
        error.id = `${control.id || control.name}-error`;
        field.appendChild(error);
        control.setAttribute('aria-describedby', [control.getAttribute('aria-describedby'), error.id].filter(Boolean).join(' '));
      }
      error.textContent = message;
    };

    const validate = () => {
      let first = null;
      const check = (control, message) => {
        setError(control, message);
        if (message && !first) first = control;
      };

      Array.from(form.elements).forEach((control) => {
        if (!control.name || control.type === 'hidden' || control.name === 'company') return;
        if (control.type === 'radio') return;
        const value = control.type === 'checkbox' ? control.checked : control.value.trim();
        if (control.required && !value) {
          check(control, control.type === 'checkbox' ? 'Please tick this box to continue.' : 'Please fill in this field.');
          return;
        }
        if (control.name === 'phone' && value && control.value.replace(/\D/g, '').length < 9) {
          check(control, 'Please enter a full phone number, for example 0772 123 456.');
          return;
        }
        if (control.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          check(control, 'Please check the email address.');
          return;
        }
        if (control.name === 'date' && value && control.min && value < control.min) {
          check(control, 'Please choose today or a later date.');
          return;
        }
        check(control, '');
      });

      if (first) first.focus();
      return !first;
    };

    form.addEventListener('input', (event) => {
      if (fieldOf(event.target)?.classList.contains('has-error')) setError(event.target, '');
    });

    const value = (name) => {
      const control = form.elements[name];
      if (!control) return '';
      if (control instanceof RadioNodeList) return control.value;
      if (control.tagName === 'SELECT') return control.selectedOptions[0]?.value ? control.selectedOptions[0].textContent.trim() : '';
      return control.value.trim();
    };

    const readableDate = (iso) => {
      if (!iso) return '';
      const [y, m, d] = iso.split('-').map(Number);
      return new Date(y, m - 1, d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    };

    /* The request written out as plain text. Optional lines left empty are skipped. */
    const message = () => {
      const optional = (label, text) => (text ? `${label}: ${text}` : null);
      if (type === 'referral') {
        return [
          'Life Care Hospital: patient referral',
          '',
          `From: ${value('name')}, ${value('facility')} (${value('referrerType')})`,
          `Phone: ${value('phone')}`,
          `Service needed: ${value('department')}`,
          `Patient: ${value('patient')}`,
          `Urgency: ${value('urgency')}`,
          `Reason: ${value('notes')}`,
        ].join('\n');
      }
      const lines = type === 'appointment'
        ? [
            'Hello Life Care Hospital, I would like to request an appointment.',
            '',
            `Name: ${value('name')}`,
            `Phone: ${value('phone')}`,
            optional('Email', value('email')),
            `Department: ${value('department')}`,
            `Preferred date: ${readableDate(value('date'))}${value('time') ? `, ${value('time').toLowerCase()}` : ''}`,
            optional('Patient', value('visit')),
            optional('Payment', value('payment') && `${value('payment')}${value('insurer') ? ` (${value('insurer')})` : ''}`),
            optional('Health check package', value('package')),
            optional('Note', value('notes')),
          ]
        : [
            'Hello Life Care Hospital,',
            '',
            value('message'),
            '',
            `Name: ${value('name')}`,
            `Phone: ${value('phone')}`,
            optional('Email', value('email')),
            optional('About', value('topic')),
          ];
      return lines.filter((line) => line !== null).join('\n');
    };

    const show = (element, html) => {
      if (!element) return;
      if (html) element.querySelector('[data-text]').innerHTML = html;
      element.hidden = false;
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const whatsappUrl = () => `${form.dataset.whatsapp}?text=${encodeURIComponent(message())}`;

    const handOffToWhatsApp = () => {
      const url = whatsappUrl();
      window.open(url, '_blank', 'noopener');
      show(success, `WhatsApp has opened with your ${{ appointment: 'request', referral: 'referral' }[type] || 'message'} written out. <strong>Press Send in WhatsApp</strong> to deliver it. WhatsApp did not open? <a href="${url}" target="_blank" rel="noopener noreferrer">Open it here</a>.`);
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (success) success.hidden = true;
      if (failure) failure.hidden = true;
      if (!validate()) return;

      /* The hidden "company" field is left empty by people and filled in by spam robots. */
      if (form.elements.company?.value) {
        show(success);
        form.reset();
        return;
      }

      if (!FORM_ENDPOINT) {
        handOffToWhatsApp();
        return;
      }

      submit.disabled = true;
      submit.textContent = 'Sending…';
      try {
        const data = new FormData(form);
        data.set('summary', message());
        const subjects = {
          appointment: `Appointment request: ${value('department')}`,
          referral: `Patient referral from ${value('facility')}: ${value('department')}`,
          contact: `Website enquiry: ${value('topic') || 'General'}`,
        };
        data.set('_subject', subjects[type] || subjects.contact);
        const response = await fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error(`Form service answered ${response.status}`);
        form.reset();
        show(success);
      } catch (error) {
        console.error(error);
        show(failure);
      } finally {
        submit.disabled = false;
        submit.innerHTML = submitLabel;
      }
    });

    form.querySelector('[data-whatsapp-fallback]')?.addEventListener('click', (event) => {
      event.preventDefault();
      if (validate()) handOffToWhatsApp();
    });

    submit.disabled = false;
  });
})();
