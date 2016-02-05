import React from 'react';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import * as PageActions from '../actions/page';

class PageForm extends React.Component {
    constructor(props) {
        super(props);

        this.savePage = this.savePage.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
    }

    componentDidMount() {
        let {dispatch , routeParams} = this.props;
        if (routeParams.id) {
            dispatch(PageActions.fetchPageIfNeed(routeParams.id));
        } else {
            dispatch(PageActions.emptyPage());
        }
    }

    savePage(e) {
        e.preventDefault();
        let {dispatch , routeParams, page} = this.props;
        let {title, text} = page;

        if (routeParams.id) {
            dispatch(PageActions.updatePage({text, title}, routeParams.id));
        } else {
            dispatch(PageActions.createPage({text, text}));
        }
    }

    onChangeTitle(e) {
        this.props.dispatch(PageActions.changeData({title: e.currentTarget.value}));
    }

    onChangeText(e) {
        this.props.dispatch(PageActions.changeData({text: e.currentTarget.value}));
    }

    render() {
        let title = this.props.params.id ? 'Update page' : 'Create page';
        let {page} = this.props;
        return (
            <div className="pageForm">
                <h2>{title}</h2>
                <div className="form">
                    <div className="block">
                        <label className="label">Title</label>
                        <input className="control" type="text" ref="title" value={page.title}
                               onChange={this.onChangeTitle}/>
                    </div>
                    <div className="block">
                        <label className="label">Text</label>
                        <textarea className="control" ref="text" value={page.text}
                                  onChange={this.onChangeText}></textarea>
                    </div>
                    <div className="block">
                        <button className="button" onClick={this.savePage}>
                            {title}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const actions = (dispatch) => ({
    actions: bindActionCreators({...PageActions}, dispatch),
    dispatch: dispatch
});

export default connect(state => ({page: state.page}), actions)(PageForm);