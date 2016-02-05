import React from 'react'
import {connect} from 'react-redux';
import * as MainActions from '../actions/main';
import { bindActionCreators } from 'redux'

class Main extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
    }

    render() {
        return (
            <div>
                <h2>Main page</h2>
                <p>my pretty page</p>
            </div>
        );
    }
}

Main.needData = [];


const state = (st) => ({
    mainState: st.main
});

const actions = (dispatch) => ({
    actions: bindActionCreators({...MainActions}, dispatch),
    dispatch: dispatch
});

export default connect(state, actions)(Main)