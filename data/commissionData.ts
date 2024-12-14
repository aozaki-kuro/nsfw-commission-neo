import activeCommissions from './Active'
import staleCommissions from './Stale'

import { filterHiddenCommissions } from '#components/utils'

import { Props } from './types'

export const commissionData: Props = filterHiddenCommissions([
  ...activeCommissions,
  ...staleCommissions,
])
