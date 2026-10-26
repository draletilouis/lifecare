/* Directory search (departments and doctors): filters the listed items as the visitor types.
   Items carry data-search with their keywords; groups are .directory__group sections. */
(function initDirectory() {
  const input = document.getElementById('deptSearch');
  const status = document.getElementById('deptStatus');
  const empty = document.getElementById('deptEmpty');
  if (!input) return;

  const items = Array.from(document.querySelectorAll('[data-search]'));
  const groups = Array.from(document.querySelectorAll('.directory__group'));
  const total = items.length;
  const noun = document.querySelector('.doctor-card') ? ['clinician', 'clinicians'] : ['department', 'departments'];

  const filter = () => {
    const words = input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let shown = 0;
    items.forEach((item) => {
      const match = words.every((word) => item.dataset.search.includes(word));
      item.hidden = !match;
      if (match) shown += 1;
    });
    groups.forEach((group) => {
      group.hidden = !group.querySelector('[data-search]:not([hidden])');
    });
    empty.hidden = shown > 0;
    status.textContent = words.length ? `${shown} of ${total} ${noun[1]} match` : `${total} ${total === 1 ? noun[0] : noun[1]}`;
  };

  input.addEventListener('input', filter);
  filter();
})();
