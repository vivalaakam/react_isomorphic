import React from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import * as MainActions from '../actions/main';
import { bindActionCreators } from 'redux'

class Pages extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
    }

    render() {
        return (
            <div className="pages">
                <h2>Pages</h2>
                <ul className="pages__list">
                    <li className="pages__list-item pages__item">
                        <Link to="/page/-K9WfxAGG4l9SSkepNXN">First Page</Link>
                    </li>
                    <li className="pages__list-item pages__item">
                        <Link to="/page/-K9WfzGTQtmHNO6Z5uZd">Second Page</Link>
                    </li>
                    <li className="pages__list-item pages__item">
                        <Link to="/page/-K9Wg-a47JmTHq83yVZ0">Third Page</Link>
                    </li>
                </ul>
            </div>
        );
    }
}


Pages.needData = [];


const state = (st) => ({
    mainState: st.main
});

const actions = (dispatch) => ({
    actions: bindActionCreators({...MainActions}, dispatch),
    dispatch: dispatch
});

export default connect(state, actions)(Pages)
