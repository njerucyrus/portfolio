// Where every image on the site comes from. The fetch/capture scripts read this
// file, write raw files to assets-src/ (git-ignored), and build-images.mjs turns
// those into the optimised WebP files under public/images/.
//
// Re-run the whole pipeline with:
//   npm run assets:fetch && npm run assets:capture && npm run images

/** Profile photo, from the Macaws.ai team page. */
export const profilePhoto = 'https://www.macaws.ai/assets/team/cyrus.webp';

const play = (id) => `https://play-lh.googleusercontent.com/${id}`;

/** Google Play listings. Screenshot URLs are the store's own assets, in listing order. */
export const playApps = {
  dartiq: {
    packageId: 'ai.macaws.dartiq',
    shots: {
      practice: play('NAR0FZEkLcWg4TBDM_JeXWE3SfFQD2Oe7sAiqOTGNQHznA4u3LQaXgU_g0hCdUr4onxIf8vfNW8U8MxjuzrtcZk'),
      scoring: play('QQsyWvtGe6BwmQ3qsyyCfecCqYkTCiNh0M36mCbiyIj9lcXkeW0Pnkr2cqq1TB2NcoSUoOVe2FacXJJRCQx3'),
      computer: play('9InAM4-kbaqD-WyX2yoNJNZ-3dU1jHn_2AiVnKwN3uH7bXC3Hh8qD8ZCd7nOjNR6e_bV_MNlgRFoOUFmfTNcWg'),
      home: play('GPv_re__GLR-zRaOwGFVH8CeSAmvIug6ecmp2FiHHMMVy_mYf-_O8ksGaw3GAJGj4RaFV8cWCNB_SzpAVq9ZhL8'),
      stats: play('5pDDdk1uMPw_ZmxFKq_qMB1-9UuS-bSKfeF7rDtoY3nfnEo8T7KAdNIl6zmkdpZKc7ALeashlc-GHZqp13vxWQ'),
      welcome: play('eydUyHmN8HQKOTZRiKWpUDMeqsiJRfjeJ4Iu7x-hdWHEjx3ZZPJqqac_0y-AP2jDjbSKU4QDEfDT2F6RQhgIwg'),
      history: play('8ymZc6D8U_WXvzilwAalxoQIGAiB0IGgwmZnVHp_OwJ9GFXYPl-hz4cgFQEtbuomADu_SlQTQQ3_8iD0IAo3Pw'),
      board: play('0I5k9eSrk2mzxYxdNUadv4hPsHiJERrADMGCal2LLtewXJh0Dp51KwXam3MsTNscteoPqP6SIHchh7zeE0D57lU'),
      'tablet-stats': play('Nx6X89y0CDk1Xu2C3DwkvWyN7g82ZB7DKLqiSvB1wC1LOM_KV4zzQB-K_LD9w2hAB-4wZ32E0ahbmJheJN71Bw'),
      'tablet-board': play('p_JLKpQUjNo_Ydxgnbx9urCFjCCpVcVk7ZCmCjVXKimPZA87P5hBmTEPezOWwXo_rY0KPB-aKmJgsQ5Of3VJb_M'),
    },
  },
  'inr-notebook': {
    packageId: 'com.inrnotebook.app',
    shots: {
      home: play('CgvllM8EDf55eg4ll7_Gq-FGINZw2trEox2OwMKW3FKC_yMLnomfC_Dv6_SApMf_eDXWR6aioHY99j8kDkxnlXs'),
      'inr-chart': play('LcwnGhv-2Ke1ao9KnAUqRO8nhNUchjTHHaPzPfAm_1s4ENBn0MgBnvtWQtQ4nsOfLP8EPjcZqPTuqIrPQLMi7g'),
      warfarin: play('ZKwmxshku8F4aC_PFMniQbZHf16nc3Fwx6oAp5JX96mYCEuTa_RI3l7UkC1m2ruftbyInJ0-80IhXDllrnTxQw'),
      vitals: play('S6hnYUXz_ny8Epd0te4wB6X7jZ_ALFDlo_7n64Ke9MMzAZ7lobgFQdmE1VZ2TWCAPWzQAGxSCpJ1UfYU4yvhtQ'),
      'meal-plan': play('YATs-aWcVDg7ZcHrlWsjzHXqH6FODwjnCvBn9bhOC91oQKqdp166IhFFvydNzWgM89kvFhqR7Ts5aYCGe2Zu'),
      food: play('TaZk7F0VT6NCeWeHWjbSTvQvdE7iG6z_K7EqbhRFyoWAbBhH_ZmPOXL3a4N57-VWc-EQWHyI_4tcSz86HkOm'),
      clinic: play('2O6O91oqz8Ojcmq7rAMfZ8TgAkYmIdJKXhsI56jjH3GxXgh7cNXt4UMaOPSqSCo3WCs0R5l9TpYKBZTd6ZKvtA'),
      safety: play('7KeNy1vLpAIprL6qgzEtJ2mI4gZAglYZy3kVDFP-GG0nRCYCOoXQlbtUHU7q3itTsu7qrSKrz-sdFr3PUits3JA'),
    },
  },
  'novia-digital-scan': {
    packageId: 'io.noviadigital.scan',
    shots: {
      machines: play('eu5NlQm8nk8vIIXwvqVxLstqXobZOwR5pA3PdGiX4_XxjjVr2UByH7uA_Ba9tbQfxD63RRuSxs_4OdGJfDbE'),
      'sign-in': play('Dr0wmOOQejC7BsYWHbTQmGNipY_AT0vqUF_MVwQxFHymfAnmLYyl8L_VPHPbLtsMAKDy71l9GJh3UfUeP2lreg'),
      settings: play('z4-_RGGs-MxUSdF6DyYizMCTa4KHhR_pt8KIMs8m80tcErfC8cM6NxFvEfZHzmWXi6jWJT1pPwJ_jkbkFtnW'),
      order: play('-fZJ8POvJnhg4SUFXkfv3FbsEHs03FiUm9f-CeMlEwxMa_GtfJPkpAj9ndXV-GpxeFxZ5Xcu2QMFWdNITZ3Q'),
      history: play('C4UfCN3tFRGxSLn74FwXsQ642ZrYCXF0tjsH3yEDdMMapHPJ4GTfc7F8rv3XxY6OhhdIog2wwo03lHVQxHbVbLI'),
      'item-counted': play('jg7wWaEFOBHSOK-KlNlLzkBWdZUTBSxp-zzCIfO1SfpJ1r14reFpSl-oTWfTOHV1VeGwiFtrXnYSNrkV_2Y4'),
      'job-sheet': play('hThHS4m1r5paXZkzcIZqrIYdu5-T31K3KlohjRYx_7xiwRTTLDaSxxXtwxcayjLX-AXj0BW942LGsVq7mKTbtw'),
      'tablet-machines': play('Rl47c-9ZDB6KF1I34OY7wMe-gTGJKPEDNiz_44dqiI1VnulEqdRdjP5HXisOUNlIkh3Z5g_kCNi465-HWA_j'),
      'tablet-history': play('s1I3iL942-uJfIzQUoTo8zbOy9SunFMrF51GFdV8jOhmUrPivtDvq7GAXYqQiWZctKPEyjLiAYR300NNeUijOA'),
      'tablet-item': play('hluvwVkMb4e8m6RW7byzonBCf2k4jESgLSdbDdGDaIZuZNstmTxcMmqRv5FTNa2sII0zbfZohgh9j3VTBb0jIg'),
    },
  },
};

