import "atomico/ssr";
import { html } from "atomico";

/**
 * @type {import("astro").SSRLoadedRenderer["ssr"]}
 */
const SSR = {
  check(Component) {
    const Element =
      Component.prototype instanceof HTMLElement
        ? Component
        : customElements.get(Component);
    return !!Element?.props;
  },
  renderToStaticMarkup(Component, props, children) {
    const dom = html`<${Component} ...${props}>${children}</${Component}>`;
    return { html: dom.render() };
  },
};

export default SSR;
