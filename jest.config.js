module.exports = {
  projects: [
    {
      displayName: 'api',
      rootDir: 'dist/api',
      testEnvironment: 'node'
    },
    {
      displayName: 'ui',
      rootDir: 'dist/ui',
      testEnvironment: 'jsdom'
    }
  ]
}
