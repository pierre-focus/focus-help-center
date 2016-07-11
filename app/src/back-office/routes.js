import {HomeView} from './views/home';
import EditArticle from './views/edit-article';
import {HomeBis} from './views/home-bis';

export default {
    path: '/',
    indexRoute: {onEnter: ({params}, replace) => replace('home')},
    childRoutes: [
        {
            path: 'home',
            component: HomeView
        },
        {
            path: 'article/:id',
            component: HomeView
        },
        {
            path: 'edit-article/:id',
            component: EditArticle
        },
        {
            path: 'create-article',
            component: EditArticle
        },
        {
            path: 'home-bis',
            component: HomeBis
        }
    ]
};
