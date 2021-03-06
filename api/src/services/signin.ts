import express from 'express';
import jwt from 'jsonwebtoken';

export function signinService(prefix: string, app: express.Application) {

    /** Sign in service. */
    app.route(`${prefix}/signin`)
        .post((req, res) => {
            if (req.body === 'password') {
                const token = jwt.sign({signedIn: true}, 'secret', {expiresIn: '10h'});
                res.json({token});
            } else {
                res.json({error: 'Incorrect password'});
            }
        })
        .get((req, res) => {
            res.json({connected: !!(req.user && req.user.signedIn)});
        });
}
