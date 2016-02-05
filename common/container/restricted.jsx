import React from 'react'
import {connect} from 'react-redux';
import * as AuthActions from '../actions/auth';
import { bindActionCreators } from 'redux'
import {pushState} from 'redux-router';


class Restricted extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
        this.checkAuth();
    }

    checkAuth() {
        if (!this.props.authState.isAuthenticated) {
            this.props.dispatch(pushState(null, '/login'));
        }
    }

    render() {
        if (this.props.authState.isAuthenticated) {
            return this.props.children;
        } else {
            return null;
        }
    }

}

const state = (st) => ({
    authState: st.auth
});

export default connect(state)(Restricted)