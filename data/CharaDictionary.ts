interface Chara {
  Abbr: string
  FullName: string
}

export const charaDictionary: Chara[] = [
  { Abbr: 'azki', FullName: 'AZKi' },
  { Abbr: 'ina', FullName: "Ninomae Ina'nis" }, // Too long, fix with comment lol
  { Abbr: 'misc', FullName: 'Misc' },

  // Anonymous Characters
  { Abbr: 'lucia', FullName: 'L_cia' },
  { Abbr: 'kamitsubaki', FullName: 'Studio K' },
  { Abbr: 'nayuta', FullName: 'n_yuta' },

  // Stale
  { Abbr: 'nishe', FullName: 'Kanaut Nishe' },
  { Abbr: 'tkmt', FullName: 'Tokomachi' },
]
