module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src/'],
        alias: {
          '@api': './src/actions/Data',
          '@components': './src/components',
          '@constant': './src/constant',
          '@context': './src/context',
          '@modules': './src/modules',
          '@store': './src/store',
          '@utils': './src/utils',
          '@views': './src/views',
          '@routes': './src/modules/routes',
        },
      },
    ],
  ],
};
