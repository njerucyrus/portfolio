// Contact form: validation, and submission to the endpoint set in
// src/config/site.ts. Without an endpoint nothing is sent, and the visitor is
// told so plainly and offered another way to get in touch.

type FieldName = 'name' | 'email' | 'subject' | 'message';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const rules: Record<FieldName, (value: string) => string> = {
  name: (v) => (!v ? 'Please enter your name.' : v.length < 2 ? 'Your name needs at least 2 characters.' : ''),
  email: (v) => (!v ? 'Please enter your email address.' : !EMAIL.test(v) ? 'Please enter a valid email address, like name@example.com.' : ''),
  subject: (v) => (!v ? 'Please add a subject.' : v.length < 3 ? 'The subject needs at least 3 characters.' : ''),
  message: (v) =>
    !v ? 'Please write a message.' : v.length < 20 ? `Please add a little more detail (at least 20 characters, ${20 - v.length} to go).` : '',
};

export function initContactForm() {
  document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach(setup);
}

function setup(form: HTMLFormElement) {
  const status = form.querySelector<HTMLElement>('[data-status]')!;
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]')!;
  const { endpoint, email, github } = form.dataset;
  const fields = Object.keys(rules) as FieldName[];
  let attempted = false;

  const control = (name: FieldName) => form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement;
  const value = (name: FieldName) => control(name).value.trim();

  const check = (name: FieldName) => {
    const message = rules[name](value(name));
    const input = control(name);
    input.setAttribute('aria-invalid', String(Boolean(message)));
    form.querySelector(`[data-error-for="${name}"]`)!.textContent = message;
    return !message;
  };

  fields.forEach((name) => {
    control(name).addEventListener('blur', () => attempted && check(name));
    control(name).addEventListener('input', () => {
      if (attempted || control(name).getAttribute('aria-invalid') === 'true') check(name);
    });
  });

  const show = (tone: 'success' | 'error' | 'info', html: string) => {
    status.dataset.tone = tone;
    status.innerHTML = html;
    status.hidden = false;
  };

  const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

  const mailto = () => {
    const body = `${value('message')}\n\n${value('name')}\n${value('email')}`;
    return `mailto:${email}?subject=${encodeURIComponent(value('subject'))}&body=${encodeURIComponent(body)}`;
  };

  const alternative = () => {
    if (email) {
      return `<a class="btn btn-dark btn-sm" href="${escape(mailto())}">Open it in your email app</a>`;
    }
    if (github) return `For now, you can reach me through <a href="${escape(github)}" target="_blank" rel="noopener noreferrer">GitHub</a>.`;
    return '';
  };

  const setBusy = (busy: boolean) => {
    submit.disabled = busy;
    submit.setAttribute('aria-busy', String(busy));
    submitLabel.textContent = busy ? 'Sending…' : 'Send message';
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    attempted = true;
    status.hidden = true;

    const invalid = fields.filter((name) => !check(name));
    if (invalid.length) {
      control(invalid[0]).focus();
      return;
    }

    // Spam bots fill every field, including the hidden one.
    if ((form.elements.namedItem('_gotcha') as HTMLInputElement).value) return;

    if (!endpoint) {
      show(
        'info',
        `<p><strong>This form isn’t connected to a mail service yet, so your message has not been sent.</strong></p>
         <p>${email ? 'You can send the same message from your own email app instead.' : ''} ${alternative()}</p>`,
      );
      return;
    }

    setBusy(true);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: value('name'), email: value('email'), subject: value('subject'), message: value('message') }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      show('success', `<p><strong>Thanks, ${escape(value('name'))}. Your message has been sent.</strong> I’ll reply to ${escape(value('email'))}.</p>`);
      form.reset();
      attempted = false;
      fields.forEach((name) => control(name).removeAttribute('aria-invalid'));
    } catch {
      show('error', `<p><strong>Sorry, your message couldn’t be sent.</strong> Please check your connection and try again.</p>${email ? `<p>${alternative()}</p>` : ''}`);
    } finally {
      setBusy(false);
    }
  });
}
