interface Props {
  DisplayName: string
  Active: boolean
  Order: number
}

export const characterDictionary: Props[] = [
  /* Active Characters */
  { DisplayName: 'AZKi', Active: true, Order: 1 },
  { DisplayName: 'n*yuta', Active: true, Order: 2 },
  { DisplayName: 'Studio K', Active: true, Order: 3 },
  { DisplayName: 'H*nabasami Kyo', Active: true, Order: 5 },
  { DisplayName: 'Misc', Active: true, Order: 99 },

  /* Stale Characters */
  { DisplayName: 'L*cia', Active: false, Order: 96 },
  { DisplayName: "Ninomae Ina'nis", Active: false, Order: 97 }, // Adjusted name as per comment
  { DisplayName: 'Kanaut Nishe', Active: false, Order: 98 },
  { DisplayName: 'Tokomachi', Active: false, Order: 99 },
]
