import React from 'react';
import Layout from '../../layout';
import {SectionList} from '../../../common/components/section-list';
import ArticleListTitle from '../../../common/components/article-list/title';
import {ArticleConsult} from '../../../common/components/article-consult';
import {Link} from 'react-router';
import {FlatButton} from 'material-ui';
import {connect} from 'react-redux';

function renderLeftContent() {
    return (
        <div>
            <FlatButton label='imprimer' icon={<i className="material-icons">print</i>} secondary={true} onClick={() => window.print() } />
            <FlatButton label='envoyer' icon={<i className="material-icons">send</i>} secondary={true} />
        </div>
    );
}

function renderRightContent(sectionId) {
    return (
        <Link to={sectionId ? `/section/${sectionId}/articles` : '/home-bis'}> <i className='material-icons close'>close</i></Link>
    );
}

const actions = {
    primary: [
        {icon: 'home', route: '/home'}
    ]
};

export default connect(
    state => ({section: state.sectionDetail.section})
)(function HomeBis({params, section, ...props}) {
    let pathSplit = props.route.path.split('/');
    return (
        <Layout Content={<ArticleListTitle />} actions={actions}>
            <SectionList sectionID={section.id}/>
            {pathSplit[0] === 'article' ? <ArticleConsult id={params.id} leftContent={renderLeftContent() } rightContent={renderRightContent(section.id) } /> : null}
        </Layout>
    );
});
