module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src/'],
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
          '@views': './src/views',
          '@routes': './src/modules/routes',
        },
      },
    ],
  ],
};
