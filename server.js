import "atomico/ssr/load";
import { h } from "atomico";
/**
 *
 * @param {string} name
 * @param {string} children
 */
const slotWrapper = (name, children) =>
  `<astro-slot${name ? ` slot="${name}"` : ""}>${children}</astro-slot>`;

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
  renderToStaticMarkup(Component, props, { default: children, ...slotted }) {
    let fragment = children != null ? slotWrapper("", children) : "";

    for (const slot in slotted) {
      fragment += slotWrapper(slot, slotted[slot]);
    }

    return { html: h(Component, props).render(fragment) };
  },
};

export default SSR;
