module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/__tests__/utils/'],
  setupFilesAfterEnv: ['./jest-setup.js']
};
