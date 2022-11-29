// theme.config.js
export default {
    
    footer: <p>MIT 2021 © Nextra.</p>,
    head: ({ title, meta }) => (
      <>
        {meta.description && <meta name="description" content={meta.description} />}
        {meta.tag && <meta name="keywords" content={meta.tag} />}
        {meta.author && <meta name="author" content={meta.author} />}
      </>
    ),
    nextLinks: true,
    prevLinks: true,
    // readMore: 'Read More →',
    search: true,
    // titleSuffix: null,
    // postFooter: null,
    // cusdis: {
    //   appId: 'your_app_id',
    //   host: 'your_host(optional)',
    //   lang: 'your_lang'
    // },
    darkMode: false,
    // navs: [
    //   {
    //     url: 'https://github.com/shuding/nextra',
    //     name: 'Nextra'
    //   }
    // ]
  }