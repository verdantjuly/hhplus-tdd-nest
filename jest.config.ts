// jest.config.js
module.exports = {
  rootDir: '.', // 프로젝트 루트를 기준으로 설정
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',

  // ✅ 절대경로(src/...) 매핑
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};
