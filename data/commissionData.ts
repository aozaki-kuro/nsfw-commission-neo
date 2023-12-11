import { Props } from '#data/types'
import { staleData } from './staleData'

export const commissionData: Props = [
  /* AZKi */
  {
    Character: 'AZKi',
    Commissions: [
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

  /* nayuta */
  {
    Character: 'n*yuta',
    Commissions: [
      {
        fileName: '20230830_七市',
        Links: ['https://www.pixiv.net/artworks/111302832'],
      },
      {
        fileName: '20231031_七市',
        Links: ['https://www.pixiv.net/artworks/113113526'],
      },
    ],
  },

  /* Kamitsubaki Studio & SINSEKAI Studio */
  {
    Character: 'Studio K',
    Commissions: [
      {
        fileName: '20231018',
        Links: ['https://www.pixiv.net/artworks/112712843'],
      },
      {
        fileName: '20230924',
        Links: ['https://www.pixiv.net/artworks/112144494'],
      },
      {
        fileName: '20230917',
        Links: ['https://www.pixiv.net/artworks/111840737'],
      },
      {
        fileName: '20231117_Happy 4th Anniv.',
        Links: ['https://www.pixiv.net/artworks/113681042'],
      },
    ],
  },

  /* Hanabasami Kyo */
  {
    Character: 'H*nabasami Kyo',
    Commissions: [
      {
        fileName: '20231006_うたゆうか',
        Links: ['https://www.pixiv.net/artworks/112554268'],
      },
      {
        fileName: '20231204_温野りょく',
        Links: ['https://www.pixiv.net/artworks/114009866'],
      },
    ],
  },

  /* Kotoha 
  {
    Character: 'K*toha',
    Commissions: [],
  },

  */

  ...staleData,
]
