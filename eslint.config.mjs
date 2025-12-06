import eslint from '@eslint/js';
import tslint from 'typescript-eslint';

import Globals from 'globals';

import PrettierPlugin from 'eslint-config-prettier/flat';

export default [
  {
    ignores: ['node_modules/**', '*eslint*']
  },
  eslint.configs.recommended,
  tslint.configs.recommended,
  PrettierPlugin,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    settings: {
      'import/resolver': {
        meteor: true,
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    }
  },
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
    plugins: {
      '@typescript-eslint': tslint.plugin
    },
    settings: {
      react: { version: 'detect' }
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
      '@typescript-eslint/no-explicit-any': 'error'
    }
  },
  // Deal with expect assertions, i.e.
  // expect(foo).to.not.be.empty;
  {
    files: ['**/cypress/**/*.{js,ts,jsx,tsx}', '**/*.cy.{js,ts,jsx,tsx}', '**/*.test.{js,ts}'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  },
  {
    files: ['**/*.{jsx,tsx}'],
    settings: { react: { version: 'detect' } },
    languageOptions: {
      globals: Globals.browser,
      parserOptions: {
        ecmaVersion: 2024,
        ecmaFeatures: { jsx: true },
        sourceType: 'module'
      }
    },
    rules: {
      // ... any rules you want
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'jsx-quotes': ['error', 'prefer-single'],

      // This should maybe be enabled at some point
      'react/no-unescaped-entities': 'off',
      'object-shorthand': 'off'
    }
  }
];
