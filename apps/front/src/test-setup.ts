import 'jest-preset-angular';

Object.defineProperty(window, 'matchMedia', {value: jest.fn(() => ({ matches: true }))});
