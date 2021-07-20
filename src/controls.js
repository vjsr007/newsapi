import { DropDown } from "./components/dropDown/dropDown";
import { CardContainer } from "./components/cardContainer/cardContainer";
import { CustomButton } from "./components/customButton/customButton";
import { CustomInput } from "./components/customInput/customInput";
import { PagerComponent } from "./components/pagerComponent/pagerComponent";

export const frmFilters = {
  name: "frmFilters",
  control: () => document.getElementById(this.name),
  get init() {},
  get() {
    return document.getElementById(this.name);
  },
};

export const txtTopic = {
  control: null,
  name: "txtTopic",
  get init() {
    this.control = new CustomInput();
    this.control.setAttribute("id", this.name);

    return this.control;
  },
  get() {
    return this.control;
  },
};

export const cmbSources = {
  control: null,
  name: "cmbSources",
  get init() {
    this.control = new DropDown();
    this.control.setAttribute("id", this.name);
    this.control.setAttribute("multiselect", true);

    return this.control;
  },
  get() {
    return this.control;
  },
};

export const lblTopic = {
  control: null,
  name: "lblTopic",
  get init() {
    this.control = document.createElement("label");
    this.control.setAttribute("id", this.name);
    this.control.innerHTML = "Topic";

    return this.control;
  },
  get() {
    return this.control;
  },
};

export const lblSources = {
  control: null,
  name: "lblSources",
  get init() {
    this.control = document.createElement("label");
    this.control.setAttribute("id", this.name);
    this.control.innerHTML = "Sources";

    return this.control;
  },
  get() {
    return this.control;
  },
};

export const btnSearch = {
  control: null,
  name: "btnSearch",
  get init() {
    this.control = new CustomButton();
    this.control.setAttribute("id", this.name);

    return this.control;
  },
  get() {
    return this.control;
  },
};

export const cmbDates = {
  control: null,
  name: "cmbDates",
  get init() {
    this.control = new DropDown();
    this.control.setAttribute("id", this.name);

    const dates = [
      { id: "day", name: "Last day" },
      { id: "week", name: "Last week" },
      { id: "month", name: "Last month" },
    ];

    this.control.setAttribute("data", JSON.stringify(dates));

    return this.control;
  },
  get() {
    return this.control;
  },
};

export const lblDates = {
  control: null,
  name: "lblDates",
  get init() {
    this.control = document.createElement("label");
    this.control.setAttribute("id", this.name);
    this.control.innerHTML = "Last articles";

    return this.control;
  },
  get() {
    return this.control;
  },
};

export const cmbLanguages = {
  control: null,
  name: "cmbLanguages",
  get init() {
    this.control = new DropDown();
    this.control.setAttribute("id", this.name);

    const lans = [
      { id: "ar", name: "ar" },
      { id: "de", name: "de" },
      { id: "en", name: "en" },
      { id: "es", name: "es" },
      { id: "de", name: "de" },
      { id: "fr", name: "fr" },
      { id: "he", name: "he" },
      { id: "it", name: "it" },
      { id: "nl", name: "nl" },
      { id: "no", name: "no" },
      { id: "pt", name: "pt" },
      { id: "ru", name: "ru" },
      { id: "se", name: "se" },
      { id: "ud", name: "ud" },
      { id: "zh", name: "zh" },
    ];

    this.control.setAttribute("data", JSON.stringify(lans));

    return this.control;
  },
  get() {
    return this.control;
  },
};

export const lblLanguages = {
  control: null,
  name: "lblLanguages",
  get init() {
    this.control = document.createElement("label");
    this.control.setAttribute("id", this.name);
    this.control.innerHTML = "Languages";

    return this.control;
  },
  get() {
    return this.control;
  },
};

export const cmbSortBy = {
  control: null,
  name: "cmbSortBy",
  get init() {
    this.control = new DropDown();
    this.control.setAttribute("id", this.name);

    const sort = [
      { id: "relevancy", name: "Relevancy" },
      { id: "popularity", name: "Popularity" },
      { id: "publishedAt", name: "PublishedAt" },
    ];

    this.control.setAttribute("data", JSON.stringify(sort));

    return this.control;
  },
  get() {
    return this.control;
  },
};

export const lblSortBy = {
  control: null,
  name: "lblSortBy",
  get init() {
    this.control = document.createElement("label");
    this.control.setAttribute("id", this.name);
    this.control.innerHTML = "Sort by";

    return this.control;
  },
  get() {
    return this.control;
  },
};

export const cardContainer = {
  control: null,
  name: "dtArticles",
  get init() {
    this.control = new CardContainer();
    this.control.setAttribute("id", this.name);

    return this.control;
  },
  get() {
    return this.control;
  },
};

export const content = {
  control: () => document.getElementById(this.name),
  name: "content",
  get init() {},
  get() {
    return document.getElementById(this.name);
  },
};

export const pager = {
  control: null,
  name: "pager",
  get init() {
    this.control = new PagerComponent();
    this.control.setAttribute("id", this.name);

    return this.control;
  },
  get() {
    return this.control;
  },
};
