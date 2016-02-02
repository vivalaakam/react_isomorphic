import React from 'react'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import * as PageActions from '../actions/page';
import {RECEIVE_PAGE} from '../constants/page';
class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(PageActions.fetchPageIfNeed(this.props.params.id));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.routeParams.id !== this.props.routeParams.id) {
            const { dispatch } = nextProps;
            dispatch(PageActions.fetchPageIfNeed(nextProps.routeParams.id));
        }
    }

    isFetching() {
        return <p>...isFetching</p>
    }

    content(text) {
        return <p>{text}</p>
    }

    render() {
        let page = this.props.pagesState[this.props.params.id] || {};
        let content = page.isFetching ? this.isFetching() : this.content(page.text);
        return (
            <div>
                <h1>Page #{this.props.params.id}</h1>
                {content}
            </div>
        )
    }
}

Page.propTypes = {
    pagesState: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

Page.needData = [
    {name: 'getPage', type: RECEIVE_PAGE}
];

const state = (st) => ({
    pagesState: st.page
});

const actions = (dispatch) => ({
    actions: bindActionCreators(PageActions, dispatch),
    dispatch: dispatch
});

export default connect(state, actions)(Page);
