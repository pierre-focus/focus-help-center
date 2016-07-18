/** Enum of all possible action types. */
export enum Action {
    REQUEST_LOGIN,
    RECEIVE_LOGIN,
    FAILURE_LOGIN,
    CLEAR_ERROR_LOGIN,

    REQUEST_ARTICLE_LIST,
    SUCCESS_ARTICLE_LIST,
    FAILURE_ARTICLE_LIST,
    UPDATE_ARTICLE_LIST_FILTER,

    UPDATE_ARTICLE,
    REQUEST_ACTION_ARTICLE,
    SUCCESS_LOAD_ARTICLE,
    SUCCESS_SAVE_ARTICLE,
    SUCCESS_DELETE_ARTICLE,
    ERROR_ACTION_ARTICLE,
    CLEAR_ARTICLE,
    SHOW_POPUP_EDITION,
    SHOW_EDIT_SNACKBAR,
    CLICK_EDIT_TITLE,
    CLICK_EDIT_DESCRIPTION,
    CLICK_EDIT_URL,
    CLICK_EDIT_INFORMATIONS,

    UPDATE_SECTION,
    REQUEST_ACTION_SECTION,
    SUCCESS_LOAD_SECTION,
    CLEAR_SECTION,
    ERROR_ACTION_SECTION,

    FAILURE_SECTION_LIST,
    REQUEST_SECTION_LIST,
    SUCCESS_SECTION_LIST,
    UPDATE_SECTION_LIST_FILTER
}
