import React from 'react';
import {connect} from 'react-redux';

class Authentificated extends React.Component {
    render() {

        let {isAuthenticated} = this.props.authState;

        if (this.props.reverse) {
            isAuthenticated = !isAuthenticated
        }

        if (isAuthenticated) {
            return this.props.children;
        } else {
            return null;
        }
    }
}

Authentificated.propTypes = {
    reverse: React.PropTypes.bool.isRequired
};

Authentificated.defaultProps = {
    reverse: false
};

export default connect((state) => ({authState: state.auth}))(Authentificated);