// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
        },
      ],
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          extensions: [
            '.ts',
            '.tsx',
            '.ios.tsx',
            '.android.tsx',
            '.web.tsx',
            '.json',
          ],
          alias: {
            '@assets': path.join(__dirname, 'src', 'assets'),
            '@components': path.join(__dirname, 'src', 'components'),
            '@config': path.join(__dirname, 'src', 'config'),
            '@hooks': path.join(__dirname, 'src', 'hooks'),
            '@routes': path.join(__dirname, 'src', 'routes'),
            '@screens': path.join(__dirname, 'src', 'screens'),
            '@store': path.join(__dirname, 'src', 'store'),
            '@utils': path.join(__dirname, 'src', 'utils'),
          },
        },
      ],
    ],
  }
}
