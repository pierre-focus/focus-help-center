import {Article} from '../definitions/article';

/** Api interface, to abstract away the actual implementation in actions. */
export interface Api {

    /** Loads all the articles. */
    loadArticleList: (filter?: string) => Promise<Article[]>;

    /** Logs in on the server. */
    login: (password: string) => Promise<boolean>;

    /** Queries the server to know if the user is connected or not. */
    isConnected: () => Promise<boolean>;

    /** Saves an article. */
    saveArticle: (article: Article) => Promise<Article>;

    /** Deletes an article. */
    deleteArticle: (id: number) => Promise<boolean>;

    /** Loads an article. */
    getArticle: (id: number) => Promise<Article>;
}
