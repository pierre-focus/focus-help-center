import fetch from 'isomorphic-fetch';
import {Article} from '../definitions/article';
import {Api} from './index';

declare const process: any;
const apiRoot = process.env.IS_BUNDLE === 'true' ? '.' : 'http://localhost:1337';

async function fetchWithLogin(url: string, options?) {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            return await fetch(url, Object.assign({}, options, {headers: Object.assign({}, options && options.headers || {}, {Authorization: `Bearer ${token}`})}));
        } else {
            return await fetch(url, options);
        }
    } catch (e) {
        throw new Error(e.message);
    }
}

/** Api object to call the server. */
export const api: Api = {
    async loadArticleList(filter?: string) {
        const response = await fetchWithLogin(`${apiRoot}/api/article${filter ? `?filter=${filter}` : ''}`);
        return response.json<Article[]>();
    },

    async login(password) {
        const response = await fetchWithLogin(`${apiRoot}/signin`, {
            method: 'POST',
            body: password
        });
        const data = await response.json<{token: string, error: string}>();
        if (data.token) {
            localStorage.setItem('token', data.token);
            return true;
        } else {
            localStorage.removeItem('token');
            throw new Error(data.error);
        }
    },

    async isConnected() {
        const response = await fetchWithLogin(`${apiRoot}/signin`);
        const data = await response.json<{success: boolean}>();
        return !!data.success;
    },

    async saveArticle(article) {
        const response = await fetchWithLogin(`${apiRoot}/api/article`, {
            method: 'POST',
            body: JSON.stringify(article),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json<Article | {error: string}>();
        if ((data as Article).title) {
            return data;
        } else {
            throw new Error((data as {error}).error);
        }
    },

    async deleteArticle(id) {
        const response = await fetchWithLogin(`${apiRoot}/api/article/${id}`, {method: 'DELETE'});
        const data = await response.json<{success: boolean, error: string}>();
        if (data.success) {
            return true;
        } else {
            throw new Error(data.error);
        }
    },

    async getArticle(id) {
        const response = await fetchWithLogin(`${apiRoot}/api/article/${id}`, {method: 'GET'});
        const data = await response.json<Article | {error: string}>();
        if ((data as Article).title) {
            return data;
        } else {
            throw new Error((data as {error}).error);
        }
    }
};
