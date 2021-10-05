module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/__tests__/utils/'],
  setupFilesAfterEnv: ['@testing-library/jest-dom','regenerator-runtime/runtime.js']
};
