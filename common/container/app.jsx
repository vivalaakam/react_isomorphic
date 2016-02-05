import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {SIGNIN_AUTH} from '../constants/auth';

import classnames from 'classnames';
import LeftBar from '../components/leftbar.jsx';
import TopBar from '../components/topbar.jsx';

import * as AuthActions from '../actions/auth';
import { bindActionCreators } from 'redux'

if (process.env.BROWSER) {
    require('normalize-css/normalize.css');
    require('../styles/app.less');
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.toggleMenu = this.toggleMenu.bind(this);

        this.state = {
            menu: false
        }
    }

    toggleMenu() {
        this.setState({menu: !this.state.menu});
    }

    render() {
        let appClass = classnames('app', {active: this.state.menu});
        return (
            <div className={appClass}>
                <div className="leftBar">
                    <div className="toggler">
                        <a href="javascript:void(0)" className="toggler__link" onClick={this.toggleMenu}>&nbsp;</a>
                    </div>
                    <LeftBar auth={this.props.authState}
                             isActive={this.props.history.isActive}></LeftBar>
                </div>
                <TopBar logout={AuthActions.signout}  auth={this.props.authState}>

                </TopBar>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.node
};

App.needData = [];

const state = (st) => ({
    routerState: st.router,
    authState: st.auth
});

const actions = (dispatch) => ({
    actions: bindActionCreators({...AuthActions}, dispatch),
    dispatch: dispatch
});

export default connect(state, actions)(App)