import React from 'react';
import classnames from 'classnames';

if (process.env.BROWSER) {
    require('../styles/modal.less');
}

export default class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);
        this.preventClose = this.preventClose.bind(this);
    }

    close(e) {
        e.preventDefault();
        this.props.close();
    }

    preventClose(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    render() {
        let modalClass = classnames('modal', {modal__open: this.props.isOpen});

        return (
            <div className={modalClass} onClick={this.close}>
                <div className="modal__wrapper" onClick={this.preventClose}>
                    <a href="javascript:void(0)" className="modal__close" onClick={this.close}>X</a>
                    <div className="modal__title">{this.props.title}</div>
                    <div className="modal__content">
                        {this.props.children}
                    </div>
                </div>
            </div>)
            ;
    }
}

Modal.propTypes = {
    isOpen: React.PropTypes.bool.isRequired,
    close: React.PropTypes.func.isRequired
};
