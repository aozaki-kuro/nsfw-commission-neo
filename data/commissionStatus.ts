interface CharacterProps {
  DisplayName: string
}

interface CommissionStatus {
  active: CharacterProps[]
  stale: CharacterProps[]
}

export const characterStatus: CommissionStatus = {
  /* Active Characters */
  active: [
    { DisplayName: 'AZKi' },
    { DisplayName: 'Studio K' },
    { DisplayName: 'L*cia' },
    { DisplayName: 'Kanaut Nishe' },
    { DisplayName: 'Sport!' },
  ],

  /* Stale Characters */
  stale: [
    { DisplayName: 'n*yuta' },
    { DisplayName: 'H*nabasami Kyo' },
    { DisplayName: 'Blue Archive' },
    { DisplayName: 'HACHI' },
    { DisplayName: "Ninomae Ina'nis" },
    { DisplayName: 'Tokomachi' },
  ],
}
