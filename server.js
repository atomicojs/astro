import "atomico/ssr/load";
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
  renderToStaticMarkup(Component, props, content) {
    const children = [];
    for (const prop in content) {
      children.push(content[prop]);
    }
    const dom = html`<${Component} ...${props}></${Component}>`;
    return { html: dom.render(children) };
  },
};

export default SSR;
