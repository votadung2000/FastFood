
const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: [""],
      alias: {
        '@api': './src/actions/Data',
        '@actionApi': './src/actions/Api',
        '@actionApiLocation': './src/actions/ApiLocation',
        '@components': './src/components',
        '@constant': './src/constant',
        '@context': './src/context',
        '@modules': './src/modules',
        '@store': './src/store',
        '@utils': './src/utils',
        '@resolutions': './src/utils/resolutions',
        '@views': './src/views',
        '@svg': './src/svg',
        '@routes': './src/modules/routes',
        '@images': './assets/images'
      }
    }

  ]
];
