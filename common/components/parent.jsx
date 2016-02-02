import React from 'react';

export default class Parent extends React.Component {
    static propTypes = {
        children: React.PropTypes.node
    }

    render() {
        return (
            <div>
                <h2>Parent</h2>
                {this.props.children}
            </div>
        );
    }
};
