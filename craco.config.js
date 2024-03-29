const cracoModuleFederation = require("craco-module-federation");
const path = require("path");
module.exports = {
  plugins: [
    {
      plugin: cracoModuleFederation,
    },
  ],
  webpack: {
    configure: (webpackConfig) => ({
      ...webpackConfig,
      module: {
        ...webpackConfig.module,
        rules: webpackConfig.module.rules.map((rule) => {
          if (!rule.oneOf) return rule;
          return {
            ...rule,
            oneOf: rule.oneOf.map((ruleObject) => {
              if (
                !new RegExp(ruleObject.test).test(".ts") ||
                !ruleObject.include
              )
                return ruleObject;
              return { ...ruleObject, include: undefined };
            }),
          };
        }),
      },
    }),
  },
};
