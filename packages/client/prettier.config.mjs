import baseConfig from '../../prettier.config.mjs';

export default {
  ...baseConfig,
  attributeGroups: [
    '$CODE_GUIDE',
    '$ANGULAR_ELEMENT_REF',
    '$ANGULAR_STRUCTURAL_DIRECTIVE',
    '$ANGULAR_ANIMATION',
    '$ANGULAR_ANIMATION_INPUT',
    '$ANGULAR_TWO_WAY_BINDING',
    '$ANGULAR_INPUT',
    '$ANGULAR_OUTPUT',
  ],
  attributeSort: 'ASC',
  plugins: [...baseConfig.plugins, 'prettier-plugin-organize-attributes', 'prettier-plugin-tailwindcss'],
};
