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

/* Contact section: replace text labels with clean, accessible icons. */
const contactDetails = document.querySelector('.contact-details');
if (contactDetails) {
  const labels = contactDetails.querySelectorAll(':scope > a > span, :scope > div > span');
  const iconMap = {
    Email: ['✉', 'Email'],
    WhatsApp: ['◉', 'WhatsApp'],
    Export: ['⇄', 'Export'],
    Origin: ['⌖', 'Origin']
  };

  labels.forEach((label) => {
    const key = label.textContent.trim();
    const icon = iconMap[key];
    if (icon) {
      label.textContent = icon[0];
      label.setAttribute('aria-label', icon[1]);
      label.setAttribute('title', icon[1]);
      label.classList.add('contact-icon');
    }
  });
}

/* Show both WhatsApp numbers under ONE WhatsApp icon. */
const whatsapp = document.querySelector('.contact-details a[href*="wa.me"]');
if (whatsapp) {
  whatsapp.href = 'https://wa.me/919973060050';
  whatsapp.target = '_blank';
  whatsapp.rel = 'noopener';
  whatsapp.innerHTML = '<span class="contact-icon" aria-label="WhatsApp" title="WhatsApp">◉</span>+91 99730 60050<br>+977 9717237730';
}
