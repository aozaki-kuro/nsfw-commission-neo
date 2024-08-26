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
    { DisplayName: 'AZKi' },
    { DisplayName: 'Studio K' },
    { DisplayName: 'L*cia' },
    { DisplayName: 'Kanaut Nishe' },
    { DisplayName: 'H*nabasami Kyo' },
  ],

  /* ======= Stale Characters ======= */
  stale: [
    { DisplayName: 'Blue Archive' },
    { DisplayName: 'n*yuta' },
    { DisplayName: 'HACHI' },
    { DisplayName: 'Sport!' },
    { DisplayName: "Ninomae Ina'nis" },
    { DisplayName: 'Tokomachi' },
  ],
}
