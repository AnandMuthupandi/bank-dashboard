// // export {};
// /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   moduleNameMapper: {

//       // if your using tsconfig.paths thers is no harm in telling jest
//     '@components/(.*)$': '<rootDir>/src/components/$1',
//     '@/(.*)$': '<rootDir>/src/$1',

//       // mocking assests and styling
//     '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
//       '<rootDir>/tests/mocks/fileMock.ts',
//     '^.+\\.(css|less|scss|sass)$': '<rootDir>/tests/mocks/styleMock.ts',
//     /* mock models and services folder */
//     '(assets|models|services)': '<rootDir>/tests/mocks/fileMock.ts',
//   },
//    // to obtain access to the matchers.
//   setupFilesAfterEnv: ['./tests/setupTests.ts'],

//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
//   modulePaths: ['<rootDir>'],
//   testEnvironment: 'jsdom',

// };
// module.exports =  {
//   preset: 'ts-jest',
//   transform: { '^.+\\.ts?$': 'ts-jest' },
//   clearMocks: true,
//   collectCoverage: true,
//   coverageDirectory: "coverage",
// }
export {};
// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "jsdom",
//   // setupFilesAfterEnv: ["<rootDir>/tests/setupTests.tsx"],
//   setupFiles: ["<rootDir>/tests/setupTests.ts"],
//   moduleNameMapper: {
//     "\\.(css|less|scss|sass)$": "identity-obj-proxy",
//   },
// };

module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.tsx"],

  // setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],

  preset: "ts-jest",
  rootDir: ".",
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "identity-obj-proxy",

    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss)$": "<rootDir>/test/mocks/styleMock.js",

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    "^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i": `<rootDir>/tests/mocks/fileMock.js`,

    // Handle module aliases
    "^~/(.*)$": "<rootDir>/$1",
    d3: "<rootDir>/node_modules/d3/dist/d3.min.js",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,tsx}",
    // "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/functions",
  ],
  testEnvironment: "jsdom",
  verbose: false,
  //resolver: "jest-node-exports-resolver",
  // transform: { "^.+\\.ts?$": "ts-jest" },
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|jpeg|ttf|woff|woff2)$":
      "<rootDir>/tests/mocks/fileTransformer.js",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(dequal)/)",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};
