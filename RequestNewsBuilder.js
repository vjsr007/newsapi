class RequestNewsBuilder {
    query = '*'
    page= 1
    sources = ''
    sortBy = ''
    language = ''
    to = null
    from = null

    setQuery(query) {
        this.query = query
        return this
    }

    setPage(page) {
        this.page = page
        return this
    }

    setSources(sources) {
        this.sources = sources
        return this
    }

    setSortBy(sortBy) {
        this.sortBy = sortBy
        return this
    }

    setLanguage(language) {
        this.language = language
        return this
    }

    setTo(to) {
        this.to = to
        return this
    }

    setFrom(from) {
        this.from = from
        return this
    }

    build() {
        return `q=${this.query}&page=${this.page}&sources=${this.sources}&sortBy=${this.sortBy}&language=${this.language}${this.to ? `&to=${this.to}` : ''}${this.from ? `&from=${this.from}` : ''}`
    }
}

export default RequestNewsBuilder