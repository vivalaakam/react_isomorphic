import React from 'react'
import Remarkable from 'remarkable'
import {Link} from 'react-router'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import * as PageActions from '../actions/page';
import {RECEIVE_PAGE} from '../constants/page';

import Authentificated from '../components/authentificated.jsx';

if (process.env.BROWSER) {
    require('../styles/page.less');
}

class Page extends React.Component {
    constructor(props) {
        super(props);

        this.md = new Remarkable();
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
        let text = {__html: this.md.render(page.text)};
        return (
            <div className="page">
                <h2 className="title">
                    <span className="title__name">{page.title}</span>
                    <span className="title__button">
                        <Authentificated>
                            <Link to={link} className="btn btn-accent btn-large">Update page</Link>
                        </Authentificated>
                    </span>
                </h2>
                <div className="page__text" dangerouslySetInnerHTML={text}></div>
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
