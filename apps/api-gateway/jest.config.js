/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  // mapeia EXATAMENTE @cobranca/core-domain → pacote fonte
  moduleNameMapper: {
    '^@cobranca/core-domain$': '<rootDir>/../../packages/core-domain/src',
  },
};

