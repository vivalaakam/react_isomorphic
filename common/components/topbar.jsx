import React from 'react';
import {connect} from 'react-redux';


if (process.env.BROWSER) {
    require('../styles/topBar.less');
}

class TopBar extends React.Component {
    render() {
        return (
            <div className="topBar">
                <div className="topBar__title">
                    {this.props.mainState.title}
                </div>
            </div>
        )
    }
}

const state = (st) => ({
    mainState: st.main
});


export default connect(state)(TopBar)