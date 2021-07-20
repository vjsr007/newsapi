import styles from "./customButton.css";

export class CustomButton extends HTMLElement {
  data = {};

  handleClick = () => {};

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

    const input = shadow.getElementById("customButton");
    input.onclick = () => this.handleClick();
  };

  render = (shadow) => {
    shadow.innerHTML = "";
    this.getStyles().forEach((style) => shadow.appendChild(style));
    const component = document.createElement("div");
    component.innerHTML = this.populate();
    shadow.appendChild(component);
    this.bindEvents(shadow);
  };

  populate = () => {
    const data = this.data;
    return `
      <button type="button" class="customButton" id="customButton">
        <label>Search</label>
      </button>
    `;
  };

  getStyles = () => {
    const link = document.createElement("style");
    link.innerHTML = styles;

    const fontAwesome = document.createElement("link");
    fontAwesome.rel = "stylesheet";
    fontAwesome.href = "./lib/fontawesome/css/font-awesome.min.css";

    return [link, fontAwesome];
  };

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) {
      switch (name) {
        case "data":
          this.data = JSON.parse(newVal);
          break;
        default:
      }
      const shadow = this.shadowRoot;
      this.render(shadow);
    }
  }
}

window.customElements.define("custom-button", CustomButton);
