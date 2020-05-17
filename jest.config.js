module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
      '^@lib/(.*)$': '<rootDir>/src/$1',
  }
};
