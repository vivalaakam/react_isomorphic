import React, { PropTypes, Component } from 'react'
import TodoTextInput from './todotextinput.jsx'

class Header extends Component {
    handleSave(text) {
        if (text.length !== 0) {
            this.props.addTodo(text);
        }
    }

    render() {
        return (
            <header className="header">
                <TodoTextInput newTodo
                               onSave={this.handleSave.bind(this)}
                               placeholder="What needs to be done?" />
            </header>
        )
    }
}

Header.propTypes = {
    addTodo: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default Header
