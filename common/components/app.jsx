import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import classnames from 'classnames';
import LeftBar from './leftbar.jsx';
import TopBar from './topbar.jsx';

if (process.env.BROWSER) {
    require('normalize-css/normalize.css');
    require('../styles/app.less');
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.toggleMenu = this.toggleMenu.bind(this);

        this.state = {
            menu: false
        }
    }

    toggleMenu() {
        this.setState({menu: !this.state.menu});
    }

    render() {
        let appClass = classnames('app', {active: this.state.menu});
        return (
            <div className={appClass}>
                <div className="leftBar">
                    <div className="toggler">
                        <a href="javascript:void(0)" className="toggler__link" onClick={this.toggleMenu}>&nbsp;</a>
                    </div>
                    <LeftBar isActive={this.props.history.isActive}></LeftBar>
                </div>
                <TopBar>

                </TopBar>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.node
};

export default connect(state => ({routerState: state.router}))(App)
