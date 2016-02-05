import React from 'react'
import {connect} from 'react-redux';
import * as MainActions from '../actions/main';
import * as AuthActions from '../actions/auth';
import { bindActionCreators } from 'redux'

if (process.env.BROWSER) {
    require('../styles/login.less');
}

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.onClickAuth = this.onClickAuth.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(MainActions.setTitle('login'));
    }

    onClickAuth() {
        let email = this.refs.login.value,
            password = this.refs.password.value;

        const { dispatch } = this.props;
        dispatch(AuthActions.signin(email, password));
    }

    render() {
        return (
            <div className="login">
                <h3>
                    Please, sign in for continue
                </h3>
                <div className="block">
                    <label className="label">Login</label>
                    <input className="control" ref="login" type="text"/>
                </div>
                <div className="block">
                    <label className="label">Password</label>
                    <input className="control" ref="password" type="password"/>
                </div>
                <div className="block">
                    <button className="button" onClick={this.onClickAuth}>Sign in</button>
                </div>
            </div>
        );
    }
}

Login.needData = [];


const state = (st) => ({
    mainState: st.main,
    authState: st.auth
});

const actions = (dispatch) => ({
    actions: bindActionCreators({...MainActions, ...AuthActions}, dispatch),
    dispatch: dispatch
});

export default connect(state, actions)(Login)