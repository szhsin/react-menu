module.exports = {
  clearMocks: true,
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.js'],
  setupFilesAfterEnv: ['@testing-library/jest-dom', 'jest-dom-extended/jest', './setup-jest.js']
};
