import Place from '../models/place';

import {validate} from './auth';

export function getPlaces(req, res, next) {
    Place.find({}, (err, places) => {
        if (err) {
            return;
        }

        res.locals.data = {
            places: places.map(place => ({
                _id: place._id,
                name: place.name,
                address: place.address,
                lat: place.lat,
                lng: place.lng
            }))
        };

        next();
    });
}

export default {
    getPlaces: [getPlaces],
}