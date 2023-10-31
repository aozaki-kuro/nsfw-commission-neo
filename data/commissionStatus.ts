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
  { DisplayName: 'K*toha', Active: true, Order: 6 }, // TBA
  { DisplayName: 'L*cia', Active: true, Order: 9 }, // Near stale
  { DisplayName: 'Misc', Active: true, Order: 99 },

  /* Stale Characters */
  { DisplayName: "Ninomae Ina'nis", Active: false, Order: 997 }, // Adjusted name as per comment
  { DisplayName: 'Kanaut Nishe', Active: false, Order: 998 },
  // { DisplayName: 'Tokomachi', Active: false, Order: 999 },
]
