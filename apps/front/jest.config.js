module.exports = {
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/front/',
  globals: {
    "__TRANSFORM_HTML__": true,
    'ts-jest': {
      'tsConfigFile': '<rootDir>/tsconfig.spec.json'
    }
  },
  setupTestFrameworkScriptFile: '<rootDir>/src/test-setup.ts'
};
