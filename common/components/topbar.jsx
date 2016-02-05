import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Authentificated from './authentificated.jsx';

if (process.env.BROWSER) {
    require('../styles/topBar.less');
}

class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(e) {
        e.preventDefault();
        let {logout, dispatch} = this.props;
        dispatch(logout());
    }

    render() {
        return (
            <div className="topBar">
                <div className="topBar__title">
                    <Link className="topBar__title-link" to="/">Project name</Link>
                </div>
                <div className="topBar__user">
                    <Authentificated>
                        <div className="topBar__user-wrapper">
                            <span className="topBar__user-name">{this.props.authState.email}</span>
                            <a href="javascript:void(0)" className="topBar__user-link" onClick={this.logout}>Logout</a>
                        </div>
                    </Authentificated>
                    <Authentificated reverse={true}>
                        <div className="topBar__user-wrapper">
                            <Link className="topBar__user-link" to="/login">Login</Link>
                        </div>
                    </Authentificated>
                </div>
            </div>
        )
    }
}

const state = (st) => ({
    authState: st.auth
});


export default connect(state)(TopBar)
