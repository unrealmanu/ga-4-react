module.exports = {
  "testTimeout": 10000,
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/test/*(*.)@(test).[tj]s?(x)'],
  testPathIgnorePatterns: [
    '/node_modules/', // default
  ],
};