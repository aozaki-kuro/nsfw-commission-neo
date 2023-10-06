import { Props } from '#data/types'

import { Ina } from './Ina'
import { Nishe } from './Nishe'
import { Tkmt } from './Tkmt'

const Stale: Props[] = [
  ...Ina,
  ...Nishe,
  ...Tkmt,
  // ... and other spreads
]

export default Stale
