module.exports = {
  clearMocks: true,
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.js'],
  setupFilesAfterEnv: ['@testing-library/jest-dom', './setup-jest.js']
};
