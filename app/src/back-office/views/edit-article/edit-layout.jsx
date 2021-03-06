import React, {Component, PropTypes} from 'react';
import i18n from 'i18next';
import {PasswordComponent} from '../../../common/components/password';
import {connect} from 'react-redux';
import {showSnackBar} from '../../../common/actions/snack-bar';
import {FlatButton, FloatingActionButton, Popover, Menu, MenuItem, Snackbar} from 'material-ui';
import {green500, red500} from 'material-ui/styles/colors';
import {appUrl} from '../../../common/server/config';
import {withRouter, Link} from 'react-router';

/** Layout component. */
export default withRouter(
connect(
    state => ({snackBar: state.snackBar})
)(class Layout extends Component {

    static propTypes = {
        BarMiddle: PropTypes.node,
        Content: PropTypes.object,
        actions: PropTypes.object
    };

    static contextTypes = {
        muiTheme: PropTypes.object.isRequired
    };

    state = {open: false};

    checkActions = () => {
        const {actions} = this.props;
        if (actions !== undefined && actions.secondary !== undefined && actions.secondary.length > 0) {
            return true;
        }
    };

    togglePopover = (e) => this.setState({open: !this.state.open, anchorEl: e.currentTarget});

    render() {
        const {children, Content, actions, snackBar: {show, message, timeout, actionText, actionHandler, isError}} = this.props;
        return (
            <div className='layout' style={{backgroundColor: this.context.muiTheme.palette.primary1Color}}>
                <header style={{backgroundColor: this.context.muiTheme.palette.primary1Color}}>
                    <div className='header-top'>
                        <div className='header-left'>
                            <FlatButton onClick={() => this.props.router.push('/home') } icon={<i className="material-icons">keyboard_backspace</i>} labelPosition='after' label={'Retour'} labelStyle={{fontSize: 16}} style={{color: 'white', marginRight: 15}} />
                        </div>
                        <div className='header-middle'>
                            <Link className='title' to='home'>{i18n.t('back-office.title')}</Link>
                        </div>
                        <div className='header-right'>
                            <div className='right-container'>
                                <a className='button-link' href={appUrl} target='_blank'>
                                    <FlatButton
                                        icon={<i className='material-icons'>exit_to_app</i>}
                                        label={i18n.t('back-office.layout.back-to-app') }
                                        labelPosition='before'
                                        style={{color: 'white'}}
                                    />
                                </a>
                                <PasswordComponent generalColor='white'/>
                            </div>
                        </div>
                    </div>
                    {Content}
                    <div className='actions'>
                        {actions && actions.primary.map(({clickHandler, icon, action, route}, i) => (
                            <FloatingActionButton
                                secondary={true}
                                key={i}
                                onClick={route ? () => this.props.router.push(route) : action ? () => this.props.dispatch(action) : clickHandler}
                                style={{margin: '0 3px'}}
                                >
                                <i className="material-icons">{icon}</i>
                            </FloatingActionButton>
                        )) }
                        {actions && actions.secondary !== undefined ?
                            <FloatingActionButton
                                secondary={true}
                                onClick={this.togglePopover}
                                style={{margin: '0 3px'}}
                                >
                                <i className="material-icons">more_vert</i>
                            </FloatingActionButton>
                            : null}
                        {this.checkActions() ?
                            <Popover
                                open={this.state.open}
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                onRequestClose={this.togglePopover}
                                >
                                <Menu>
                                    {actions.secondary.map(({action, clickHandler, label}, i) => (
                                        <MenuItem
                                            key={i}
                                            primaryText={label}
                                            onClick={action ? () => this.props.dispatch(action) : clickHandler}
                                            />
                                    )) }
                                </Menu>
                            </Popover>
                            : null}
                    </div>
                </header>
                <div className='content'>
                    {children}
                </div>
                <Snackbar
                    open={show}
                    message={message}
                    autoHideDuration={timeout}
                    action={actionText}
                    onActionTouchTap={actionHandler}
                    onRequestClose={() => this.props.dispatch(showSnackBar()) }
                    bodyStyle={{backgroundColor: isError ? red500 : green500}}
                    />
            </div>
        );
    }
}));
