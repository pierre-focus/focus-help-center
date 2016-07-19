import EditArticle from './views/edit-article';
import HomeView from './views/home';
import {ConsultView} from './views/consult-article';

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
            component: ConsultView
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
            path: '/section/:id/articles',
            component: HomeView
        }
    ]
};
