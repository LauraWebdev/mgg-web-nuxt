module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended'
    ],
    plugins: [
    ],
    // add your custom rules here
    rules: {
        "vue/html-indent": "off",
        "vue/max-attributes-per-line": "off",
        "vue/html-self-closing": "off",
        "vue/attributes-order": "off",
        "vue/singleline-html-element-content-newline": "off",
        "vue/mustache-interpolation-spacing": "off",
        "vue/no-v-html": "off",
        "indent": "off",
        "semi": [1, "always"],
        "no-extra-semi": "off",
        "object-shorthand": "off",
        "comma-dangle": "off"
    }
}
