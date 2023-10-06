import { Props } from '#data/types'

export interface CommissionInfoProps extends Props {
  // Processed and required in components, not in Commission Data
  Creator: string
  PublishDate: string
  FullName: string
}
