import { CardComponent } from "./cardComponent/cardComponent";
import { CustomLoader } from "../customLoader/customLoader";
import styles from "./cardContainer.css";

export class CardContainer extends HTMLElement {
  data = null;

  static get observedAttributes() {
    return ["data"];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    this.render(shadow);
  }

  getStyles = () => {
    const link = document.createElement("style");
    link.innerHTML = styles;

    return [link];
  };

  render = (shadow) => {
    shadow.innerHTML = "";
    this.getStyles().forEach((style) => shadow.appendChild(style));
    const component = document.createElement("div");
    component.innerHTML = this.populate();
    shadow.appendChild(component);
  };

  showLoader = () => {
    return new CustomLoader().outerHTML;
  };

  populateRows = (data) => {
    const rows = data.map((item, idx) => {
      const dataRow = new CardComponent();
      dataRow.setAttribute("data", JSON.stringify({ item, idx }));

      return dataRow.outerHTML;
    });

    return rows.join("");
  };

  populate = () => {
    return this.data !== null
      ? `
        <div class="component">
          ${this.populateRows(this.data)}
        </div>
        `
      : `
        <div class="component">
          <div class="loader">${this.showLoader()}</div>
        </div>`;
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

window.customElements.define("card-container", CardContainer);
