import activeCommissions from '#data/Active'
import staleCommissions from '#data/Stale'

import { filterHiddenCommissions } from '#components/utils'

import { Props } from '#data/types'

export const commissionData: Props = filterHiddenCommissions([
  ...activeCommissions,
  ...staleCommissions,
])
