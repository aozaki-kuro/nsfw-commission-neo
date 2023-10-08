interface Props {
  Abbr: string
  FullName: string
  Active: boolean
  Order: number
}

export const characterDictionary: Props[] = [
  { Abbr: 'azki', FullName: 'AZKi', Active: true, Order: 1 },
  { Abbr: 'nayuta', FullName: 'n*yuta', Active: true, Order: 2 },
  { Abbr: 'lucia', FullName: 'L*cia', Active: true, Order: 3 },
  { Abbr: 'kamitsubaki', FullName: 'Studio K', Active: true, Order: 4 },
  { Abbr: 'hanabasami-kyo', FullName: 'H*nabasami Kyo', Active: true, Order: 5 },
  { Abbr: 'misc', FullName: 'Misc', Active: true, Order: 99 },

  { Abbr: 'ina', FullName: "Ninomae Ina'nis", Active: false, Order: 1 }, // Adjusted name as per comment
  { Abbr: 'nishe', FullName: 'Kanaut Nishe', Active: false, Order: 2 },
  { Abbr: 'tkmt', FullName: 'Tokomachi', Active: false, Order: 3 },
]
