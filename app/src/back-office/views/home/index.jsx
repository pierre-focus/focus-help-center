import React from 'react';

//Style

// Components
import {ArticleList} from '../../../common/components/article/list';

/** Root component of the back-office app. */
export default function HelpCenter() {
    return (
        <div>
            <h3>Back office</h3>
            <ArticleList />
        </div>
    );
}