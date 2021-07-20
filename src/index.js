import { getNews, renderNews, initComponents } from "./services";

const initApp = () => {
  initComponents();
  getNews().then((resolve) => {
    const news = resolve;
    renderNews(news || []);
  });
};

document.addEventListener("DOMContentLoaded", initApp);
