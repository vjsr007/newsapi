import styles from './pagerComponent.css'

export class PagerComponent extends HTMLElement {
  page = 1
  pageSize = 20
  numberOfItems = 0
  goTo = where => {
    const shadow = this.shadowRoot
    switch (where) {
      case 'first':
        this.goToFirst()
        break
      case 'previous':
        this.goToPrevious()
        break
      case 'next':
        this.goToNext()
        break
      case 'last':
        this.goToLast()
        break
    }
    const pageControl = shadow.getElementById('page')
    pageControl.textContent = this.page
    this.triggerEvent()
  }
  goToFirst = () => {
    this.page = 1
  }
  goToPrevious = () => {
    this.page = this.page > 1 ? this.page - 1 : this.page
  }
  goToNext = () => {
    this.page = this.page < this.calculatePages() ? this.page + 1 : this.page
  }
  goToLast = () => {
    this.page = this.calculatePages()
  }
  triggerEvent = () => {}

  static get observedAttributes() {
    return ['page', 'pagesize', 'numberofitems']
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    this.render(shadow)
  }

  calculatePages = () => {
    return this.numberOfItems > 0 ? Math.ceil(this.numberOfItems / this.pageSize) : 1
  }

  bindEvents = () => {
    const shadow = this.shadowRoot

    const btnFirst = shadow.getElementById('btnFirst')
    const btnPrevious = shadow.getElementById('btnPrevious')
    const btnNext = shadow.getElementById('btnNext')
    const btnLast = shadow.getElementById('btnLast')

    btnFirst.onclick = () => this.goTo('first')
    btnPrevious.onclick = () => this.goTo('previous')
    btnNext.onclick = () => this.goTo('next')
    btnLast.onclick = () => this.goTo('last')
  }

  render = shadow => {
    shadow.innerHTML = this.populate()
    this.getStyles().forEach(style => shadow.appendChild(style))
    this.bindEvents()
  }

  populate = () => {
    return `
          <div class="component">
            <div id="btnFirst" title="first" class="button" ><<</div>
            <div id="btnPrevious" title="previous" class="button" ><</div>
            <div id="page" title="current page" class="button input" >${this.page}</div>
            <div id="btnNext" title="next" class="button" >></div>
            <div id="btnLast" title="last" class="button" >>></div>
          </div>
      `
  }

  getStyles = () => {
    const link = document.createElement('style')
    link.innerHTML = styles

    return [link]
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) {
      switch (name) {
        case 'page':
          this.page = newVal
          break
        case 'pagesize':
          this.pageSize = newVal
          break
        case 'numberofitems':
          this.numberOfItems = newVal
          break
        default:
      }
      const shadow = this.shadowRoot
      this.render(shadow)
    }
  }
}

window.customElements.define('pager-component', PagerComponent)
