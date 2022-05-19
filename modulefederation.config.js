const { dependencies } = require("./package.json");

module.exports = {
  name: "config",
  exposes: {
    // !test
    "./MyConfig": "./src/MyConfig.tsx",
    "./appConfig": "./src/configs/appConfig.ts",
    "./camundaConfig": "./src/configs/camundaConfig.ts",
    "./i18n": "./src/configs/i18n.ts",
    "./localization": "./src/configs/localization.ts",
  },
  filename: "remoteEntry.js",
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies["react"],
    },
    "react-dom": {
      singleton: true,
      requiredVersion: dependencies["react-dom"],
    },
  },
};
