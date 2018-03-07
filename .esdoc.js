module.exports = {
  source: './src',
  destination: './docs/api',
  index: './api_index.md',
  excludes: ['test'],
  plugins: [
    {
      name: 'esdoc-standard-plugin',
      option: {
        accessor: {
          access: ['public', 'protected'],
        },
      },
    },
    {
      name: 'esdoc-importpath-plugin',
      option: {
        stripPackageName: true,
        replaces: [
          { from: '.*', to: 'seashell-animation' },
        ],
      },
    },
  ],
}
