import { get } from './api'
import { NEWS_ENDPOINT, SOURCES_ENDPOINT } from './constants'
import {
  frmFilters,
  lblTopic,
  txtTopic,
  lblSources,
  cmbSources,
  btnSearch,
  cmbDates,
  lblDates,
  cmbLanguages,
  lblLanguages,
  cmbSortBy,
  lblSortBy,
  cardContainer,
  content,
  pager,
} from './controls'

const addDays = (date, days) => {
  var result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

const formatDate = date => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

const getArticles = () => {
  let articleRequest = {
    q: txtTopic.get().searchText !== '' ? txtTopic.get().searchText : '*',
    qInTitle: null,
    sources:
      cmbSources.get().currentOption.length > 0
        ? cmbSources
            .get()
            .currentOption.map(item => item.id)
            .join(',')
        : null,
    domains: null,
    excludeDomains: null,
    from: null,
    to: null,
    language:
      cmbLanguages.get().currentOption[0].id != -1 ? cmbLanguages.get().currentOption[0].id : null,
    sortBy: cmbSortBy.get().currentOption[0].id != -1 ? cmbSortBy.get().currentOption[0].id : null,
    pageSize: pager.get().pageSize,
    page: pager.get().page,
  }

  if (cmbDates.get().currentOption[0].id != -1) {
    const today = new Date()
    const to = today.toISOString()
    let from = formatDate(to)
    switch (cmbDates.get().currentOption[0].id) {
      case 'week':
        from = formatDate(addDays(today, -7).toISOString())
        break
      case 'month':
        from = formatDate(addDays(today, -30).toISOString())
        break
    }
    articleRequest = { ...articleRequest, from, to }
  }

  const queryString = Object.keys(articleRequest)
    .filter(key => articleRequest[key] !== null)
    .map(key => key + '=' + articleRequest[key])
    .join('&')

  getNews(queryString).then(resolve => {
    const news = resolve
    renderNews(news || null)
  })
}

export const initComponents = () => {
  const form = frmFilters.get()

  form.innerHTML = ''

  lblTopic.init
  form.appendChild(lblTopic.get())

  txtTopic.init
  form.appendChild(txtTopic.get())

  lblSources.init
  form.appendChild(lblSources.get())

  cmbSources.init
  form.appendChild(cmbSources.get())

  lblDates.init
  form.appendChild(lblDates.get())

  cmbDates.init
  form.appendChild(cmbDates.get())

  lblLanguages.init
  form.appendChild(lblLanguages.get())

  cmbLanguages.init
  form.appendChild(cmbLanguages.get())

  lblSortBy.init
  form.appendChild(lblSortBy.get())

  cmbSortBy.init
  form.appendChild(cmbSortBy.get())

  pager.init
  pager.get().triggerEvent = getArticles
  form.appendChild(pager.get())

  btnSearch.init
  btnSearch.get().handleClick = getArticles

  form.appendChild(btnSearch.get())

  cardContainer.init

  get(SOURCES_ENDPOINT).then(data => {
    cmbSources.get().setAttribute('data', JSON.stringify(data.sources || []))
  })
}

export const renderNews = data => {
  cardContainer.get().setAttribute('data', data ? JSON.stringify(data.articles) : null)
  pager.get().setAttribute('numberofitems', data ? data.totalResults : 0)
  content.get().innerHTML = cardContainer.get().outerHTML
}

export const getNews = (queryString = null) => {
  const url = NEWS_ENDPOINT.replace(
    '{{QUERY_SEARCH}}',
    queryString ? queryString : 'q=*&pageSize=10'
  )
  return get(url)
}
