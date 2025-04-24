
module.exports = {
    preset: 'ts-jest',  // Use ts-jest preset for TypeScript support
    testEnvironment: 'node',  // Set the test environment to Node.js
    transform: {
      '^.+\\.ts$': 'ts-jest',  // Transform TypeScript files using ts-jest
      '^.+\\.tsx$': 'ts-jest',  // Transform TypeScript JSX files using ts-jest
    },
    transformIgnorePatterns: [
      '/node_modules/',  // Ignore transforming most node_modules, only if needed
    ],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',  // Handle your module aliases
    },
  };
  