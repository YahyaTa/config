const { dependencies } = require("./package.json");

module.exports = {
  name: "config",
  exposes: {
    // ? configs folder
    "./MyConfig": "./src/MyConfig.tsx",
    "./appConfig": "./src/configs/appConfig.ts",
    "./camundaConfig": "./src/configs/camundaConfig.ts",
    "./i18n": "./src/configs/i18n.ts",
    "./localization": "./src/configs/localization.ts",

    // ? themes folder
    "./themes/generateClassName": "./src/themes/generateClassName.tsx",
    "./themes/ProfileProvider/ProfileProvider":
      "./src/themes/ProfileProvider/ProfileProvider.tsx", //! this folder isn't working need to be fixed
    "./themes/standard/components": "./src/themes/standard/components.ts",
    "./themes/standard/index": "./src/themes/standard/index.ts",
    "./themes/standard/palette": "./src/themes/standard/palette.ts",
    "./themes/standard/typography": "./src/themes/standard/typography.ts",

    //? store folder
    // * actions
    "./store/actions/authActions": "./src/store/actions/authActions.ts",
    //* reducers
    "./store/reducers/aiaReducer": "./src/store/reducers/aiaReducer.ts",
    "./store/reducers/camundaReducer": "./src/store/reducers/camundaReducer.ts",
    "./store/reducers/index": "./src/store/reducers/index.ts",
    "./store/reducers/newWindowReducer":
      "./src/store/reducers/newWindowReducer.ts",
    "./store/reducers/secondaryTabsReducer":
      "./src/store/reducers/secondaryTabsReducer.ts",
    // * slices
    "./store/slices/disabledButtonSlice":
      "./src/store/slices/disabledButtonSlice.tsx",
    "./store/slices/notificationsSlice":
      "./src/store/slices/notificationsSlice.ts",
    // * configure
    "./store/configStore": "./src/store/configStore",
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
    "@material-ui/styles": {
      singleton: true, // Sharing styles package as singleton
    },
    "@mui/styles": {
      singleton: true, // Sharing styles package as singleton
    },
    "@mui/material": {
      singleton: true, // Sharing styles package as singleton
    },
    // "@material-ui/styles": {
    //   singleton: true, // Sharing styles package as singleton
    // },
    // "@material-ui/styles": {
    //   singleton: true, // Sharing styles package as singleton
    // },
    // "@material-ui/styles": {
    //   singleton: true, // Sharing styles package as singleton
    // },
  },
};
