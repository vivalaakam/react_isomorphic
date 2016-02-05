function handle(handler, req, res, next) {
    try {
        handler(req, res, next);
    } catch (err) {
        next(err);
    }
}

export default function dispatch(handlers, req, res, done) {
    let id = 0;
    next();
    function next(err) {
        let handler = handlers[id++];

        if (!handler) {
            return done(err)
        }

        if (err && err === 'route') {
            return done();
        }

        if (err) {
            return next(err)
        }

        handle(handler, req, res, next)
    }
}