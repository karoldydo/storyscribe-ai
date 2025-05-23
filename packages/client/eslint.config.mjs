// @ts-check
import angular from 'angular-eslint';
import tseslint from 'typescript-eslint';

import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...tseslint.config(
    {
      extends: [...angular.configs.tsRecommended],
      files: ['**/*.ts'],
      processor: angular.processInlineTemplates,
      rules: {
        '@angular-eslint/component-selector': ['error', { prefix: 'app', style: 'kebab-case', type: 'element' }],
        '@angular-eslint/contextual-lifecycle': ['error'],
        '@angular-eslint/directive-selector': ['error', { prefix: 'app', style: 'camelCase', type: 'attribute' }],
        '@angular-eslint/no-async-lifecycle-method': ['error'],
        '@angular-eslint/no-pipe-impure': ['error'],
        '@angular-eslint/prefer-on-push-component-change-detection': ['warn'],
        '@angular-eslint/prefer-signals': ['error'],
        '@angular-eslint/prefer-standalone': ['error'],
        '@angular-eslint/use-injectable-provided-in': ['error'],
      },
    },
    {
      extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
      files: ['**/*.html'],
      rules: {},
    }
  ),
];
