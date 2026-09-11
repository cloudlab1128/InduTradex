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
