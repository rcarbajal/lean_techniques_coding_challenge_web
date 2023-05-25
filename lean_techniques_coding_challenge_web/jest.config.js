const nextJest = require('next/jest');
const createJestConfig = nextJest({
    dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
    setupFiles: [
        "<rootDir>/test/setup.ts",
    ],
    setupFilesAfterEnv: [
        "<rootDir>/test/setupAfterEnv.ts",
    ],
    moduleDirectories: ["node_modules", "<rootDir>/"],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '@/app/services/(.*)$': '<rootDir>/src/app/services/$1',
    }
};

module.exports = createJestConfig(customJestConfig);