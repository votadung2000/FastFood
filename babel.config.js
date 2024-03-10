module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@api': './src/actions/Data',
          '@actionApi': './src/actions/Api',
          '@components': './src/components',
          '@constant': './src/constant',
          '@context': './src/context',
          '@modules': './src/modules',
          '@storage': './src/storage',
          '@store': './src/store',
          '@utils': './src/utils',
          '@resolutions': './src/utils/resolutions',
          '@views': './src/views',
          '@svg': './src/svg',
          '@routes': './src/modules/routes',
        },
      },
    ],
  ],
};
