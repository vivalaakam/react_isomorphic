import oauth2 from 'simple-oauth2';
import {Router} from 'express';
import {oauth} from '../modules/auth'
const router = Router();

const vk = oauth2({
    clientID: process.env.VK_ID,
    clientSecret: process.env.VK_SECRET,
    site: 'https://oauth.vk.com',
    tokenPath: '/access_token',
    authorizationPath: '/authorize'
});

const authorization_uri = vk.authCode.authorizeURL({
    redirect_uri: 'http://localhost:3000/oauth/vk/callback',
    scope: 'groups,email',
    state: '3(#0/!~',
    response_type: 'token',
    v: 5.52
});

router.get('/', (req, res) => {
    res.redirect(authorization_uri);
});

router.get('/callback', function (req, res, next) {
    var code = req.query.code;
    vk.authCode.getToken({
        code: code,
        redirect_uri: 'http://localhost:3000/oauth/vk/callback'
    }, (error, result) => {
        if (error) {
            console.log('Access Token Error', error.message);
        }

        res.locals.network = 'vk';
        res.locals.data = {
            id: result.user_id,
            email: result.email,
            token: result.access_token
        };

        next();
    });
}, oauth, (req, res) => {
    res.redirect('/')
});


export default router;
