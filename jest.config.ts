// import type { Config } from 'jest';
import { defaults } from 'jest-config';
import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: defaults.testRegex,
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: '<rootDir>/test/tsconfig.json',
      },
    ],
  },
  testEnvironment: 'jest-environment-node',
  testPathIgnorePatterns: [
    '<rootDir>/src/client',
    '<rootDir>/dist/',
    '<rootDir>/tmp/',
    '<rootDir>/node_modules/',
    '<rootDir>/local_tests/',
  ],
  testTimeout: 20_000,
  // setupFiles: ['<rootDir>/test/helpers/init.js'],
  // collectCoverageFrom: ['**/*.(t|j)s'],
  collectCoverageFrom: ['<rootDir>/src/**/*.(t|j)s'],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: [['lcov', { projectRoot: './' }], 'text'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/test/',
    '<rootDir>/dist/',
    '<rootDir>/tmp/',
    '<rootDir>/local_tests/',
    '<rootDir>/coverage/',
    '<rootDir>/src/utils/ui/',
    '<rootDir>/src/client/',
  ],
  coverageThreshold: {
    global: {
      statements: 82,
      branches: 62,
      functions: 77,
      lines: 82,
    },
  },
};

export default config;
