const nav = document.querySelector('#mainNav');
const toggle = document.querySelector('.menu-toggle');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

document.querySelectorAll('.nav-dropdown > a').forEach(a => {
  a.addEventListener('click', e => {
    if (window.innerWidth <= 800) {
      e.preventDefault();
      a.parentElement.classList.toggle('open');
    }
  });
});

/* CHANGE THIS EMAIL BEFORE PUBLISHING */
const BUSINESS_EMAIL = "connect@indutradex.com";

document.querySelector('#quoteForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const form = new FormData(e.target);
  const subject = `B2B Enquiry - ${form.get('product')} - ${form.get('company')}`;
  const body = [
    `Name: ${form.get('name')}`,
    `Company: ${form.get('company')}`,
    `Business Email: ${form.get('email')}`,
    `WhatsApp / Phone: ${form.get('phone')}`,
    `Country: ${form.get('country')}`,
    `Product: ${form.get('product')}`,
    `Quantity: ${form.get('quantity')}`,
    `Destination: ${form.get('destination')}`,
    ``,
    `Requirement:`,
    `${form.get('message') || 'N/A'}`
  ].join('\n');
  window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector('#formStatus').textContent = 'Your email client should open with the enquiry prepared. If it does not, email us directly.';
});
