import { Props } from '#data/types'
import { staleData } from './staleData'

import { filterHiddenCommissions } from '#components/utils'

export const commissionData: Props = filterHiddenCommissions([
  /* ========= AZKi ========= */
  {
    Character: 'AZKi',
    Commissions: [
      {
        fileName: '20240421_Gisyu (part 2)',
        Links: ['https://fantia.jp/posts/2696363'],
      },
      {
        fileName: '20240421_Gisyu (part 1)',
        Links: [
          'https://www.pixiv.net/artworks/118035223',
          'https://www.fanbox.cc/@gisyu/posts/7801716',
        ],
      },
      {
        fileName: '20240409_雪国裕',
        Links: [
          'https://www.pixiv.net/artworks/117744700',
          'https://www.fanbox.cc/@yukiguni16/posts/7769811',
        ],
      },
      {
        fileName: '20240408_病ん太廊',
        Links: ['https://www.pixiv.net/artworks/117692460'],
        Hidden: true,
      },
      {
        fileName: '20240114_七市',
        Links: ['https://www.pixiv.net/en/artworks/115230067'],
      },
      {
        fileName: '20231231_流し満貫',
        Links: [
          'https://twitter.com/naga4mangan/status/1741268826875159028',
          'https://www.pixiv.net/artworks/114716726',
        ],
      },
      {
        fileName: '20230914_もけ太',
        Links: ['https://www.pixiv.net/artworks/111778285', 'https://fantia.jp/posts/2267273'],
      },
      {
        fileName: '20230912_温野りょく',
        Links: [
          'https://twitter.com/UnoRyoku/status/1701294521898901911',
          'https://www.pixiv.net/artworks/111700726',
        ],
      },
      {
        fileName: '20230702_アータ',
        Links: [
          // 'https://twitter.com/C4Rm93/status/1669365839303434240',
          'https://www.pixiv.net/artworks/109525980',
        ],
      },
      {
        fileName: '20230611_病ん太廊',
        Links: ['https://www.pixiv.net/artworks/111809434'],
        Hidden: true,
      },
      {
        fileName: '20230603_うたゆうか',
        Links: [
          'https://twitter.com/YuukaUta/status/1665328780427296770',
          'https://www.pixiv.net/artworks/108727689',
        ],
      },
      {
        fileName: '20230527_病ん太廊',
        Links: ['https://www.fanbox.cc/@hv-yantaro/posts/6073423'],
      },
    ],
  },

  /* ========= Kamitsubaki Studio & SINSEKAI Studio ========= */
  {
    Character: 'Studio K',
    Commissions: [
      {
        fileName: '20241203', // Isekaijoucho in toilet
        Links: ['https://www.pixiv.net/artworks/124865992'],
        Description: 'Public Toilet',
      },
      {
        fileName: '20241126', // CIEL w/ Sex machine
        Links: ['https://www.pixiv.net/artworks/124739716'],
        Description: 'Forget me not',
      },
      {
        fileName: '20240729', // Albemuth
        Links: ['https://www.pixiv.net/artworks/121113333'],
      },
      {
        fileName: '20240726', // CIEL w/ V.W.P
        Links: ['https://www.pixiv.net/artworks/120932009'],
        Description: 'Welcome party',
      },
      {
        fileName: '20240513', // CIEL
        Links: ['https://www.pixiv.net/artworks/118703993'],
      },
      {
        fileName: '20240423', // Isekaijoucho x CIEL
        Links: ['https://www.pixiv.net/artworks/118184337'],
      },
      {
        fileName: '20240410', // Isekaijoucho
        Links: ['https://www.pixiv.net/artworks/117718920'],
      },
      {
        fileName: '20240225', // CIEL
        Links: ['https://www.pixiv.net/artworks/116444725'],
      },
      {
        fileName: '20240113', // Isekaijoucho
        Links: ['https://www.pixiv.net/artworks/115136395'],
        Description: 'V.W.P 現象II',
      },
      {
        fileName: '20231215', // Isekaijoucho
        Links: ['https://www.pixiv.net/artworks/114364539'],
        Description: 'parallel canvas II',
      },
      {
        fileName: '20231117', // Isekaijoucho
        Links: ['https://www.pixiv.net/artworks/113681042'],
        Description: 'Happy 4th Anniv.',
      },
      {
        fileName: '20231018', // Albemuth
        Links: ['https://www.pixiv.net/artworks/112712843'],
        Description: '1st Album Release',
      },
      {
        fileName: '20230924', // CIEL
        Links: ['https://www.pixiv.net/artworks/112144494'],
      },
      {
        fileName: '20230917', // Albemuth
        Links: ['https://www.pixiv.net/artworks/111840737'],
      },
    ],
  },

  /* =========  Lucia ========= */
  {
    Character: 'L*cia',
    Commissions: [
      {
        fileName: '20241031_温野りょく',
        Links: ['https://www.pixiv.net/artworks/123904832'],
      },
      {
        fileName: '20241028_アータ',
        Links: ['https://www.pixiv.net/artworks/123755437'],
        // Description: 'Design from "storia" cover',
      },

      {
        fileName: '20240911_MINK',
        Links: ['https://www.pixiv.net/artworks/123307170'],
        Hidden: true,
      },
      {
        fileName: '20240906_七市',
        Links: ['https://www.pixiv.net/artworks/122220714'],
      },
      {
        fileName: '20240725_AOS',
        Links: [
          'https://x.com/AOS_Libido/status/1838570303095779667',
          'https://www.pixiv.net/artworks/123427204',
        ],
        // Hidden: true,
      },
      {
        fileName: '20240620_どれい',
        Links: ['https://x.com/dorei_FT/status/1803768367360479317'],
      },
      {
        fileName: '20240519_たれぞう',
        Links: [''],
        Hidden: true,
      },
      {
        fileName: '20240515_七市',
        Links: ['https://www.pixiv.net/artworks/118788598'],
      },
      {
        fileName: '20231109_YYDAP',
        Links: ['https://twitter.com/potatoyyda/status/1722527075972870639'],
      },
      {
        fileName: '20230706_七市',
        Links: ['https://www.pixiv.net/artworks/109713460'],
      },
      {
        fileName: '20230617_温野りょく',
        Links: [
          'https://twitter.com/UnoRyoku/status/1671030802241716231',
          'https://www.pixiv.net/artworks/109181457',
        ],
      },
    ],
  },

  /* ========= 花鋏キョウ / Hanabasami Kyo ========= */
  {
    Character: 'H*nabasami Kyo',
    Commissions: [
      {
        fileName: '20240918_AsuMi',
        Links: [
          'https://www.pixiv.net/artworks/122922812',
          'https://www.fanbox.cc/@asumi/posts/8865731',
        ],
      },
      {
        fileName: '20231204_温野りょく',
        Links: ['https://www.pixiv.net/artworks/114009866'],
      },
      {
        fileName: '20231006_うたゆうか',
        Links: ['https://www.pixiv.net/artworks/112554268'],
      },
    ],
  },

  /* =========  銀海渡ニシェ / Kanaut Nishe ========= */
  {
    Character: 'Kanaut Nishe',
    Commissions: [
      {
        fileName: '20241130_七市',
        Links: ['https://www.pixiv.net/artworks/124782827'],
      },
      {
        fileName: '20241027_Q (part 2)',
        Links: ['https://www.pixiv.net/artworks/123730009'],
      },
      {
        fileName: '20241027_Q (part 1)',
        Links: ['https://www.pixiv.net/artworks/123730009'],
      },
      {
        fileName: '20240819_Q (part 2)',
        Links: ['https://www.pixiv.net/artworks/121643446'],
      },
      {
        fileName: '20240819_Q (part 1)',
        Links: ['https://www.pixiv.net/artworks/121643446'],
      },
      {
        fileName: '20240406_どれい',
        Links: ['https://twitter.com/dorei_FT/status/1776529855389245652'],
      },
      {
        fileName: '20240223_AOS',
        Links: [
          'https://twitter.com/AOS_Libido/status/1763898007307870678',
          'https://www.pixiv.net/artworks/116602518',
        ],
      },
      {
        fileName: '20231227_そーだみず',
        Links: ['https://twitter.com/so_dasui1/status/1739831358724489679'],
        Hidden: true,
      },
      {
        fileName: '20231005_ぐれます',
        Links: [
          'https://twitter.com/ameashi_nikki/status/1709888658831249689',
          'https://www.pixiv.net/artworks/112296316',
        ],
        Hidden: true,
      },
      {
        fileName: '20230405_島どうま',
        Links: [
          'https://www.pixiv.net/artworks/107783858',
          'https://www.fanbox.cc/@simado-ma/posts/5996475',
        ],
      },
      {
        fileName: '20230327_もけ太',
        Links: ['https://www.pixiv.net/artworks/107682931', 'https://fantia.jp/posts/2039830'],
      },
      {
        fileName: '20230319_Gisyu',
        Links: [
          'https://twitter.com/gisyuled/status/1637254201863737347',
          'https://www.pixiv.net/artworks/106350101',
        ],
        Hidden: true,
      },
      {
        fileName: '20230210_温野りょく',
        Links: [
          'https://twitter.com/UnoRyoku/status/1624007776098820097',
          'https://www.pixiv.net/artworks/105244533',
        ],
      },
      {
        fileName: '20230129_七市',
        Links: ['https://www.pixiv.net/artworks/104950033'],
      },
      {
        fileName: '20230119_こびんびん',
        Links: ['https://www.pixiv.net/artworks/106651946'],
        Hidden: true,
      },
      {
        fileName: '20230113_GSUS',
        Links: [
          'https://twitter.com/Gsusart2222/status/1613861041628135426',
          'https://www.pixiv.net/artworks/104483469',
        ],
      },
      {
        fileName: '20221231_うたゆうか',
        Links: ['https://www.pixiv.net/artworks/104341374'],
        Hidden: true,
      },
      {
        fileName: '20221211_Gisyu',
        Links: [
          'https://twitter.com/gisyuled/status/1601848085356822528',
          'https://www.pixiv.net/artworks/103521450',
        ],
      },
      {
        fileName: '20221113_七市',
        Links: ['https://www.pixiv.net/artworks/102825365'],
      },
      {
        fileName: '20221106_GSUS',
        Links: [
          'https://twitter.com/Gsusart2222/status/1589269678287126538',
          'https://www.pixiv.net/artworks/102572203',
        ],
      },
      {
        fileName: '20221014_温野りょく',
        Links: [
          'https://twitter.com/UnoRyoku/status/1580892425404432386',
          'https://www.pixiv.net/artworks/101922655',
        ],
        Hidden: true,
      },
      {
        fileName: '20221001_AsuMi',
        Links: [
          'https://twitter.com/AsuMi_000/status/1575987028616888320',
          'https://www.pixiv.net/artworks/101602138',
        ],
        Hidden: true,
      },
      {
        fileName: '20220922_温野りょく',
        Links: [
          'https://twitter.com/UnoRyoku/status/1572917959684915206',
          'https://www.pixiv.net/artworks/101403093',
        ],
      },
    ],
  },

  ...staleData,
])
