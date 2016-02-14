import {REQUEST_PLACES, RECEIVE_PLACES} from '../constants/place';
import request from 'superagent';

function receivePlaces(places) {
    return {
        type: RECEIVE_PLACES,
        places
    };
}

function requestPlaces(data) {
    return {
        type: REQUEST_PLACES
    };
}

function getPlaces() {
    return dispatch => new Promise((resolve, reject) => {
        dispatch(requestPlaces());
        request.get(`/api/places`)
            .send()
            .end((err, res) => {
                let data = JSON.parse(res.text);
                if (res.status === 200) {
                    dispatch(receivePlaces(data.places));
                    resolve(data);
                } else {
                    reject(data);
                }
            });
    });
}

export function fetchPlacesIfNeed() {
    return (dispatch, getState) => {
        let places = getState().places.places;
        if (!places.length) {
            dispatch(getPlaces());
        }
    }
}
