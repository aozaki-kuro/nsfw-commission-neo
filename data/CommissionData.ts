import { Props } from '#data/types'

// Active
import { AZKi } from '#data/commission/AZKi'
import { Lucia } from '#data/commission/Lucia'

// Misc
import { Misc } from './commission/Misc'

// Stale
import { Ina } from '#data/commission/stale/Ina'
import { Nishe } from '#data/commission/stale/Nishe'
import { Tkmt } from '#data/commission/stale/Tkmt'
import { nayuta } from './commission/nayuta'
import { Kamitsubaki } from './commission/Kamitsubaki'

export const commissionData: Props[] = [
  /* ===== Active data ===== */
  ...AZKi,
  ...nayuta,
  ...Lucia,
  ...Kamitsubaki,

  ...Misc,

  /* ===== Stale data ===== */
  ...Ina,
  ...Nishe,
  ...Tkmt,
]
