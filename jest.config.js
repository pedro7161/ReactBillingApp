const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {  
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  testEnvironment: 'jest-environment-jsdom',
  
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

module.exports = createJestConfig(customJestConfig);
