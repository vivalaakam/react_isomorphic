import Page from '../models/page';

import {validate} from './auth';

export function getPage(req, res, next) {
    Page.findById(req.params.id, (err, page) => {
        if (err) {
            return;
        }

        res.locals.data = page;
        next();
    });
}

export function getPages(req, res, next) {
    Page.find({}, (err, pages) => {
        if (err) {
            return;
        }

        res.locals.data = {
            pages: pages.map(page => ({_id: page._id, title: page.title}))
        };
        next();
    });
}

export function createPage(req, res, next) {
    let data = {
        ...req.body,
        user: req.session.auth._id,
        created_at: new Date()
    };

    var page = new Page(data);
    page.save((err) => {
        if (err) {
            return;
        }

        res.locals.data = page;
        next();
    });
}

export function updatePage(req, res, next) {
    Page.update({_id: req.params.id, user: req.session.auth._id}, {
        $set: {
            ...req.body,
            updated_at: new Date()
        }
    }, {}, (err, page) => {
        if (err) {
            return;
        }
        next();
    });
}

export function removePage(req, res, next) {
    Page.findById(req.params.id, (err, page) => {
        if (err) {
            return;
        }
        if (page.user.equals(req.session.auth._id)) {
            page.remove((err) => {
                if (err) {
                    return;
                }

                next();
            });
        } else {
            res.locals.error = 'DENIED';
            next();
        }

    });
}

export default {
    getPage: [getPage],
    getPages: [getPages],
    createPage: [validate, createPage],
    updatePage: [validate, updatePage, getPage],
    removePage: [validate, removePage]
}