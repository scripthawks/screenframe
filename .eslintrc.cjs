module.exports = {
  extends: [
    '@it-incubator/eslint-config',
    'plugin:storybook/recommended',
  ],
  plugins: ['perfectionist'],
  rules: {
    // сортировка экспортов
    'perfectionist/sort-exports': 'error',
    // сортировка пропсов компонентов (JSX)
    'perfectionist/sort-jsx-props': 'error',
    // сортировка свойств объектов, типов и т.д.
    'perfectionist/sort-objects': 'error',
  },
};
