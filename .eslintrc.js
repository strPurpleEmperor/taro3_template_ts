module.exports = {
  extends: ["taro/react"],
  plugins: ["prettier"],
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "import/first": 0,
    "import/no-commonjs": 0,
    "prettier/prettier": "error",
  },
};
