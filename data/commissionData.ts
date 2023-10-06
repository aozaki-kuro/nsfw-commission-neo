import { Props } from '#data/types'

import { AZKi } from '#data/commission/AZKi'
import { Lucia } from '#data/commission/Lucia'
import { nayuta } from './commission/nayuta'
import { Kamitsubaki } from './commission/Kamitsubaki'
import { Kyo } from './commission/Kyo'
import { Misc } from './commission/Misc'

import Stale from './commission/stale'

export const commissionData: Props[] = [
  /* ===== Active data ===== */
  ...AZKi,
  ...nayuta,
  ...Lucia,
  ...Kamitsubaki,
  ...Kyo,

  ...Misc,

  /* ===== Stale data ===== */
  ...Stale,
]
