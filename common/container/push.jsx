import React from 'react'
import {connect} from 'react-redux';
import * as MainActions from '../actions/main';
import { bindActionCreators } from 'redux'

const mid = process.env.MESSAGING_ID;

if (process.env.BROWSER) {
    require('../lib/serviceWorker');
}

class PushMessages extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
    }

    render() {
        return (
            <div>
                <h2>Push messages</h2>
                <p>{mid}</p>
            </div>
        );
    }
}

PushMessages.needData = [];


const state = (st) => ({
    mainState: st.main
});

const actions = (dispatch) => ({
    actions: bindActionCreators({...MainActions}, dispatch),
    dispatch: dispatch
});

export default connect(state, actions)(PushMessages)
