import "atomico/ssr/load";
import { h } from "atomico";
import * as parse5 from "parse5";
/**
 *
 * @param {string} name
 * @param {string} children
 */
const slotWrapper = (name, children) => {
  if (name === "default" || !name) return children;

  const fragment = parse5.parseFragment(`${children}`);

  // Add the missing slot attribute to child Element nodes
  for (const node of fragment.childNodes) {
    if (node.tagName && !node.attrs.some(({ name }) => name === "slot")) {
      node.attrs.push({ name: "slot", value: name });
    }
  }

  return parse5.serialize(fragment);
};

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
