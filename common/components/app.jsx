import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import 'normalize-css';

class App extends React.Component {
    render() {
        const links = [
            '/todos',
            '/page/-K9WfxAGG4l9SSkepNXN',
            '/page/-K9WfzGTQtmHNO6Z5uZd',
            '/page/-K9Wg-a47JmTHq83yVZ0'
        ].map((l, i) =>
            <p key={i}>
                <Link to={l}>{l}</Link>
            </p>
        );

        return (
            <div>
                <h1>App Container</h1>
                {links}
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.node
};

export default connect(state => ({routerState: state.router}))(App)