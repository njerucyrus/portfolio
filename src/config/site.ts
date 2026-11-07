// Central site settings. The business details, the founder, contact details,
// profiles and the contact form's destination are all set here.

export const site = {
  name: 'TripleFive254 Ventures',
  /** Short line used in page titles, the footer and the social image. */
  tagline: 'Web, Mobile & AI Development',
  description:
    'TripleFive254 Ventures is a technology company in Nairobi, Kenya, building web applications, Android apps, AI agents and voice automation. Founded by Cyrus Njeru.',
  locale: 'en_GB',

  /** Where the business is based. Shown in the footer and contact section, and given to search engines. */
  location: {
    city: 'Nairobi',
    country: 'Kenya',
    countryCode: 'KE',
  },

  founder: {
    name: 'Cyrus Njeru',
    title: 'Founder',
    headline: 'Full-Stack Software Developer | AI & Voice Automation Engineer',
    /**
     * Founder photo, relative to /public. Built by `npm run images` from the photo
     * downloaded by `npm run assets:fetch`. Leave empty to show no photo.
     */
    portrait: 'images/cyrus.webp',
  },

  /**
   * Public contact email. Leave empty to hide every email button and link.
   * Example: 'hello@yourdomain.com'
   */
  email: 'cyrus@macaws.ai',

  /** The founder's public profiles. Leave a value empty to hide that link everywhere. */
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
} as const;

export const nav = [
  { label: 'Home', hash: 'top' },
  { label: 'Work', hash: 'work' },
  { label: 'Services', hash: 'services' },
  { label: 'About', hash: 'about' },
  { label: 'Contact', hash: 'contact' },
] as const;
