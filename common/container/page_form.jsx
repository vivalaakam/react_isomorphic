import React from 'react';
import classnames from 'classnames';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import * as PageActions from '../actions/page';

if (process.env.BROWSER) {
    const ace = require('brace');
    require('brace/mode/markdown');
    require('../styles/page_form.less');
}

class PageForm extends React.Component {
    constructor(props) {
        super(props);

        this.savePage = this.savePage.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        let {dispatch , routeParams} = this.props;
        if (routeParams.id) {
            dispatch(PageActions.fetchPageIfNeed(routeParams.id));
        } else {
            dispatch(PageActions.emptyPage());
        }

        if (process.env.BROWSER) {
            this.initEditor(this.props);
        }
    }

    componentDidUpdate() {
        if (process.env.BROWSER) {
            this.initEditor(this.props);
        }
    }

    componentWillUnmount() {
        if (process.env.BROWSER) {
            this.editor.destroy();
            this.editor = null;
        }
    }

    initEditor(props) {

        this.editor = ace.edit(this.refs.editor);
        this.editor.getSession().setMode('ace/mode/markdown');
        this.editor.renderer.setShowGutter(false);
        this.editor.setOptions({
            highlightActiveLine: false,
            highlightGutterLine: false,
            printMargin: false,
            maxLines: Infinity,
            minLines: 20
        });

        this.editor.$blockScrolling = Infinity;

        this.editor.on('focus', () => {
            this.refs.wrapper.classList.add('focus');
        });
        this.editor.on('blur', () => {
            this.refs.wrapper.classList.remove('focus');
        });

        let {text , cursor_row, cursor_column} = props.page;

        if (text) {
            this.editor.setValue(text, 1);
            if (cursor_row && cursor_column) {
                this.editor.getSession().getSelection().selectionLead.setPosition(cursor_row, cursor_column);
            }
        }

    }

    savePage(e) {
        e.preventDefault();
        let {dispatch , routeParams, page} = this.props;
        let {title, text} = page;

        text = this.editor.getValue() || " ";

        if (routeParams.id) {
            dispatch(PageActions.updatePage({text, title}, routeParams.id));
        } else {
            dispatch(PageActions.createPage({text, title}));
        }
    }

    onChange(e) {
        let {row, column} = this.editor.getCursorPosition();
        let data = {
            title: e.currentTarget.value,
            text: this.editor.getValue(),
            cursor_row: row,
            cursor_column: column
        };
        this.props.dispatch(PageActions.changeData(data));
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
                               onChange={this.onChange}/>
                    </div>
                    <div className="block">
                        <label className="label">Text</label>
                        <div className="pageForm__editor-wrapper" ref="wrapper">
                            <div className="pageForm__editor" ref="editor"></div>
                        </div>
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
