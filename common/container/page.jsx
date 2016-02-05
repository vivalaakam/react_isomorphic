import React from 'react'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import * as PageActions from '../actions/page';
import * as MainActions from '../actions/main';
import {RECEIVE_PAGE} from '../constants/page';
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
        return (
            <div>
                <h2>{page.title}</h2>
                <p>{page.text}</p>
            </div>);
    }

    render() {
        let page = this.props.pagesState[this.props.params.id] || {};
        return page.isFetching ? this.isFetching() : this.content(page);
    }
}

Page.propTypes = {
    pagesState: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

Page.needData = [
    {name: 'getPage', type: RECEIVE_PAGE}
];

Page.title = 'Page';

const state = (st) => ({
    pagesState: st.page
});

const actions = (dispatch) => ({
    actions: bindActionCreators({...PageActions, ...MainActions}, dispatch),
    dispatch: dispatch
});

export default connect(state, actions)(Page);
