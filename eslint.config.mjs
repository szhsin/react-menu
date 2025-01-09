// @ts-check

import eslint from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactHooksAddons from 'eslint-plugin-react-hooks-addons';

export default [
  eslint.configs.recommended,
  prettier,
  jest.configs['flat/recommended'],
  jest.configs['flat/style'],
  react.configs.flat.recommended,
  reactHooksAddons.configs.recommended,
  {
    ignores: ['**/dist/', '**/types/', '**/coverage/', '**/example/']
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    plugins: {
      jest,
      react,
      'react-hooks': reactHooks
    },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_\\d?$'
        }
      ],
      'jest/expect-expect': [
        'error',
        {
          assertFunctionNames: ['expect', 'utils.expect*']
        }
      ],
      'react/react-in-jsx-scope': 0,
      'react/prop-types': 0,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks-addons/no-unused-deps': 'error'
    }
  }
];
