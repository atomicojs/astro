/**
 * @param {HTMLElement} element
 */
export default (element) => async (Component, props, slotted) => {
  let component = element.firstElementChild;

  if (!Component?.props) return;

  /**
   * reference from lit
   * @link { https://github.com/withastro/astro/blob/main/packages/integrations/lit/src/client.ts}
   */
  const isClientOnly = element.getAttribute("client") === "only";

  if (isClientOnly) {
    component = new Component();

    Object.entries(slotted).forEach(([slot, html]) => {
      const template = document.createElement("template");

      template.innerHTML = html;

      template.content
        .querySelectorAll("[data-hydrate]")
        .forEach((el) => el.removeAttribute("data-hydrate"));

      const { children } = template.content;

      if (slot != "default") {
        for (let i = 0; i < children.length; i++) {
          children[i].setAttribute("slot", slot);
        }
      }

      component.appendChild(template.content);
    });

    element.appendChild(component);

    for (const prop in props) {
      if (!(prop in Component.prototype)) {
        component.setAttribute(prop, props[prop]);
      }
    }
  }

  if (!component) return;

  for (const prop in props) {
    if (prop in Component.prototype) {
      component[prop] = props[prop];
    }
  }

  component.removeAttribute("slot");
};