/**
 * Live websites captured with Playwright at 1440×1000 (desktop, 2× pixel density)
 * and 390×844 (mobile, 3×). `scrollTo` captures the viewport at a section instead
 * of the top of the page; it accepts any Playwright selector.
 */
export const webPages = {
  'novia-digital': [
    { name: 'home', url: 'https://www.noviadigital.io/' },
    { name: 'features', url: 'https://www.noviadigital.io/', scrollTo: '#features' },
    { name: 'pricing', url: 'https://www.noviadigital.io/', scrollTo: '#pricing' },
    { name: 'quotes', url: 'https://quotes.noviadigital.io/' },
    { name: 'mobile', url: 'https://www.noviadigital.io/', mobile: true },
  ],
  'nexus-portal': [
    { name: 'home', url: 'https://nexusportal.digital/' },
    { name: 'features', url: 'https://nexusportal.digital/', scrollTo: '#features' },
    { name: 'agencies', url: 'https://nexusportal.digital/', scrollTo: '#agencies' },
    { name: 'sign-in', url: 'https://nexusportal.digital/login' },
    { name: 'mobile', url: 'https://nexusportal.digital/', mobile: true },
  ],
  'macaws-ai': [
    { name: 'home', url: 'https://www.macaws.ai/' },
    { name: 'call', url: 'https://www.macaws.ai/', scrollTo: 'h2:has-text("The call you")' },
    { name: 'signal', url: 'https://signal.macaws.ai/' },
    { name: 'local', url: 'https://local.macaws.ai/' },
    { name: 'mobile', url: 'https://www.macaws.ai/', mobile: true },
  ],
  'standard-print-stitch': [
    { name: 'home', url: 'https://standardprintstitch.co.uk/' },
    { name: 'designer', url: 'https://standardprintstitch.co.uk/designer' },
    { name: 'product', url: 'https://standardprintstitch.co.uk/product/beechfield-original-cuffed-beanie/b45' },
    { name: 'category', url: 'https://standardprintstitch.co.uk/hoodies' },
    { name: 'mobile', url: 'https://standardprintstitch.co.uk/', mobile: true },
  ],
  // The storefront's home page banner images were failing to load (HTTP 400 from
  // its image storage) when captured, so the product page stands in for it.
  'oliver-embroidery': [
    { name: 'product', url: 'https://oliver-embroidery.noviadigital.io/product/regatta-professional-dover-waterproof-bomber-jacket/rg122' },
    { name: 'designer', url: 'https://oliver-embroidery.noviadigital.io/designer?product=beechfield-original-cuffed-beanie&sku=b45' },
    { name: 'category', url: 'https://oliver-embroidery.noviadigital.io/polo-shirts' },
    { name: 'mobile', url: 'https://oliver-embroidery.noviadigital.io/product/regatta-professional-dover-waterproof-bomber-jacket/rg122', mobile: true },
  ],
  'viyu-hub': [
    { name: 'home', url: 'https://viyu-hub-mu.vercel.app/' },
    { name: 'platform', url: 'https://viyu-hub-mu.vercel.app/', scrollTo: '#platform' },
    { name: 'pricing', url: 'https://viyu-hub-mu.vercel.app/', scrollTo: '#pricing' },
    { name: 'mobile', url: 'https://viyu-hub-mu.vercel.app/', mobile: true },
  ],
};
