module.exports = {
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    env: {
        browser: true,
        'jest/globals': true
    },
    rules: {
        'array-callback-return': 'error',
        'default-case': 'error',
        'eol-last': 'error',
        'func-call-spacing': ['error', 'never'],
        'init-declarations': ['error', 'always'],
        'max-len': ['error', { 'ignoreComments': true }, { 'code': 120 }],
        'max-lines-per-function': ['error', { 'max': 30 }],
        'max-lines': ['warn', { 'max': 500 }],
        'no-alert': 'error',
        'no-console': 'error',
        'no-empty-function': 'error',
        'no-extra-parens': 'error',
        'no-extra-semi': 'error',
        'no-new': "error",
        'no-new-func': "error",
        'no-trailing-spaces': 'error',
        'no-unused-vars': "error",
        'semi-spacing': 'error',
        complexity: ["error", 6],
        indent: ['error', 4],
        semi: 'error',
    },
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            plugins: [
                '@typescript-eslint',
            ],
            rules: {
                '@typescript-eslint/array-type': 'error',
                '@typescript-eslint/consistent-type-assertions': 'error',
                '@typescript-eslint/explicit-function-return-type': 'error',
                '@typescript-eslint/explicit-module-boundary-types': 'error',
                '@typescript-eslint/member-delimiter-style': 'error',
                '@typescript-eslint/member-ordering': 'error',
                '@typescript-eslint/method-signature-style': 'error',
                '@typescript-eslint/naming-convention': 'error',
                '@typescript-eslint/no-confusing-non-null-assertion': 'error',
                '@typescript-eslint/no-empty-interface': 'error',
                '@typescript-eslint/no-extra-non-null-assertion': 'error',
                '@typescript-eslint/no-misused-new': 'error',
                '@typescript-eslint/no-require-imports': 'error',
                '@typescript-eslint/type-annotation-spacing': 'error',
                '@typescript-eslint/typedef': 'error',
            }
        },
        {
            files: ['*.vue'],
            parser: 'vue-eslint-parser',
            parserOptions: {
                sourceType: 'module',
                ecmaVersion: 2020,
            },
            plugins: [
                'vue',
            ],
            extends: [
                'plugin:vue/recommended',
                'plugin:vue/essential',
            ],
            rules: {
                'vue/html-indent': ['error', 4],
                'vue/multiline-html-element-content-newline': 'error',
                'vue/no-dupe-keys': 'error',
                'vue/no-duplicate-attributes': 'error',
                'vue/no-parsing-error': 'error',
                'vue/no-reserved-keys': 'error',
                'vue/no-spaces-around-equal-signs-in-attribute': 'error',
                'vue/no-unused-components': 'error',
                'vue/no-use-v-if-with-v-for': 'error',
                'vue/require-render-return': 'error',
                'vue/require-v-for-key': 'error',
            }
        },
        {
            files: ['*.spec.js'],
            extends: [
                'plugin:jest/recommended',
            ],
            plugins: [
                'jest',
            ],
            rules: {
                'max-lines': 'off',
                'max-lines-per-function': 'off',
                'jest/consistent-test-it': 'error',
                'jest/expect-expect': 'error',
                'jest/no-commented-out-tests': 'error',
                'jest/no-disabled-tests': 'error',
                'jest/no-export': 'error',
                'jest/no-focused-tests': 'error',
                'jest/no-identical-title': 'error',
                'jest/no-mocks-import': 'error',
                'jest/prefer-strict-equal': 'error',
                'jest/prefer-to-be-null': 'error',
                'jest/prefer-to-be-undefined': 'error',
                'jest/prefer-to-contain': 'error',
                'jest/prefer-to-have-length': 'error',
                'jest/valid-expect': 'error',
            }
        }
    ]
};
