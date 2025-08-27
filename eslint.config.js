// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  ...tseslint.config(
    {
      files: ['**/*.ts'],
      extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
        ...tseslint.configs.stylistic,
        ...angular.configs.tsRecommended,
      ],
      processor: angular.processInlineTemplates,
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'warn',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case',
          },
        ],
        // Allow unused variables that start with an underscore
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
        // Force consistent naming conventions
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'memberLike',
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
          },
          {
            selector: 'memberLike',
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: 'require',
          },
          {
            selector: 'memberLike',
            modifiers: ['static'],
            format: ['camelCase', 'UPPER_CASE'],
          },
          {
            selector: 'memberLike',
            modifiers: ['private', 'static'],
            format: ['camelCase', 'UPPER_CASE'],
            leadingUnderscore: 'require',
          },
          {
            selector: 'enumMember',
            format: ['UPPER_CASE'],
          },
          {
            selector: 'objectLiteralProperty',
            format: null,
          },
        ],
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTernary: true,
            allowTaggedTemplates: true,
          },
        ],
      },
    },
    {
      files: ['**/*.html'],
      extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
      rules: {
        '@angular-eslint/template/elements-content': 'off',
      },
    }
  ),
  eslintConfigPrettier,
];
