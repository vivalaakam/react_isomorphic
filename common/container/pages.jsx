import React from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import * as PagesActions from '../actions/pages';
import { bindActionCreators } from 'redux'

import Authentificated from '../components/authentificated.jsx'

class Pages extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(PagesActions.fetchPagesIfNeed());
    }

    isFetching() {
        return (<p>...isFetching</p>);
    }

    pages() {
        let {pages} = this.props.pagesState;
        return (
            <ul>
                {pages.map((page, i) => {
                    let link = `/page/${page._id}`;
                    return (
                        <li key={i} className="pages__list-item pages__item">
                            <Link to={link}>{page.title}</Link>
                        </li>
                    );
                })}
            </ul>
        )

    }

    render() {
        let content = this.props.pagesState.isFetching ? this.isFetching() : this.pages();

        return (
            <div className="pages">
                <h2>Pages</h2>
                <div>
                    <Authentificated>
                        <Link to="/page/create">Create page</Link>
                    </Authentificated>
                </div>
                {content}
            </div>
        );
    }
}


Pages.needData = [];


const state = (st) => ({
    pagesState: st.pages
});

const actions = (dispatch) => ({
    actions: bindActionCreators({...PagesActions}, dispatch),
    dispatch: dispatch
});

export default connect(state, actions)(Pages)
