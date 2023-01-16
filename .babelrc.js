
const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ["./src/"],
      alias: {
        '@api': './actions/Data',
        '@actionApi': './actions/Api',
        '@components': './components',
        '@constant': './constant',
        '@context': './context',
        '@modules': './modules',
        '@store': './store',
        '@utils': './utils',
        '@views': './views',
        '@routes': './modules/routes',
      }
    }

  ]
];
