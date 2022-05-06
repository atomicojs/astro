/**
 *
 * @returns {import("astro").AstroRenderer}
 */
function getRenderer() {
  return {
    name: "@atomico/astro",
    serverEntrypoint: "@atomico/astro/server.js",
    jsxImportSource: "atomico",
    jsxTransformOptions: async () => {
      const {
        default: { default: jsx },
      } = await import("@babel/plugin-transform-react-jsx");
      return {
        plugins: [jsx({}, { runtime: "automatic", importSource: "atomico" })],
      };
    },
  };
}

/**
 *
 * @returns {import("astro").AstroIntegration}
 */
export default function () {
  return {
    name: "@atomico/astro",
    hooks: {
      "astro:config:setup": ({ addRenderer }) => {
        addRenderer(getRenderer());
      },
    },
  };
}
