import styles from "./draftComponent.css";

export class DrafComponent extends HTMLElement {
  data = {};

  static get observedAttributes() {
    return ["data"];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    this.render(shadow);
  }

  bindEvents = () => {
    const shadow = this.shadowRoot;
  };

  render = (shadow) => {
    shadow.innerHTML = this.populate();
    this.getStyles().forEach((style) => shadow.appendChild(style));
    this.bindEvents();
  };

  populate = () => {
    const data = this.data;
    return `
          <div class="component">Draft component</div>
      `;
  };

  getStyles = () => {
    const link = document.createElement("style");
    link.innerHTML = styles;

    return [link];
  };

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) {
      switch (name) {
        case "data":
          this.data = JSON.parse(newVal);
          break;
        default:
          this.data = newVal;
      }
      const shadow = this.shadowRoot;
      this.render(shadow);
    }
  }
}

window.customElements.define("draft-component", DrafComponent);
