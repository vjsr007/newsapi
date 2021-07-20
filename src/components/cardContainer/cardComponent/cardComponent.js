import styles from "./cardComponent.css";

export class CardComponent extends HTMLElement {
  data = null;

  options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

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

    const fontAwesome = document.createElement("link");
    fontAwesome.rel = "stylesheet";
    fontAwesome.href = "./lib/fontawesome/css/font-awesome.min.css";

    return [link, fontAwesome];
  };
  render = (shadow) => {
    shadow.innerHTML = "";
    this.getStyles().forEach((style) => shadow.appendChild(style));
    const component = document.createElement("div");
    component.innerHTML = this.populate();
    shadow.appendChild(component);
  };

  populate = () => {
    if (!this.data) return `<div class="post">`;
    const { idx, item } = this.data;
    return `
        <div id="article${idx}" class="post">
            <div class="header">
              <div class="title">${item.title}</div>
              <div class="author">${new Intl.DateTimeFormat(
                "en-US",
                this.options
              ).format(Date.parse(item.publishedAt))}</div>
              <div class="author">${
                item.author ? "By " + item.author : ""
              }</div>
              <div class="source">${item.source ? item.source.name : ""}</div>
            </div>
            <div class="content">
              <div class="img-section">
                <img class="image" src="${item.urlToImage}" />
              </div>
              <div class="article">
                <div class="text">${item.description}</div>
                <a href="${
                  item.url
                }" class="text" target="_blank" >Go to article</a>
              </div>
            </div>
        </div>
  `;
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

window.customElements.define("card-component", CardComponent);
