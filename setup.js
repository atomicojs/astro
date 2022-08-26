import Atomico from "@atomico/vite";
/**
 *
 * @returns {import("astro").AstroRenderer}
 */
function getRenderer() {
  return {
    name: "@atomico/astro",
    clientEntrypoint: "@atomico/astro/client",
    serverEntrypoint: "@atomico/astro/server",
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
export default function ({
  cssLiterals = { minify: false, postcss: false },
} = {}) {
  return {
    name: "@atomico/astro",
    hooks: {
      "astro:config:setup": ({ addRenderer, updateConfig }) => {
        addRenderer(getRenderer());
        updateConfig({
          vite: {
            optimizeDeps: {
              include: ["atomico", "atomico/jsx-runtime"],
              exclude: ["@atomico/astro/server"],
            },
            plugins: [Atomico({ jsx: false, cssLiterals })],
          },
        });
      },
    },
  };
}
