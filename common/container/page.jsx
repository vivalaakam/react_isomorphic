import React from 'react'
import {Link} from 'react-router'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import * as PageActions from '../actions/page';
import {RECEIVE_PAGE} from '../constants/page';

import Authentificated from '../components/authentificated.jsx';

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setPage(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.routeParams.id !== this.props.routeParams.id) {
            this.setPage(nextProps);
        }
    }

    setPage(props) {
        const {dispatch} = props;
        dispatch(PageActions.fetchPageIfNeed(props.routeParams.id));
    }

    isFetching() {
        return (
            <div>
                <p>...isFetching</p>
            </div>
        );
    }

    content(page) {
        let link = `/page/${page._id}/edit`;
        return (
            <div>
                <h2>{page.title}</h2>
                <div>
                    <Authentificated>
                        <Link to={link}>Update page</Link>
                    </Authentificated>
                </div>
                <p>{page.text}</p>
            </div>);
    }

    render() {
        let {pageState} = this.props;
        return pageState.isFetching ? this.isFetching() : this.content(pageState);
    }
}

Page.propTypes = {
    pageState: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

Page.needData = [
    {name: 'getPage', type: RECEIVE_PAGE}
];

const state = (st) => ({
    pageState: st.page
});

const actions = (dispatch) => ({
    actions: bindActionCreators({...PageActions}, dispatch),
    dispatch: dispatch
});

export default connect(state, actions)(Page);
