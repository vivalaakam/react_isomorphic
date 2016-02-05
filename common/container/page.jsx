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

Page.title = 'Page';

const state = (st) => ({
    pagesState: st.page,
    mainState: st.main
});

const actions = (dispatch) => ({
    actions: bindActionCreators({...PageActions, ...MainActions}, dispatch),
    dispatch: dispatch
});

export default connect(state, actions)(Page);
