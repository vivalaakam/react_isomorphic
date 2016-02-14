import React from 'react'

import {connect} from 'react-redux';
import * as MainActions from '../actions/main';
import { bindActionCreators } from 'redux'
import * as PlacesActions from '../actions/places';

import {RECEIVE_PLACES} from '../constants/place';

if (process.env.BROWSER) {
    require('../styles/map.less');
}

class Map extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(PlacesActions.fetchPlacesIfNeed());
    }

    list() {
        return this.props.places.places.map(place => <li className="map__places-item">{place.name}</li>);
    }

    render() {
        return (
            <div className="map">
                <div className="map__places">
                    <ul className="map__places-items">
                        {this.list()}
                    </ul>
                </div>
                <div className="map__map">
                    map_main
                </div>
            </div>
        );
    }
}

Map.needData = [
    {name: 'getPlaces', type: RECEIVE_PLACES}
];


const state = ({main , places}) => ({main, places});

const actions = (dispatch) => ({
    actions: bindActionCreators({...MainActions, ...PlacesActions}, dispatch),
    dispatch: dispatch
});

export default connect(state, actions)(Map)