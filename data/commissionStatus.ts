interface CharacterProps {
  DisplayName: string
}

interface CommissionStatus {
  active: CharacterProps[]
  stale: CharacterProps[]
}

export const characterStatus: CommissionStatus = {
  /* ======= Active Characters ======= */
  active: [
    { DisplayName: 'L*cia' },
    { DisplayName: 'Kanaut Nishe' },
    { DisplayName: 'Studio K' },
    { DisplayName: 'AZKi' },
  ],

  /* ======= Stale Characters ======= */
  stale: [
    { DisplayName: 'Blue Archive' },
    { DisplayName: 'H*nabasami Kyo' },
    { DisplayName: 'n*yuta' },
    // Very unlikely to change
    { DisplayName: 'HACHI' },
    { DisplayName: 'Sport!' },
    { DisplayName: "Ninomae Ina'nis" },
    { DisplayName: 'Tokomachi' },
  ],
}
