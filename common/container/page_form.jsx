import React from 'react';
import classnames from 'classnames';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import * as PageActions from '../actions/page';

import Modal from '../components/modal.jsx';

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

        this.showUrlModal = this.showUrlModal.bind(this);
        this.closeUrlModal = this.closeUrlModal.bind(this);

        this.showImageModal = this.showImageModal.bind(this);
        this.closeImageModal = this.closeImageModal.bind(this);

        this.setLink = this.setLink.bind(this);
        this.setImage = this.setImage.bind(this);

        this.state = {
            urlModal: false,
            imageModal: false
        }
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
        if (process.env.BROWSER && this.editor) {
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


    showUrlModal() {
        this.props.dispatch(PageActions.changeData({text: this.editor.getValue()}));
        this.setState({urlModal: true});
        document.body.style.overflow = 'hidden';
    }

    closeUrlModal() {
        this.props.dispatch(PageActions.changeData({text: this.editor.getValue()}));
        this.setState({urlModal: false});
        document.body.style.overflow = 'auto';
    }

    showImageModal() {
        this.props.dispatch(PageActions.changeData({text: this.editor.getValue()}));
        this.setState({imageModal: true});
        document.body.style.overflow = 'hidden';
    }

    closeImageModal() {
        this.props.dispatch(PageActions.changeData({text: this.editor.getValue()}));
        this.setState({imageModal: false});
        document.body.style.overflow = 'auto';
    }

    setLink() {
        let link = `[${this.refs.link_text.value}](${this.refs.link_url.value})`;
        this.editor.insert(`${link}`);
        this.editor.focus();
        this.closeUrlModal();
        this.refs.link_text.value = '';
        this.refs.link_url.value = '';
    }

    setImage() {
        let image = `![${this.refs.image_alt.value}](${this.refs.image_url.value})`;
        this.editor.insert(`${image}`);
        this.editor.focus();
        this.closeImageModal();
        this.refs.image_alt.value = '';
        this.refs.image_url.value = '';
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
                        <div>
                            <button className="button__inline" onClick={this.showUrlModal}>URL</button>
                            <button className="button__inline" onClick={this.showImageModal}>Image</button>
                        </div>
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
                <Modal close={this.closeUrlModal} isOpen={this.state.urlModal} title="Insert Link">
                    <div className="block">
                        <label className="label">Link text</label>
                        <input type="text" className="control" ref="link_text"/>
                    </div>
                    <div className="block">
                        <label htmlFor="" className="label">URL</label>
                        <input type="text" className="control" ref="link_url"/>
                    </div>
                    <div className="block">
                        <button className="button" onClick={this.setLink}>
                            set link
                        </button>
                    </div>
                </Modal>
                <Modal close={this.closeImageModal} isOpen={this.state.imageModal} title="Insert Image">
                    <div className="block">
                        <label htmlFor="" className="label">Image URL</label>
                        <input type="text" className="control" ref="image_url"/>
                    </div>
                    <div className="block">
                        <label htmlFor="" className="label">Alt text</label>
                        <input type="text" className="control" ref="image_alt"/>
                    </div>
                    <div className="block">
                        <button className="button" onClick={this.setImage}>set image</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

const actions = (dispatch) => ({
    actions: bindActionCreators({...PageActions}, dispatch),
    dispatch: dispatch
});

export default connect(state => ({page: state.page}), actions)(PageForm);
