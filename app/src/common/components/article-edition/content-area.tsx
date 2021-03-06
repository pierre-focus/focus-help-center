import * as React from 'react';
import Markdown from 'remarkable';
import i18n from 'i18next';
import {connect} from 'react-redux';
import {updateArticle} from '../../actions/article-detail';
import {RaisedButton, LinearProgress, Paper, FlatButton} from 'material-ui';
import {SimpleMarkdownEditor} from 'react-simple-markdown-editor';
import {withRouter} from 'react-router';

export default withRouter(
connect(
    (state) => ({
        article: state.articleDetail.article,
        content: state.articleDetail.article.content,
        connected: state.login.isConnected,
        loading: state.articleDetail.isLoading,
        error: state.articleDetail.error
    }),
    dispatch => ({ updateArticle: (content, successHandler) => dispatch(updateArticle('content', content, successHandler)) })
)(class ContentArea extends React.Component<any, any> {

    static contextTypes = {
        muiTheme: React.PropTypes.object.isRequired
    };

    state = { content: this.props.content };

    md = new Markdown({ linkTarget: '_blank' });
    timer: number;

    handleChange = () => {
        const content = this.refs['textarea']['value'];
        this.setState({ content });
        clearTimeout(this.timer);
        this.timer = setTimeout(this.save, 5000);
        document.getElementById('displayZone').scrollTop = document.getElementById('displayZone').scrollHeight;
    }

    rawMarkup = () => ({ __html: this.md.render(this.state.content) });
    save = () => {
        clearTimeout(this.timer);
        if (this.props.content !== this.state.content) {
            this.props.updateArticle(this.state.content, () => this.props.router.push(''));
        }
    };

    componentWillReceiveProps({content}) {
        this.setState({ content });
    }

    render() {
        return (
            <div className='edit-content'>
                <div className='workspace'>
                    <div className='header'>
                        <div className='edit' style={{backgroundColor: this.context['muiTheme'].palette.primary3Color}}>
                            <div className='buttons' onClick={this.handleChange}>
                                <SimpleMarkdownEditor
                                    textAreaID='textarea'
                                    enabledButtons={{ code: false }}
                                    styles={{ button: { width: '40px', height: '40px', fontFamily: 'Roboto', background: 'none' } }}
                                    buttonHtmlText={{
                                        bold: '<i class="material-icons">format_bold</i>',
                                        italic: '<i class="material-icons">format_italic</i>',
                                        strike: '<i class="material-icons">strikethrough_s</i>',
                                        quote: '<i class="material-icons">format_quote</i>',
                                        h1: '<i class="material-icons">title</i><i>1</i>',
                                        h2: '<i class="material-icons">title</i><i>2</i>',
                                        h3: '<i class="material-icons">title</i><i>3</i>',
                                        bullet: '<i class="material-icons">format_list_bulleted</i>',
                                        link: '<i class="material-icons">insert_link</i>',
                                        image: '<i class="material-icons">insert_photo</i>'
                                    }}
                                    />
                            </div>
                            {this.props.loading ?
                                <LinearProgress style={{ marginTop: '18px', height: '2px', width: '150px', float: 'right' }} />
                                : this.props.error ?
                                    <div className='error save-text'><i className='material-icons'>error</i><div>{this.props.error}</div></div>
                                    : this.state.content !== this.props.content ?
                                        <RaisedButton
                                            primary={true}
                                            className='save-button'
                                            onClick={this.save}
                                            label={i18n.t('button.save') }
                                            />
                                        : <div className='save-text'>{i18n.t('edit-cartridge.content.upToDate') }</div>
                            }
                        </div>
                    </div>
                    <div className='textarea'>
                        <textarea
                            ref='textarea'
                            id='textarea'
                            value={this.state.content}
                            onChange={this.handleChange}
                            style={{ height: '100%' }}
                            />
                    </div>
                </div>
                <div className='display'>
                    <Paper id='displayZone' style={{ height: '80%', overflowY: 'auto', padding: '20px 40px', display:'flex', flexDirection: 'column' }} zDepth={2}>
                        <header>
                            <FlatButton
                                label={i18n.t('button.print') }
                                icon={<i className='material-icons'>print</i>}
                                secondary={true}
                                onClick={() => window.print() }
                                style={{float: 'right'}}
                                />
                        </header>
                        <h2 className='title' style={{color: this.context['muiTheme'].palette.primary1Color}}>{this.props.article.title}</h2>
                        <div  dangerouslySetInnerHTML={this.rawMarkup() } style={{ paddingBottom: 15 }}/>
                    </Paper>
                </div>
            </div>
        );
    }
}));
