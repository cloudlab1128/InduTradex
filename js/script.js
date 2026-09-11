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

/* ==========================================================
   InduTradex Stage 1 — Premium Website AI Chat Widget
   Front-end only: menu + smart product/business responses.
   Stage 2 will connect this interface to a real AI backend/API.
   ========================================================== */
(() => {
  if (document.querySelector('#indxChatPanel')) return;

  const chatMarkup = `
    <button class="indx-chat-launcher" id="indxChatLauncher" type="button" aria-expanded="false" aria-controls="indxChatPanel">
      <span class="indx-chat-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 11.5a8.5 8.5 0 0 1-12.7 7.4L4 20l1.2-3.1A8.5 8.5 0 1 1 20 11.5Z"></path><path d="M8 11h.01M12 11h.01M16 11h.01"></path></svg></span>
      <span>Chat with InduTradex</span>
    </button>
    <section class="indx-chat-panel" id="indxChatPanel" aria-label="InduTradex AI assistant" aria-hidden="true">
      <div class="indx-chat-head">
        <div class="indx-chat-brand">
          <div class="indx-chat-avatar">I</div>
          <div><div class="indx-chat-title">InduTradex AI Assistant</div><span class="indx-chat-subtitle">B2B sourcing • Export • Private Label</span></div>
        </div>
        <button class="indx-chat-close" id="indxChatClose" type="button" aria-label="Close chat">×</button>
      </div>
      <div class="indx-chat-messages" id="indxChatMessages" role="log" aria-live="polite"></div>
      <div class="indx-chat-input">
        <input id="indxChatInput" type="text" maxlength="500" autocomplete="off" placeholder="Ask about products, bulk supply…" aria-label="Message">
        <button class="indx-chat-send" id="indxChatSend" type="button" aria-label="Send message">→</button>
      </div>
      <div class="indx-chat-note">Stage 1 preview • AI connection will be added in Stage 2</div>
    </section>`;

  document.body.insertAdjacentHTML('beforeend', chatMarkup);

  const launcher = document.querySelector('#indxChatLauncher');
  const panel = document.querySelector('#indxChatPanel');
  const close = document.querySelector('#indxChatClose');
  const messages = document.querySelector('#indxChatMessages');
  const input = document.querySelector('#indxChatInput');
  const send = document.querySelector('#indxChatSend');

  const WA_NUMBER = '919973060050';
  const waIcon = '<svg viewBox="0 0 24 24"><path d="M20 11.5a8.5 8.5 0 0 1-12.7 7.4L4 20l1.2-3.1A8.5 8.5 0 1 1 20 11.5Z"></path><path d="M8.8 8.2c.2-.5.4-.5.7.4l.7 1.7c.1.3 0 .5-.2.7l-.5.5c.5 1 1.3 1.8 2.3 2.3l.5-.5c.2-.2.4-.3.7-.2l1.7.7c.3.1.4.3.4.5v.5c0 .3 0 .5-.5.7"></path></svg>';

  const productReplies = {
    makhana: `Premium Makhana / Fox Nuts are available for B2B sourcing. Current site information covers 3–4 Sutta, 5 Sutta and 6 Sutta & above grades. For exact availability, pricing, MOQ and specifications, I can connect you with the InduTradex team.`,
    roasted: `Roasted & Flavoured Makhana is offered in modern snack formats, with flavour options such as masala, peri peri and pudina. Private-label discussions can be based on your project requirements.`,
    turmeric: `InduTradex sources Indian turmeric for food businesses, wholesalers, distributors and international buyers, including whole and powder formats. Exact specifications and commercial terms are confirmed per enquiry.`,
    spices: `Indian Spices can be sourced in whole, ground and blended formats for commercial food production, wholesale and retail. Tell me the spice, quantity and destination and I can guide you to an enquiry.`,
    dryfruits: `Premium Dry Fruits are available for wholesale, retail, food-service and distribution requirements. Availability, specifications and pricing depend on the product and order requirement.`,
    private: `Private-label projects can cover suitable Makhana and food products. The usual discussion includes product, flavour, packaging, MOQ, branding and export feasibility.`
  };

  function addMessage(text, who = 'bot') {
    const div = document.createElement('div');
    div.className = `indx-msg ${who}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function addQuickButtons(items) {
    const wrap = document.createElement('div');
    wrap.className = 'indx-quick';
    items.forEach(item => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = item.label;
      button.dataset.action = item.action || '';
      button.addEventListener('click', () => handleAction(item.action, item.label));
      wrap.appendChild(button);
    });
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  function addWhatsAppButton() {
    const wrap = document.createElement('div');
    wrap.className = 'indx-quick';
    const a = document.createElement('a');
    a.className = 'indx-quick button indx-wa-handoff';
    a.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hello InduTradex, I would like to make a B2B enquiry.')}`;
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML = `${waIcon}<span>Talk to our team on WhatsApp</span>`;
    wrap.appendChild(a);
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  function welcome() {
    if (messages.childElementCount) return;
    addMessage('👋 Welcome to InduTradex. I can help with products, bulk sourcing, export and private-label enquiries.');
    addQuickButtons([
      {label:'Premium Makhana', action:'makhana'},
      {label:'Roasted & Flavoured', action:'roasted'},
      {label:'Turmeric', action:'turmeric'},
      {label:'Indian Spices', action:'spices'},
      {label:'Dry Fruits', action:'dryfruits'},
      {label:'Private Label', action:'private'},
      {label:'Bulk / Export Enquiry', action:'enquiry'},
      {label:'Talk to Team', action:'whatsapp'}
    ]);
  }

  function handleAction(action, label = '') {
    if (label) addMessage(label, 'user');
    if (productReplies[action]) {
      addMessage(productReplies[action]);
      addQuickButtons([{label:'Request a Quote', action:'enquiry'}, {label:'WhatsApp Team', action:'whatsapp'}]);
      return;
    }
    if (action === 'enquiry') {
      addMessage('Great. Please share your product, approximate quantity and destination country. You can also use the Business Enquiry form for full details.');
      addQuickButtons([{label:'Open Business Enquiry', action:'quote'}, {label:'WhatsApp Team', action:'whatsapp'}]);
      return;
    }
    if (action === 'quote') {
      document.querySelector('#quote')?.scrollIntoView({behavior:'smooth'});
      closeChat();
      return;
    }
    if (action === 'whatsapp') {
      addMessage('You can continue directly with the InduTradex team on WhatsApp.');
      addWhatsAppButton();
    }
  }

  function smartReply(text) {
    const q = text.toLowerCase();
    if (/makhana|fox nut|sutta/.test(q)) return productReplies.makhana;
    if (/roasted|flavour|flavored|peri peri|pudina/.test(q)) return productReplies.roasted;
    if (/turmeric|haldi/.test(q)) return productReplies.turmeric;
    if (/spice|masala/.test(q)) return productReplies.spices;
    if (/dry fruit|almond|cashew|raisin|pista/.test(q)) return productReplies.dryfruits;
    if (/private label|own brand|branding/.test(q)) return productReplies.private;
    if (/price|pricing|cost|rate|quote|quotation|moq|minimum order|bulk|kg|ton|export|ship|shipping|destination/.test(q)) return 'I can help start a B2B enquiry. Please share the product, quantity and destination country. Exact pricing, MOQ, specifications and shipment terms are confirmed by the InduTradex team for each requirement.';
    if (/hello|hi|hey|namaste/.test(q)) return 'Hello! 👋 What would you like to source from India today?';
    if (/human|team|person|sales|whatsapp/.test(q)) return 'Absolutely. I can connect you with the InduTradex team on WhatsApp.';
    return 'I can help with Premium Makhana, Roasted & Flavoured Makhana, Turmeric, Indian Spices, Dry Fruits, private label, bulk sourcing and export enquiries. Tell me what you are looking for.';
  }

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    input.value = '';
    send.disabled = true;
    window.setTimeout(() => {
      addMessage(smartReply(text));
      if (/whatsapp|human|team|sales|person/.test(text.toLowerCase())) addWhatsAppButton();
      else addQuickButtons([{label:'Bulk / Export Enquiry', action:'enquiry'}, {label:'WhatsApp Team', action:'whatsapp'}]);
      send.disabled = false;
      input.focus();
    }, 350);
  }

  function openChat() {
    panel.classList.add('open');
    panel.setAttribute('aria-hidden','false');
    launcher.setAttribute('aria-expanded','true');
    welcome();
    window.setTimeout(() => input.focus(), 50);
  }
  function closeChat() {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden','true');
    launcher.setAttribute('aria-expanded','false');
  }

  launcher.addEventListener('click', () => panel.classList.contains('open') ? closeChat() : openChat());
  close.addEventListener('click', closeChat);
  send.addEventListener('click', sendMessage);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeChat(); });
})();
