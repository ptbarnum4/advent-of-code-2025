import eslint from '@eslint/js';
import tslint from 'typescript-eslint';

import Globals from 'globals';

import PrettierPlugin from 'eslint-config-prettier/flat';

export default [
  {
    ignores: ['node_modules/**', '*eslint*']
  },
  eslint.configs.recommended,
  ...tslint.configs.recommended,
  PrettierPlugin,
  {
    languageOptions: {
      parser: tslint.parser,
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
        ecmaFeatures: {
          jsx: true
        }
      },

      globals: {
        ...Globals.node,
        ...Globals.mocha
      }
    },

    rules: {
      'linebreak-style': ['error', 'unix'],
      quotes: [
        2,
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: true
        }
      ],
      semi: ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-case-declarations': 1,
      'prefer-const': 'error',
      'no-var': 'error',
      'import/prefer-default-export': 0,
      'object-curly-spacing': ['error', 'always'],
      'eol-last': 2,
      'no-trailing-spaces': 2,
      'object-shorthand': 'off',
      'import/extensions': ['off', 'never'],
      'import/no-absolute-path': ['off', 'never'],
      'no-extra-boolean-cast': 'off',
      // Requires variables to be declared separately, not in a single statement
      'one-var': ['error', 'never'],
      // Enforce consistent brace style for all control statements (if, else, while, etc. cannot be inline)
      curly: 1,
      // Let prettier handle indentation formatting
      indent: 'off',

      // No unused variables
      // Turn off base rule as it conflicts with TypeScript
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      // Typescript handles this. If enabled, it will break ts import check
      'import/no-unresolved': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-expressions': 0
    }
  }
];
