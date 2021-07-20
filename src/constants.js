import { API_URL, API_KEY } from './config'

export const NEWS_ENDPOINT = `${API_URL}everything?{{QUERY_SEARCH}}&apiKey=${API_KEY}`;

export const SOURCES_ENDPOINT = `${API_URL}top-headlines/sources?apiKey=${API_KEY}`;
