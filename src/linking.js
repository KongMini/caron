const config = {
  screens: {
    InheritApp: {
      path: 'inherit',
    },
    TermsOfUse: {
      path: 'policy',
    },
    AppIntro: 'intro',
  },
};

const linking = {
  prefixes: ['kompasu://app'],
  config,
};

export default linking;
