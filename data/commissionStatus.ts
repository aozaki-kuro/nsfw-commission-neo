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
  ],

  /* Stale Characters */
  stale: [
    { DisplayName: 'n*yuta' },
    { DisplayName: 'H*nabasami Kyo' },
    { DisplayName: 'Kanaut Nishe' },
    { DisplayName: "Ninomae Ina'nis" },
    { DisplayName: 'Blue Archive' },
    // { DisplayName: 'Tokomachi' },
  ],
}
