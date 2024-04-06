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
    { DisplayName: 'HACHI' },
    { DisplayName: 'Kanaut Nishe' },
  ],

  /* Stale Characters */
  stale: [
    { DisplayName: 'n*yuta' },
    { DisplayName: 'H*nabasami Kyo' },
    { DisplayName: "Ninomae Ina'nis" },
    { DisplayName: 'Blue Archive' },
    // { DisplayName: 'Tokomachi' },
  ],
}
