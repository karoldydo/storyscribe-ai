// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';

export default [
  ...tseslint.config({
    files: ['**/*.ts'],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended, ...tseslint.configs.stylistic],
    plugins: { perfectionist },
    rules: {
      'perfectionist/sort-array-includes': ['error'],
      'perfectionist/sort-enums': ['error'],
      'perfectionist/sort-exports': ['error'],
      'perfectionist/sort-imports': ['error'],
      'perfectionist/sort-interfaces': ['error'],
      'perfectionist/sort-intersection-types': ['error'],
      'perfectionist/sort-modules': ['error'],
      'perfectionist/sort-named-exports': ['error'],
      'perfectionist/sort-named-imports': ['error'],
      'perfectionist/sort-object-types': ['error'],
      'perfectionist/sort-objects': ['error'],
      'perfectionist/sort-switch-case': ['error'],
      'perfectionist/sort-union-types': ['error'],
      'perfectionist/sort-variable-declarations': ['error'],
    },
  }),
  eslintConfigPrettier,
];
