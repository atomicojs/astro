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
 * @param {object} options
 * @param {object} [options.cssLiterals]
 * @param {boolean} [options.cssLiterals.minify]
 * @param {boolean} [options.cssLiterals.postcss]
 * @param {string} [options.tsconfig]
 * @param {object} [options.customElements]
 * @param {string} options.customElements.prefix
 * @param {string[]} options.customElements.define
 * @returns {import("astro").AstroIntegration}
 */
export default function atomicoAstro({
  cssLiterals = { minify: false, postcss: false },
  tsconfig,
  customElements,
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
            plugins: [
              Atomico({ jsx: false, cssLiterals, tsconfig, customElements }),
            ],
          },
        });
      },
    },
  };
}
