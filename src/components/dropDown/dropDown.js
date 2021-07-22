import { CustomLoader } from "../customLoader/customLoader";
import styles from "./dropDown.css";
import fa from "../../lib/fontawesome/css/font-awesome.min.css";

export class DropDown extends HTMLElement {
  data = null;
  id = "id";
  open = false;
  defaultText = "[Select an option]";
  multiSelect = false;
  currentOption = [
    {
      id: -1,
      text: this.defaultText,
    },
  ];

  static get observedAttributes() {
    return ["data", "id", "multiselect"];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    this.render(shadow);
  }

  changeOption = (ev) => {
    const shadow = this.shadowRoot;
    const input = shadow.getElementById("input");
    input.textContent = ev.currentTarget.textContent;

    this.currentOption = [
      {
        id: ev.currentTarget.id,
        text: ev.currentTarget.textContent,
      },
    ];

    this.toggle(false);
  };

  toggle = (ev, open = null) => {
    const shadow = this.shadowRoot;
    this.open = !this.open;

    if (open !== null) this.open = open;

    if (!this.open && this.multiSelect) this.changeMultiselectValues();

    const options = shadow.getElementById("options");
    if (options) options.style.display = this.open ? "inline" : "none";

    const toggleIcon = shadow.getElementById("toggleIcon");
    if (toggleIcon)
      toggleIcon.setAttribute(
        "class",
        this.open ? "fa fa-sort-asc" : "fa fa-sort-desc"
      );

    const btnToggle = shadow.getElementById("btnToggle");
    if (btnToggle)
      btnToggle.setAttribute("class", this.open ? "button up" : "button down");
  };

  changeMultiselectValues = () => {
    const shadow = this.shadowRoot;
    const input = shadow.getElementById("input");
    const options = shadow.querySelectorAll("div.option");
    this.currentOption = [];
    options.forEach((option) => {
      const checkbox = option.querySelector("input[type=checkbox]");
      const label = option.querySelector("label");
      if (checkbox) {
        if (checkbox.checked) {
          this.currentOption.push({
            id: option.id,
            text: label.textContent,
          });
        }
      }
    });
    const text = this.currentOption.map((item) => item.text).join(", ");
    input.textContent = text;
    input.title = text;
  };

  bindEvents = () => {
    const shadow = this.shadowRoot;

    const input = shadow.getElementById("input");
    if (input) input.onclick = this.toggle;

    const list = shadow.getElementById("component");
    if (list)
      list.onblur = (ev) => {
        ev.preventDefault();
        this.toggle(ev, false);
        if (this.multiSelect) this.changeMultiselectValues();
      };

    const options = shadow.querySelectorAll("div.option");
    if (options)
      options.forEach((option) => {
        const checkbox = option.querySelector("input[type=checkbox]");
        const label = option.querySelector("label");
        if (checkbox) {
          checkbox.onmousedown = (ev) => {
            ev.preventDefault();
          };
          checkbox.onchange = (ev) => {
            ev.preventDefault();
          };
          label.onclick = (ev) => {
            ev.preventDefault();
            checkbox.checked = !checkbox.checked;
          };
        }

        if (!this.multiSelect) option.onclick = this.changeOption;
      });
  };

  render = (shadow) => {
    shadow.innerHTML = "";
    this.getStyles().forEach((style) => shadow.appendChild(style));
    const component = document.createElement("div");
    component.innerHTML = this.populate();
    shadow.appendChild(component);
    this.bindEvents(shadow);
  };

  getOptions = (data) => {
    if (!data) return "";
    const options = data.map((option, idx) => {
      return `
        <div title="${option.name}" id="${option.id}" class="option">
          ${
            this.multiSelect
              ? `
            <input class="checkbox" type="checkbox" id="chk_${option.id}" name="chk_${option.id}" />
          `
              : ""
          }
          <label for="chk_${option.id}" class="name" >${option.name}</label>
        </div>
        `;
    });

    return this.multiSelect
      ? options.join("")
      : `<div title="${this.defaultText}" id="-1" class="option">${
          this.defaultText
        }</div>${options.join("")}`;
  };

  showLoader = () => {
    const loader = new CustomLoader();
    loader.setAttribute("default-loader", "spin");
    return loader.outerHTML;
  };

  renderIcon = (data) => {
    return data !== null
      ? `
        <i id="toggleIcon" class="fa fa-sort-desc" aria-hidden="true"></i>
      `
      : this.showLoader();
  };

  populate = () => {
    const data = this.data;
    return `
          <div tabindex="0" id="component" class="component">
            <div id="input" class="input">${this.defaultText}</div>
            <div id="btnToggle" class="button down">
              ${this.renderIcon(data)}
            </div>
            <div id="options" class="options">
            ${this.getOptions(data)}
            </div>            
          </div>
      `;
  };

  getStyles = () => {
    const link = document.createElement("style");
    link.innerHTML = styles;

    const fontAwesome = document.createElement("style");
    fontAwesome.innerHTML = fa;

    return [link, fontAwesome];
  };

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) {
      switch (name) {
        case "data":
          this.data = JSON.parse(newVal);
          break;
        case "id":
          this.id = newVal;
          break;
        case "multiselect":
          this.multiSelect = newVal === "true";
          this.defaultText = this.multiSelect
            ? "[Select options]"
            : "[Select an option]";
          if (this.multiSelect) this.currentOption = [];
          break;
        default:
      }
      const shadow = this.shadowRoot;
      this.render(shadow);
    }
  }
}

window.customElements.define("drop-down", DropDown);
