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
                <h2 className="title">
                    <span className="title__name">Pages</span>
                    <span className="title__button">
                        <Authentificated>
                            <Link to="/page/create" className="btn btn-accent btn-large">Create page</Link>
                        </Authentificated>
                    </span>
                </h2>
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
