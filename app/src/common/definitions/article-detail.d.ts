import {Action} from '../actions';
import {Article} from './article';

/** State spec for the `articleDetail` store node. */
export interface ArticleDetailState {
    isLoading: boolean;
    article?: Article;
    error?: string;
    showPopup: boolean;
    showEditSnackbar: boolean;
    snackbarData?: Object;
}

/** Action spec for the `articleDetail` store node. */
export interface ArticleDetailAction {
    type: Action;
    article?: Article;
    error?: string;
    attribute?: string;
    value?: string;
    snackbarData?: Object;
}