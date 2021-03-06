import {defaultState} from '../../store/default-state';
import {apiMockData} from '../../server/api-mock';
import {rootReducer} from '../';
import {Action} from '../../actions';
import {omit} from 'lodash';

describe('rootReducer', () => {
    describe('articleDetail', () => {
        describe('REQUEST_ACTION_ARTICLE', () => {
            const newState = rootReducer(defaultState, {type: Action.REQUEST_ACTION_ARTICLE});
            it('should correctly set the state with a REQUEST_ACTION_ARTICLE action', () => {
                chai.expect(newState.articleDetail).to.deep.equal({
                    isLoading: true,
                    article: defaultState.articleDetail.article,
                    showPopup: false,
                    isEditDescription: false,
                    isEditTitle: false,
                    isEditInformations: false,
                    isEditUrl: false
                });
            });
        });

        describe('SUCCESS_LOAD_ARTICLE & SUCCESS_SAVE_ARTICLE', () => {
            const newState = rootReducer(defaultState, {type: Action.SUCCESS_LOAD_ARTICLE, article: apiMockData.getArticle});
            it('should correctly set the state with a SUCCESS_LOAD_ARTICLE action', () => {
                chai.expect(newState.articleDetail).to.deep.equal({
                    isLoading: false,
                    article: apiMockData.getArticle,
                    showPopup: false,
                    isEditDescription: false,
                    isEditTitle: false,
                    isEditInformations: false,
                    isEditUrl: false
                });
            });
        });

        describe('SUCCESS_DELETE_ARTICLE', () => {
            const newState = rootReducer(defaultState, {type: Action.SUCCESS_DELETE_ARTICLE});
            it('should correctly set the state with a SUCCESS_ARTICLE_DELETE action', () => {
                chai.expect(newState.articleDetail).to.deep.equal({
                    isLoading: false,
                    article: defaultState.articleDetail.article,
                    showPopup: false,
                    isEditDescription: false,
                    isEditTitle: false,
                    isEditInformations: false,
                    isEditUrl: false
                });
            });
        });

        describe('ERROR_ACTION_ARTICLE', () => {
            const newState = rootReducer(defaultState, {type: Action.ERROR_ACTION_ARTICLE, error: 'error'});
            it('should correctly set the state with a ERROR_ACTION_ARTICLE action', () => {
                chai.expect(newState.articleDetail).to.deep.equal({
                    isLoading: false,
                    error: 'error',
                    article: defaultState.articleDetail.article,
                    showPopup: false,
                    isEditDescription: false,
                    isEditTitle: false,
                    isEditInformations: false,
                    isEditUrl: false
                });
            });
        });

        describe('UPDATE_ARTICLE', () => {
            const newState = rootReducer(defaultState, {type: Action.UPDATE_ARTICLE, attribute: 'title', value: 'TITLE'});
            it('should correctly set the state with a ERROR_ACTION_ARTICLE action', () => {
                chai.expect(newState.articleDetail.isLoading).to.equal(true);
                chai.expect(newState.articleDetail.article.title).to.equal('TITLE');
                chai.expect(newState.articleDetail.article.description).to.equal(defaultState.articleDetail.article.description);
                chai.expect(newState.articleDetail.article.content).to.equal(defaultState.articleDetail.article.content);
            });
        });

        describe('CLEAR_ARTICLE', () => {
            const newState = rootReducer(defaultState, {type: Action.CLEAR_ARTICLE});
            it('should correctly set the state with a CLEAR_ARTICLE action', () => {
                chai.expect(newState.articleDetail).to.deep.equal(defaultState.articleDetail);
            });
        });
    });

    describe('sectionDetail', () => {
        describe('REQUEST_ACTION_SECTION', () => {
            const newState = rootReducer(defaultState, {type: Action.REQUEST_ACTION_SECTION});
            it('should correctly set the state with a REQUEST_ACTION_SECTION action', () => {
                chai.expect(newState.sectionDetail).to.deep.equal({
                    isLoading: true,
                    section: defaultState.sectionDetail.section
                });
            });
        });

        describe('SUCCESS_LOAD_SECTION', () => {
            const newState = rootReducer(defaultState, {type: Action.SUCCESS_LOAD_SECTION, section: apiMockData.getSection});
            it('should correctly set the state with a SUCCESS_LOAD_SECTION action', () => {
                chai.expect(newState.sectionDetail).to.deep.equal({
                    isLoading: false,
                    section: apiMockData.getSection
                });
            });
        });

        describe('ERROR_ACTION_SECTION', () => {
            const newState = rootReducer(defaultState, {type: Action.ERROR_ACTION_SECTION, error: 'error'});
            it('should correctly set the state with a ERROR_ACTION_SECTION action', () => {
                chai.expect(newState.sectionDetail).to.deep.equal({
                    isLoading: false,
                    error: 'error',
                    section: defaultState.sectionDetail.section
                });
            });
        });

        describe('CLEAR_SECTION', () => {
            const newState = rootReducer(defaultState, {type: Action.CLEAR_SECTION});
            it('should correctly set the state with a CLEAR_SECTION action', () => {
                chai.expect(newState.sectionDetail).to.deep.equal(defaultState.sectionDetail);
            });
        });
    });

    describe('sectionList', () => {
        describe('REQUEST_SECTION_LIST', () => {
            const newState = rootReducer(defaultState, {type: Action.REQUEST_SECTION_LIST});
            it('should correctly set the state with a REQUEST_SECTION_LIST action', () => {
                chai.expect(newState.sectionList).to.deep.equal({
                    isLoading: true,
                    list: defaultState.sectionList.list
                });
            });
        });

        describe('SUCCESS_SECTION_LIST', () => {
            const newState = rootReducer(defaultState, {type: Action.SUCCESS_SECTION_LIST, list: [{test: 'ok'}]});

            it('shouldn\'t alter the remaining state nodes', () => {
                chai.expect(omit(newState, 'sectionList')).to.deep.equal(omit(defaultState, 'sectionList'));
            });

            it('should update correctly the state with a SUCCESS_SECTION_LIST action', () => {
                chai.expect(newState.sectionList).to.deep.equal({list: [{test: 'ok'}], isLoading: false});
            });
        });

        describe('FAILURE_SECTION_LIST', () => {
            const newState = rootReducer(defaultState, {type: Action.FAILURE_SECTION_LIST, error: 'error'});
            it('should correctly set the state with a FAILURE_SECTION_LIST action', () => {
                chai.expect(newState.sectionList).to.deep.equal({
                    isLoading: false,
                    error: 'error'
                });
            });
        });
    });

    describe('login', () => {
        describe('REQUEST_LOGIN', () => {
            const newState = rootReducer(defaultState, {type: Action.REQUEST_LOGIN});

            it('shouldn\'t alter the remaining state nodes', () => {
                chai.expect(omit(newState, 'login')).to.deep.equal(omit(defaultState, 'login'));
            });

            it('should update correctly the state with a REQUEST_LOGIN action', () => {
                chai.expect(newState.login).to.deep.equal({isConnected: false, isLoading: true});
            });
        });

        describe('RECEIVE_LOGIN', () => {
            const newState = rootReducer(defaultState, {type: Action.RECEIVE_LOGIN, isConnected: true});

            it('shouldn\'t alter the remaining state nodes', () => {
                chai.expect(omit(newState, 'login')).to.deep.equal(omit(defaultState, 'login'));
            });

            it('should update correctly the state with a RECEIVE_LOGIN action', () => {
                chai.expect(newState.login).to.deep.equal({isConnected: true, isLoading: false, userName: undefined});
            });
        });

        describe('FAILURE_LOGIN', () => {
            const newState = rootReducer(defaultState, {type: Action.FAILURE_LOGIN, error: 'error'});

            it('shouldn\'t alter the remaining state nodes', () => {
                chai.expect(omit(newState, 'login')).to.deep.equal(omit(defaultState, 'login'));
            });

            it('should update correctly the state with a FAILURE_LOGIN action', () => {
                chai.expect(newState.login).to.deep.equal({isLoading: false, isConnected: false, error: 'error'});
            });
        });
    });

    describe('snackBar', () => {
        describe('SHOW_EDIT_SNACKBAR: empty', () => {
            const newState = rootReducer(defaultState, {type: Action.SHOW_EDIT_SNACKBAR});

            it('shouldn\'t alter the remaining state nodes', () => {
                chai.expect(omit(newState, 'snackBar')).to.deep.equal(omit(defaultState, 'snackBar'));
            });

            it('should update correctly the state with a SHOW_EDIT_SNACKBAR action', () => {
                chai.expect(newState.snackBar).to.deep.equal({
                    show: true,
                    message: '',
                    isError: false,
                    timeout: 3000
                });
            });
        });

        describe('SHOW_EDIT_SNACKBAR: data', () => {
            const newState = rootReducer(defaultState, {type: Action.SHOW_EDIT_SNACKBAR, data: {message: 'test', actionText: 'action', isError: true}});

            it('shouldn\'t alter the remaining state nodes', () => {
                chai.expect(omit(newState, 'snackBar')).to.deep.equal(omit(defaultState, 'snackBar'));
            });

            it('should update correctly the state with a SHOW_EDIT_SNACKBAR action', () => {
                chai.expect(newState.snackBar).to.deep.equal({
                    show: true,
                    message: 'test',
                    actionText: 'action',
                    isError: true,
                    timeout: 3000
                });
            });
        });
    });

    describe('articleList', () => {
        describe('REQUEST_ARTICLE_LIST', () => {
            const newState = rootReducer(defaultState, {type: Action.REQUEST_ARTICLE_LIST});

            it('shouldn\'t alter the remaining state nodes', () => {
                chai.expect(omit(newState, 'articleList')).to.deep.equal(omit(defaultState, 'articleList'));
            });

            it('should update correctly the state with a REQUEST_ARTICLE_LIST action', () => {
                chai.expect(newState.articleList).to.deep.equal({list: defaultState.articleList.list, isLoading: true});
            });
        });

        describe('SUCCESS_ARTICLE_LIST', () => {
            const newState = rootReducer(defaultState, {type: Action.SUCCESS_ARTICLE_LIST, list: [{test: 'ok'}]});

            it('shouldn\'t alter the remaining state nodes', () => {
                chai.expect(omit(newState, 'articleList')).to.deep.equal(omit(defaultState, 'articleList'));
            });

            it('should update correctly the state with a SUCCESS_ARTICLE_LIST action', () => {
                chai.expect(newState.articleList).to.deep.equal({list: [{test: 'ok'}], isLoading: false, filter: undefined});
            });
        });

        describe('FAILURE_ARTICLE_LIST', () => {
            const newState = rootReducer(defaultState, {type: Action.FAILURE_ARTICLE_LIST, error: 'error'});

            it('shouldn\'t alter the remaining state nodes', () => {
                chai.expect(omit(newState, 'articleList')).to.deep.equal(omit(defaultState, 'articleList'));
            });

            it('should update correctly the state with a FAILURE_ARTICLE_LIST action', () => {
                chai.expect(newState.articleList).to.deep.equal({error: 'error', isLoading: false, filter: undefined});
            });
        });

        describe('UPDATE_ARTICLE_LIST_FILTER', () => {
            const newState = rootReducer(defaultState, {type: Action.UPDATE_ARTICLE_LIST_FILTER, filter: 'filter'});

            it('shouldn\'t alter the remaining state nodes', () => {
                chai.expect(omit(newState, 'articleList')).to.deep.equal(omit(defaultState, 'articleList'));
            });

            it('should update correctly the state with a FAILURE_ARTICLE_LIST action', () => {
                chai.expect(newState.articleList).to.deep.equal({filter: 'filter', isLoading: false, list: defaultState.articleList.list});
            });
        });
    });
});
