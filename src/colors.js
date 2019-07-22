const extendedColors = {
    Reds: [
        {
            codeName: 'R900',
            name: 'Blood Clot',
            hex: '8A0F0F',
        },
        {
            codeName: 'R700',
            name: 'Bill',
            hex: 'CC0000',
        },
        {
            codeName: 'R500',
            name: 'Lip Smacker',
            hex: 'ED3233',
        },
        {
            codeName: 'R250',
            name: 'Sunset',
            hex: 'F45D5E',
        },
        {
            codeName: 'R100',
            name: 'Salmon',
            hex: 'F89697',
        },
        {
            codeName: 'R080',
            name: 'Sunburn',
            hex: 'F2BFBF',
        },
        {
            codeName: 'R020',
            name: 'Rosie',
            hex: 'FCE3E3',
        },
    ],
    Blues: [
        {
            codeName: 'B900',
            name: 'School Uniform',
            hex: '023F6E',
        },
        {
            codeName: 'B700',
            name: 'Ocean',
            hex: '0361AA',
        },
        {
            codeName: 'B500',
            name: 'Sky',
            hex: '0484E7',
        },
        {
            codeName: 'B250',
            name: 'San Francisco Bay',
            hex: '229DFB',
        },
        {
            codeName: 'B100',
            name: 'Afternoon',
            hex: '78C3FD',
        },
        {
            codeName: 'B080',
            name: 'Pastel Dream',
            hex: 'CDE9FE',
        },
        {
            codeName: 'B020',
            name: 'Blueish',
            hex: 'ECF6FD',
        },
    ],
    Cyans: [
        {
            codeName: 'C900',
            name: 'Doona',
            hex: '008DA6',
        },
        {
            codeName: 'C700',
            name: 'Fish Tank',
            hex: '00A3BF',
        },
        {
            codeName: 'C500',
            name: 'Party',
            hex: '00B8D9',
        },
        {
            codeName: 'C250',
            name: 'Sea Breeze',
            hex: '00C7E6',
        },
        {
            codeName: 'C100',
            name: 'Lagoon',
            hex: '79E2F2',
        },
        {
            codeName: 'C080',
            name: 'Soap',
            hex: 'B3F5FF',
        },
        {
            codeName: 'C020',
            name: 'Cyanish',
            hex: 'E6FCFF',
        },
    ],
    Greens: [
        {
            codeName: 'G900',
            name: 'Wald',
            hex: '0C5F35',
        },
        {
            codeName: 'G700',
            name: 'Forest',
            hex: '1E995B',
        },
        {
            codeName: 'G500',
            name: 'Grass',
            hex: '25BA6F',
        },
        {
            codeName: 'G250',
            name: 'Go Time',
            hex: '4FC489',
        },
        {
            codeName: 'G100',
            name: 'Dolla Bill',
            hex: '7EC8A3',
        },
        {
            codeName: 'G080',
            name: 'Mint',
            hex: 'C9EEDB',
        },
        {
            codeName: 'G020',
            name: 'Greenish',
            hex: 'EBF9F2',
        },
    ],
    Yellows: [
        {
            codeName: 'Y900',
            name: 'Midday',
            hex: 'F37A02',
        },
        {
            codeName: 'Y700',
            name: 'Mandarin',
            hex: 'FDA902',
        },
        {
            codeName: 'Y500',
            name: 'Citric Dream',
            hex: 'FFBB33',
        },
        {
            codeName: 'Y250',
            name: 'Cosmic Banana',
            hex: 'FDDA35',
        },
        {
            codeName: 'Y100',
            name: 'Bananarama',
            hex: 'FEE367',
        },
        {
            codeName: 'Y080',
            name: 'Gross Wallpaper',
            hex: 'FEEC9A',
        },
        {
            codeName: 'Y020',
            name: 'Yellowish',
            hex: 'FEF9DC',
        },
    ],
    Neutrals: [
        {
            codeName: 'N900',
            name: 'Dead of Night',
            hex: '111111',
        },
        {
            codeName: 'N700',
            name: 'Slate',
            hex: '484848',
        },
        {
            codeName: 'N500',
            name: 'Boring',
            hex: '6D6D6D',
        },
        {
            codeName: 'N250',
            name: 'Grandma',
            hex: 'ADADAD',
        },
        {
            codeName: 'N100',
            name: 'Concrete',
            hex: 'DDDDDD',
        },
        {
            codeName: 'N020',
            name: 'Egg White',  
            hex: 'FAFAFA',
        },
        {
            codeName: 'N000',
            name: 'White',
            hex: 'FFFFFF',
        },
    ],
    Purples: [
        {
            codeName: 'P900',
            name: 'Royal',
            hex: '403294',
        },
        {
            codeName: 'P700',
            name: 'Prince',
            hex: '5243AA',
        },
        {
            codeName: 'P500',
            name: 'Cadbury',
            hex: 'FDA902',
        },
        {
            codeName: 'P250',
            name: 'Romantic',
            hex: '8777D9',
        },
        {
            codeName: 'P100',
            name: 'Aura',
            hex: '998DD9',
        },
        {
            codeName: 'P080',
            name: 'Lavender',
            hex: 'C0B6F2',
        },
        {
            codeName: 'P020',
            name: 'Purplish',
            hex: 'EAE6FF',
        },
    ],
};

const coreColors = {
    primary: extendedColors.Reds[1],
    secondary: extendedColors.Blues[2],
    black: extendedColors.Neutrals[1],
    white: extendedColors.Neutrals[6],
    text: extendedColors.Neutrals[1],
    'subdued text': extendedColors.Neutrals[2],
    background: extendedColors.Neutrals[6],
    muted: extendedColors.Neutrals[4],
    accent: extendedColors.Blues[2],
    success: extendedColors.Greens[3],
    warning: extendedColors.Yellows[3],
    error: extendedColors.Reds[4],  
};

export { coreColors, extendedColors };