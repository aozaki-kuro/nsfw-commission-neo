interface Props {
  DisplayName: string
  Active: boolean
  Order: number
}

export const characterDictionary: Props[] = [
  { DisplayName: 'AZKi', Active: true, Order: 1 },
  { DisplayName: 'n*yuta', Active: true, Order: 2 },
  { DisplayName: 'Studio K', Active: true, Order: 3 },
  { DisplayName: 'L*cia', Active: true, Order: 4 },
  { DisplayName: 'H*nabasami Kyo', Active: true, Order: 5 },
  { DisplayName: 'Misc', Active: true, Order: 99 },

  { DisplayName: "Ninomae Ina'nis", Active: false, Order: 1 }, // Adjusted name as per comment
  { DisplayName: 'Kanaut Nishe', Active: false, Order: 2 },
  { DisplayName: 'Tokomachi', Active: false, Order: 3 },
]
