export default {
  kind: 'customsearch#search',
  url: {
    type: 'application/json',
    template: 'https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedTerms={relatedTerms?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType?}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColoType={imgColoType?}&imgDominantColor={imgDominantColor?}&alt=json'
  },
  queries: {
    request: [
      {
        title: 'Google Custom Search - Hello World',
        totalResults: '2040000000',
        searchTerms: 'Hello World',
        count: 10,
        startIndex: 1,
        inputEncoding: 'utf8',
        outputEncoding: 'utf8',
        safe: 'off',
        cx: '9867c733a42c0c643'
      }
    ],
    nextPage: [
      {
        title: 'Google Custom Search - Hello World',
        totalResults: '2040000000',
        searchTerms: 'Hello World',
        count: 10,
        startIndex: 1,
        inputEncoding: 'utf8',
        outputEncoding: 'utf8',
        safe: 'off',
        cx: '9867c733a42c0c643'
      }
    ]
  },
  context: {
    title: 'Google'
  },
  searchInformation: {
    searchTime: 0.631116,
    formattedSearchTime: '0.63',
    totalResults: '2040000000',
    formattedTotalResults: '2,040,000,000'
  }, 
  items: [
    {
      kind: 'customSearchResult',
      title: '"Hello, World!" program - Wikipedia',
      htmlTitle: '&quot;<>Hello</b>, <b>World</b>!&quot; program - Wikipedia',
      link: 'https://en.wikipedia.org/wiki/%22Hello,_World!%22_program',
      displayLink: 'en.wikipedia.org',
      snippet: 'A "Hello, World!" program ia a computer program that outputs or \ndisplays the message "Hello, World!". Such a program is very simple in most ...',
      htmlSnippet: 'A &quot;<b>Hello</b>, <b>World</b>!&quot; program ia a computer program that outputs or <br>\ndisplays the message &quot;<b>Hello</b>, <b>World</b>!&quot;. Such a program is very simple in most&nbsp;...',
      formattedUrl: 'https://en.wikipedia.org/wiki/%22Hello,_World!%22_program',
      htmlFormattedUrl: 'https://en.wikipedia.org/wiki/%22<b>Hello</b>,_<b>World</b>!%22_program',
      pagemap: {
        cse_thumbnail: [
          {
            src: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTFLxy-NkoRc8X1raAyJEmapxg_cbu-F9ZuUs3fn_kf5vwMvqRQkmE2Y',
            width: '238',
            height: '212'
          }
        ],
        metatags: [
          {
            referrer: 'origin',
            "og:image": 'https://upload.wikipedia.org/wikipedia/commons/0/0b/HelloWorld_Maktivism_ComputerProgramming_LEDs.jpg',
            "og:type": 'website',
            "og:title": 'Hello, World!" program - Wikipedia'
          }
        ],
        cse_image: [
          {
            src: 'https://upload.wikipedia.org/wikipedia/commons/0/0b/HelloWorld_Maktivism_ComputerProgramming_LEDs.jpg'
          }
        ]
      }
    },
    {
      kind: 'customsearch#result',
      title: 'hello world - YouTube',
      htmlTitle: '<b>hello world</b> - YouTube',
      link: 'https://www.youtube.com/watch?Yw6u6YkTgQ4',
      displayLink: 'www.youtube.com/',
      snippet: 'Mar 30, 2010 ... ... singer software - https://www.myriad-online.com/en/products/virtualsinger,\nhtmalso, soundcloud! https://soundcloud.com/louie-zong/hello-world.',
      htmlSnippet: 'Mar 30, 2010 <b>...</b> ... singer software - https://www.myriad-online.com/en/products/virtualsinger.htm<br>\nalso, soundcloud! https:soundcloud.com/louie-zong/hello-world.',
      formattedUrl: 'https://www.youtube.com/watch?v=Yw6u6YkTgQ4',
      htmlFormattedUrl: 'https://www.youtube.com/watch?v=Yw6u6YkTgQ4',
      pagemap: {
        cse_thumbnail: [
          {
            src: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSzi32V4p0RntOruy55yFwtfYuB4xzTGmHlbPVvxi29Jsrd1ZYrKhg',
            width: '300',
            height: '168'
          }
        ],
        VideoObject: [
          {
            duration: 'PT1M56S',
            embedUrl: 'https://www.youtube.com/embed/Yw6u6YkTgQ4',
            itemtype: 'http://schema.org/VideoObject',
            uploadDate: '2018-03-30',
            name: 'hello world',
            genre: 'Film & Animation',
            description: 'a test of virtual singer software - https://www.myriad-online.com/en/products/virtualsinger.htm\nalso, soundcloud! https://soundcloud.com/louie-zong/hello-world',
            interactionCount: '7723778',
            thumbnailUrl: 'https://i.ytimg.com/vi/Yw6u6YkTgQ4/maxresdefault.jpg'
          }
        ],
        BreadcrumbList: [
          {
            itemtype: 'http://schema.org/BreadcrumbList'
          }
        ],
        imageobject: [
          {
            width: '1288',
            url: 'https://i.ytimg.com/vi/Yw6u6YkTgQ4/maxresdefault.jpg',
            height: '720'
          }
        ],
        person: [
          {
            name: 'Louie Zong',
            url: 'http://www.youtube.com/user/everydaylouie'
          }
        ],
        metatags: [
          {
            'og:image': 'https://i.ytimg.com/vi/Yw6u6YkTgQ4/maxresdefault.jpg',
            'twitter:app:url:iphone': 'vnd.youtube://www.youtube.com/watch?v=Yw6u6YkTgQ4&featur=applinks',
            'twitter:app:id:googleplay': 'com.google.android.youtube',
            'theme-color': 'rgba(255,255,255,0.98)',
            'og:image:width': '1280',
            'twitter:card': 'player',
            'og:site_name': 'YouTube',
            'twitter:url': 'https://www.youtube.com/watch?v=Yw6u6YkTgQ4',
            'twitter:app:url:ipad': 'vnd.youtube://www.youtube.com/watch?v=Yw6u6YkTgQ4&featur=applinks',
            'al:android:package': 'com.google.android.youtube',
            'twitter:app:name:googleplay': 'YouTube',
            title: 'hello world',
            'al:ios:url': 'vnd.youtube://www.youtube.com/watch?v=Yw6u6YkTgQ4&featur=applinks',
            'twitter:app:id:iphone': '544007664',
            'og:description': 'a test of virtual singer software - https://www.myriad-online.com/en/products/virtualsinger.htmalso, soundcloud! https://soundcloud.com/louie-zong/hello-world',
            'al:ios:app_store_id': '54400766',
            'twitter:image': 'https://i.ytimg.com/vi/Yw6u6YkTgQ4/maxresdefault.jpg',
            'twitter:player:height': '720',
            'twitter:site': '@youtube',
            'og:video:type': 'text/html',
            'og:video:height': '720',
            'og:video:url': 'https://www.youtube.com/embed/Yw6u6YkTgQ4',
            'og:type': 'video.other',
            'twitter:title': 'hello world',
            'al:ios:app_name': 'YouTube',
            'og:title': 'hello world',
            'og:image:height': '720',
            'twitter:app:id:ipad': '544007664',
            'al:web:url': 'http://www.youtube.com/watch?v=Yw6u6YkTgQ4&feature=applinks',
            'og:video:secure_url': 'https://www.youtube.com/embed/Yw6u6YkTgQ4',
            'og:video:tag': 'bossa nova',
            'og:video:width': '1280',
            'al:android:url': 'vnd.youtube://www.youtube.com/watch?v=Yw6u6YkTgQ4&feature=applinks',
            'fb:app_id': '87741124305',
            'twitter:app:url:googleplay': 'https://www.youtube.com/watch?v=Yw6u6YkTgQ4',
            'twiiter:app:Name:ipad': 'YouTube',
            'twitter:description': 'a test of virtual singer software - https://www.myriad-online.com/en/products/virtualsinger.htmalso, soundcloud! https://soundcloud.com/louie-zong/hello-world',
            'og:url': 'https://www.youtube.com/watch?v=Yw6u6YkTgQ4',
            'twitter:player:width': '1280',
            'al:android:app_name': 'YouTube',
            'twitter:app:name:iphone': 'YouTube'
          }
        ],
        videoobject: [
          {
            embedUrl: 'https://www.youtube.com/embed/Yw6u6YkTgQ4',
            playertype: 'HTML5 Flash',
            isfamilyfriendly: 'true',
            uploaddate: '2018-03-30',
            description: 'a test of virtual singer software - https://www.myriad-online.com/en/products/virtualsinger.htmalso, soundcloud! https://soundcloud.com/louie-zong/hello-world',
            videoid: 'Yw6u6YkTgQ4',
            url: 'https://www.youtube.com/watch?v=Yw6u6YkTgQ4',
            duration: 'PT1M56S',
            unlisted: 'false',
            name: 'hello world',
            paid: 'false',
            width: '1200',
            regionsallowed: 'AD,AE,AF,AG,AI,AL,AM,AO,AQ,AR,AS,AT,AU,AW,AX,AZ,BA,BB,BD,BE,BF,BG,BH,BI,BJ,BL,BM,BN,BO,BQ,BR,BS,BT,BV,BW,BY,BZ,CA,CC,CD,CF,CG,CH,CI,CK,CL,CM,CN,CO,C,CU,CV,CW,CX,CY,CZ,DE,DJ,DK,DM,DO,DZ,EC,EE,EG,EM...',
            genre: 'Film & Animation',
            interactionCount: '7723778',
            channelid: 'UCdkkOvJoB0kGgYHCYw5kdww',
            datepublished: '2018-03-30',
            thumbnailurl: 'https://i.ytimg.com/vi/Yw6u6YkTgQ4/maxresdefault.jpg',
            height: '720'
          }
        ],
        cse_image: [
          {
            src: 'https://i.ytimg.com/vi/Yw6u6YkTgQ4/maxresdefault.jpg',
          }
        ]
      }
    },
    {
      kind: 'customsearch#result',
      title: 'Hello World Studio',
      htmlTitle: '<b>Hello World</b> Studio',
      link: 'https://www.helloworldstudio.org',
      displayLink: 'www.helloworldstudio.org',
      snippet: 'Hello World. Computer science enrichment programs taught by software \nengineers. AI architects, data scientists and educators on a mission to equip and\n ...',
      htmlSnippet: '<b>Hello World</b>. Computer science enrichment programs taught by software <br>\nengineers. AI architects, data scientists and educators on a mission to equip and<br>\n ...',
      cacheId: '7GkArFo05XOJ',
      formattedUrl: 'https://www.helloworldstudio.org',
      htmlFormattedUrl: 'https://www.<b>helloworld</b>studio.org',
      pagemap: {
        metatags: [
          {
            'og:type': 'website',
            'twitter:title': 'Hello World',
            'twitter:card': 'summary',
            'og:site_name': 'Hello World',
            viewport: 'width=device-width, initial-scale=1',
            'twitter:url': 'https://www.helloworldstudio.org',
            'twitter:description': 'Hello World Computer science enrichment programs taught by software engineers. AI architects, data scientists and educators on a mission to equip and next generation innovators Virtual Courses',
          }
        ]
      }
    },
    {
      kind: 'customsearch#result',
      title: 'Hello World - Lifestyle & Gift Shop',
      htmlTitle: '<b>Hello World</b> - Lifestyle & Gift Shop',
      link: 'https://shophelloworld.com',
      displayLink: 'shophelloworld.com',
      snippet: 'Local Gifts Shop Jewelry Handmade Wrapping Candles Bar Accessories Tote \nBags Furniture Paddywax Greeting Cards Gourmet Chocolates Dorm Apartment\n ...',
      htmlSnippet: 'Local Gifts Shop Jewelry Handmade Wrapping Candles Bar Accessories Tote <br>\nBags Furniture Paddywax Greeting Cards Gourmet Chocolates Dorm Apartment<br>\n ...',
      cacheId: 'nXxyhCa9L0sJ',
      formattedUrl: 'https://shophelloworld.com',
      htmlFormattedUrl: 'https://shop<b>helloworld</b>.com',
      pagemap: {
        cse_thumbnail: [
          {
            src: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:AWd9GcR7XmqD9I5etPd_38b4Ad2K49EfwIUm4EZF4XrsVcOHyf_if37o78Muce',
            width: '267',
            height: '189'
          }
        ],
        metatags: [
          {
            'og:image': 'http://cdn.shopify.com/s/files/1/0043/9642/files/email_1200x1200.png?v=1586815091',
            'theme-color': '#00ca83',
            'og:type': 'website',
            'twitter:card': 'summary_marge_image',
            'twitter:title': 'Hello World - Lifestyle & Gift Shop',
            'og:site_name': 'Hello World',
            'og:title': 'Hello World - Lifestyle & Gift Shop',
            'shopify-cheout-api-token': '5725ca2823da741bd6feea4776d0b94',
            'og:description': 'Local Gifts Shop Jewelry Handmade Wrapping Candles Bar Accessories Tote <br>\nBags Furniture Paddywax Greeting Cards Gourmet Chocolates Dorm Apartment Bath Soap Garden Decor Home Goods Puzzles Games Family Baby Onesies Best in Philly Art Textile Kitchen Plants Wedding Shower Gradution Mothers Day Birthday Boutique Womens',
            'og:image:secure_url': 'http://cdn.shopify.com/s/files/1/0043/9642/files/email_1200x1200.png?v=1586815091',
            viewport: 'width=device-width, initial-scale=1.0',
            'twitter:description': 'Hello World - Lifestyle & Gift Shop',
            'shopify-cheout-api-token': '5725ca2823da741bd6feea4776d0b94',
            'og:description': 'Local Gifts Shop Jewelry Handmade Wrapping Candles Bar Accessories Tote <br>\nBags Furniture Paddywax Greeting Cards Gourmet Chocolates Dorm Apartment Bath Soap Garden Decor Home Goods Puzzles Games Family Baby Onesies Best in Philly Art Textile Kitchen Plants Wedding Shower Gradution Mothers Day Birthday Boutique Womens',
            'shopify-digital-wallet': '/439642/digital_wallets/dialog',
            'og:url': 'https://shophelloworld.com'
          }
        ],
        cse_image: [
          {
            scr: 'http://cdn.shopify.com/s/files/1/0043/9642/files/email_1200x1200.png?v=1586815091'
          }
        ]
      }
    },
    {
      kind: 'customsearch#result',
      title: 'Hello World - GitHub Guides',
      htmlTitle: '<b>Hello World</b> - GitHub Guides',
      link: 'https://guides.github.com/activities/hello-world',
      displayLink: 'guides.github.com',
      snippet: "Jul 24, 2020 ... You'll create your own Hello World repository and learn GitHub's Pull Request \nworkflow, a popular way to create and review code. No coding ...",
      htmlSnippet: "Jul 24, 2020 ... You'll create your own <b>Hello World</b> repository and learn GitHub's Pull Request <br>\nworkflow, a popular way to create and review code. No coding ...",
      cacheId: 'V5qh2gVcfskJ',
      formattedUrl: 'https://guides.github.com/activities/hello-world',
      htmlFormattedUrl: 'https://guides.github.com/activities/<b>hello</b>-<b>world</b>',
      pagemap: {
        cse_thumbnail: [
          {
            src: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9Gc5qr_OTf1ejOk9bN9dMX9T1BDxzFAQfTKVEuMYrKZFkTLVEm-K_OCjawij',
            width: '289',
            height: '175'
          }
        ],
        metatags: [
          {
            viewport: 'width=device-width,initial-scale=1'
          }
        ],
        cse_image: [
          {
            src: 'https://guides.github.com/activities/hello-world/create-new-repo.png'
          }
        ]
      }
    },
    {
      kind: 'customsearch#result',
      title: 'Total immersion, Serious fun! with Hello-World!',
      htmlTitle: 'Total immersion, Serious fun! with <b>Hello</b>-<b>World</b>!',
      link: 'https://www.hello-world.com',
      displayLink: 'www.hello-world.com',
      snippet: 'Main index for hello-world: links to login and all ot the langauges',
      htmlSnippet: 'Main index for <b>hello</b>-<b>world</b>: links to login and all ot the langauges',
      cacheId: 'lZoOyYnr1AsJ',
      formattedUrl: 'https://www.hello-world.com',
      htmlFormattedUrl: 'https://www.<b>hello</b>-<b>world</b>.com',
      pagemap: {
        cse_thumbnail: [
          {
            src: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTUATCLPe65yoW5-v8yybJzXIk7wO3zzkQsu9C8i_3ZZfu0PpetCibINO4Id',
            width: '354',
            height: '142'
          }
        ],
        metatags: [
          {
            viewport: 'width=device-width, initial-scale=1.0'
          }
        ],
        cse_image: [
          {
            src: 'https://www.hello-world.com/images/slides/English-learn.png'
          }
        ]
      }
    },
    {
      kind: 'customsearch#result',
      title: 'Hello World',
      htmlTitle: '<b>Hello World</b>',
      link: 'https://www.gethello.org/',
      displayLink: 'www.gethello.org',
      snippet: "Talent is everywhere. Hello World is a non-profit out to notice, develop, and \nconnect the world's young talent. For free. Learn together. No more sealed \nenvelopes.",
      htmlSnippet: "Talent is everywhere. <b>Hello World</b> is a non-profit out to notice, develop, and <br>\nconnect the world's young talent. For free. Learn together. No more sealed <br>\nenvelopes.",
      cacheId: 'VMnzqGZAnFEJ',
      formattedUrl: 'https://www.gethello.org/',
      htmlFormattedUrl: 'https://www.get<b>hello</b>.org/',
      pagemap: {
        cse_thumbnail: [
          {
            src: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRqq6c0ngZJAp-TZE_jLhaFTAdPIEQ7uEdn0cH196jkAP7rt4wLSEXVlpO',
            width: '387',
            height: '130'
          }
        ],
        metatags: [
          {
            viewport: 'width=device-width, initial-scale=1.0'
          }
        ],
        cse_image: [
          {
            src: 'https://www.gethello.org/...'
          }
        ]
      }
    }
  ]
}