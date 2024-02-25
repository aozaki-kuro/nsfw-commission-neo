interface Props {
  DisplayName: string
  Active: boolean
  Order: number
}

export const characterDictionary: Props[] = [
  /* Active Characters */
  { DisplayName: 'AZKi', Active: true, Order: 1 },
  { DisplayName: 'Studio K', Active: true, Order: 2 },
  { DisplayName: 'H*nabasami Kyo', Active: true, Order: 5 },
  // { DisplayName: 'K*toha', Active: true, Order: 6 }, // TBA
  { DisplayName: 'HACHI', Active: true, Order: 8 },

  /* Stale Characters */
  { DisplayName: 'n*yuta', Active: false, Order: 98 },
  { DisplayName: 'L*cia', Active: false, Order: 99 },
  { DisplayName: 'Kanaut Nishe', Active: false, Order: 997 },
  { DisplayName: "Ninomae Ina'nis", Active: false, Order: 998 },
  { DisplayName: 'Blue Archive', Active: false, Order: 999 },

  // { DisplayName: 'Tokomachi', Active: false, Order: 65535 },
]
