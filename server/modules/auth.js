import { UNAUTHORIZED } from '../constants';
import User from '../models/user'
import jwt from 'jsonwebtoken'

const SECRET_KEY = 'secret-key';

const DEFAULT_AUTH = {
    isAuthenticated: false,
    token: false,
    name: ''
};

export function validate(req, res, next) {
    let token = req.headers['Authorization'] || req.session.auth.token;
    if (!token) {
        res.locals.error = UNAUTHORIZED;
        next();
    } else {
        try {
            jwt.verify(token, SECRET_KEY);
            next();
        } catch (e) {
            res.locals.error = UNAUTHORIZED;
            next();
        }
    }

}

export function getAuth(req, res, next) {
    if (req.session.auth && req.session.isAuthenticated) {
        req.session.auth.token = jwt.sign({foo: 'bar'}, SECRET_KEY);
    }

    res.locals.data = req.session.auth || DEFAULT_AUTH;

    next();
}

function setSession(user = {}, isAuthenticated = false) {
    return {
        isAuthenticated: isAuthenticated,
        login: user.login,
        email: user.email,
        _id: user._id,
        token: jwt.sign({foo: 'bar'}, SECRET_KEY)
    };
}

export function signin(req, res, next) {
    let {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        if (err) {
            return;
        }

        if (user) {
            if (user.password === password) {
                req.session.auth = res.locals.data = setSession(user, true);
                next();
            } else {
                res.locals.error = 'WRONG_PASSWORD';
            }
        } else {
            user = new User({email, password});
            user.save((err) => {
                if (err) {
                    return;
                }

                req.session.auth = res.locals.data = setSession(user, true);
                next();
            })
        }

    });
}

export function signout(req, res, next) {
    req.session.auth = DEFAULT_AUTH;
    res.locals.data = req.session.auth;
    next();
}

export default {
    signin: [signin],
    signout: [signout],
    getAuth: [getAuth]
}