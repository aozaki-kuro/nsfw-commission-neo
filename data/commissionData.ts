import { Props } from '#data/types'
import { staleData } from './staleData'

export const commissionData: Props = [
  /* ========= AZKi ========= */
  {
    Character: 'AZKi',
    Commissions: [
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
          'https://twitter.com/C4Rm93/status/1669365839303434240',
          'https://www.pixiv.net/artworks/109525980',
        ],
      },
      {
        fileName: '20230611_病ん太廊',
        Links: ['https://www.pixiv.net/artworks/111809434'],
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
      /*
      {
        fileName: '20240314', // CIEL
        Links: [''],
      },
      **/
      {
        fileName: '20240225', // CIEL
        Links: ['https://www.pixiv.net/artworks/116444725'],
      },
      {
        fileName: '20240113_V.W.P 現象II', // Isekaijoucho
        Links: ['https://www.pixiv.net/artworks/115136395'],
      },
      {
        fileName: '20231215_parallel canvas II', // Isekaijoucho
        Links: ['https://www.pixiv.net/artworks/114364539'],
      },
      {
        fileName: '20231117_Happy 4th Anniv.', // Isekaijoucho
        Links: ['https://www.pixiv.net/artworks/113681042'],
      },
      {
        fileName: '20231018_1st Album Release', // Albemuth
        Links: ['https://www.pixiv.net/artworks/112712843'],
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

  /* =========  HACHI ========= */
  {
    Character: 'HACHI',
    Commissions: [
      {
        fileName: '20240406_七市',
        Links: [''],
      },
    ],
  },

  ...staleData,
]
