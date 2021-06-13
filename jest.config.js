module.exports = {
  projects: [
    {
      preset: '@shelf/jest-mongodb',
      displayName: 'api',
      rootDir: 'dist/api',
      setupFilesAfterEnv: ['./test-setup.js']
    },
    {
      displayName: 'ui',
      rootDir: 'dist/ui',
      testEnvironment: 'jsdom'
    }
  ],
  watchPathIgnorePatterns: ['globalConfig']
}
