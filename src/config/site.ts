// Central site settings. Everything personal that appears on the site
// (contact details, profiles, the contact form's destination) is set here.

export const site = {
  name: 'Cyrus Njeru',
  role: 'Full-Stack Software Developer',
  headline: 'Full-Stack Software Developer | AI & Voice Automation Engineer',
  description:
    'Cyrus Njeru is a full-stack software developer building web applications, Android apps, AI agents and voice automation systems that solve real-world problems.',
  locale: 'en_GB',

  /**
   * Public contact email. Leave empty to hide every email button and link.
   * Example: 'hello@yourdomain.com'
   */
  email: 'cyrus@macaws.ai',

  /** Public profile URLs. Leave a value empty to hide that link everywhere. */
  social: {
    github: 'https://github.com/njerucyrus',
    linkedin: 'https://www.linkedin.com/in/njeru-cyrus/',
  },

  /**
   * Where the contact form sends messages. Any service that accepts a JSON POST
   * with { name, email, subject, message } works, for example Formspree
   * ('https://formspree.io/f/<form-id>'), Web3Forms or Getform.
   *
   * While this is empty the form still validates, but it never pretends to send:
   * it offers the visitor's own email app instead (when `email` is set), or says
   * plainly that the form is not connected yet.
   */
  contactFormEndpoint: '',

  /**
   * Profile photo, relative to /public. Built by `npm run images` from the photo
   * downloaded by `npm run assets:fetch`. Leave empty to show no photo.
   */
  portrait: 'images/cyrus.webp',
} as const;

export const nav = [
  { label: 'Home', hash: 'top' },
  { label: 'Projects', hash: 'work' },
  { label: 'Expertise', hash: 'expertise' },
  { label: 'About', hash: 'about' },
  { label: 'Contact', hash: 'contact' },
] as const;
