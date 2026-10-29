/* "What to bring" checklists: ticks are remembered on this device, and the list can be sent on
   WhatsApp to the person bringing the patient (WhatsApp lets the visitor choose the contact). */
(function initChecklists() {
  document.querySelectorAll('[data-checklist]').forEach((list) => {
    const key = `lifecare-checklist-${list.dataset.checklist}`;
    const boxes = Array.from(list.querySelectorAll('input[type="checkbox"]'));
    const share = list.querySelector('[data-checklist-share]');
    const count = list.querySelector('[data-checklist-count]');
    const label = (box) => box.closest('label').textContent.trim();

    let saved = [];
    try { saved = JSON.parse(localStorage.getItem(key) || '[]'); } catch (error) { saved = []; }
    boxes.forEach((box, i) => { box.checked = saved.includes(i); });

    const update = () => {
      const ticked = boxes.filter((box) => box.checked).length;
      if (count) count.textContent = ticked ? `${ticked} of ${boxes.length} packed` : '';
      try { localStorage.setItem(key, JSON.stringify(boxes.map((box, i) => (box.checked ? i : null)).filter((i) => i !== null))); } catch (error) { /* private browsing */ }
      if (share) {
        const title = list.querySelector('h2, h3');
        const lines = boxes.map((box) => `${box.checked ? '✓' : '•'} ${label(box)}`);
        const text = `${title ? title.textContent.trim() : 'Please bring'} (Life Care Hospital, Arua):\n${lines.join('\n')}`;
        share.href = `https://wa.me/?text=${encodeURIComponent(text)}`;
      }
    };

    boxes.forEach((box) => box.addEventListener('change', update));
    update();
  });
})();
