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

/* Business enquiry email delivery */
const BUSINESS_EMAIL = 'connect@indutradex.com';
const quoteForm = document.querySelector('#quoteForm');
const formStatus = document.querySelector('#formStatus');

quoteForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitButton = quoteForm.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';
  formStatus.textContent = 'Sending your enquiry…';

  const data = new FormData(quoteForm);
  data.append('_subject', `New B2B Enquiry - ${data.get('product')} - ${data.get('company')}`);
  data.append('_captcha', 'false');
  data.append('_template', 'table');
  data.append('_replyto', data.get('email'));

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${BUSINESS_EMAIL}`, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: data
    });

    if (!response.ok) throw new Error('Submission failed');

    quoteForm.reset();
    formStatus.textContent = 'Thanks for your support. Your enquiry has been sent successfully.';
    alert('Thanks for your support! Your enquiry has been sent successfully.');
  } catch (error) {
    formStatus.textContent = 'We could not send the enquiry right now. Please email connect@indutradex.com directly.';
    alert('Sorry, we could not send your enquiry. Please try again or email connect@indutradex.com.');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});

/* Home button: always return to the very top and close the mobile menu. */
document.querySelectorAll('a[href="#top"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    nav?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    history.replaceState(null, document.title, window.location.pathname + window.location.search);
  });
});

/* Show both WhatsApp numbers under ONE WhatsApp label. */
const whatsapp = document.querySelector('.contact-details a[href*="wa.me"]');
if (whatsapp) {
  whatsapp.href = 'https://wa.me/919973060050';
  whatsapp.target = '_blank';
  whatsapp.rel = 'noopener';
  whatsapp.innerHTML = '<span>WhatsApp</span>+91 99730 60050<br>+977 9717237730';
}

/* Premium contact icons — elegant inline SVGs, no external icon library needed. */
const contactDetails = document.querySelector('.contact-details');
if (contactDetails) {
  const icons = {
    Email: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg>',
    WhatsApp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a8.5 8.5 0 0 1-12.7 7.4L4 20l1.2-3.1A8.5 8.5 0 1 1 20 11.5Z"></path><path d="M8.8 8.2c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.3 0 .5-.2.7l-.5.5c.5 1 1.3 1.8 2.3 2.3l.5-.5c.2-.2.4-.3.7-.2l1.7.7c.3.1.4.3.4.5v.5c0 .3 0 .5-.5.7-.5.2-1.7.2-3.1-.5-1.4-.7-2.6-1.8-3.5-3.1-.9-1.3-1.1-2.6-.9-3.2Z"></path></svg>',
    Export: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 16V5a2 2 0 0 1 2-2h8"></path><path d="M14 3h4a2 2 0 0 1 2 2v4"></path><path d="m13 11 7-7"></path><path d="M20 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2"></path></svg>',
    Origin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.1 7-12A7 7 0 0 0 5 9c0 5.9 7 12 7 12Z"></path><circle cx="12" cy="9" r="2.3"></circle></svg>'
  };

  contactDetails.querySelectorAll(':scope > a, :scope > div').forEach((item) => {
    const label = item.querySelector('span');
    if (!label) return;
    const name = label.textContent.trim();
    if (!icons[name]) return;
    label.innerHTML = `${icons[name]}<span class="contact-label">${name}</span>`;
    item.classList.add('contact-item-premium');
  });
}
