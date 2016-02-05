import Page from '../modules/page';

export function getPage(req, res, next) {
    Page.findById(req.params.id, (err, page) => {
        if (err) {
            return;
        }

        res.locals.data = page;
        next();
    });
}


export default {
    getPage: [getPage]
}