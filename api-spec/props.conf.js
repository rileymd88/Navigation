const path = require("path");

const pkg = require(path.resolve(__dirname, "../package.json")); // eslint-disable-line

module.exports = {
  fromJsdoc: {
    glob: ["./src/object-properties.js"],
    api: {
      stability: "experimental",
      visibility: "public",
      properties: {
        "x-qlik-visibility": "public",
      },
      name: `${pkg.name}:properties`,
      version: pkg.version,
      description: "Shape generic object definition",
    },
    output: {
      sort: {
        alpha: false,
      },
      file: "./api-spec/spec.json",
    },
    parse: {
      types: {
        undefined: {},
        "EngineAPI.StringExpression": {
          url: "https://qlik.dev/apis/json-rpc/qix/schemas#%23%2Fdefinitions%2Fschemas%2Fentries%2FStringExpression",
        },
      },
    },
  },
  toDts: {
    spec: "./api-spec/spec.json",
    output: {
      file: "./types/index.d.ts",
    },
    dependencies: {
      references: ["qlik-engineapi"],
    },
  },
};
