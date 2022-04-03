import UserDao from "../daos/UserDao";
import {Express, Request, Response} from "express";

const bcrypt = require('bcrypt');
const saltRounds = 10;

const AuthenticationController = (app: Express) =>{
    const userDao : UserDao = UserDao.getInstance();

    const signup = async(req: Request, res: Response) =>{
        try {
            const newUser = req.body;
            const password = newUser.password;
            const hash = await bcrypt.hash(password, saltRounds);
            newUser.password = hash;

            const existingUser = await userDao.findUserByUsername(req.body.username);
            if (existingUser) {
                res.sendStatus(403);
                return;
            } else {
                const insertedUser = await userDao.createUser(newUser);
                insertedUser.password = '';
                // @ts-ignore
                req.session['profile'] = insertedUser;
                res.json(insertedUser);
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }

    const profile = (req: Request, res: Response) => {
        // @ts-ignore
        const profile = req.session['profile'];
        if (profile) {
            res.json(profile);
        } else {
            res.sendStatus(403);
        }
    }


    const logout = async(req: Request, res: Response) => {
        // @ts-ignore
        req.session.destroy();
        res.sendStatus(200);
    }

    const login = async (req: Request, res: Response) => {
        const user = req.body;
        const username = user.username;
        const password = user.password;

        const existingUser = await userDao.findUserByUsername(username);
        if (existingUser && await bcrypt.compare(password, existingUser.password)) {
            existingUser.password = '*****';
            // @ts-ignore
            req.session['profile'] = existingUser;
            res.json(existingUser);
        } else {
            res.sendStatus(403);
        }
    }

    app.post("/api/auth/login", login);
    app.post("/api/auth/logout", logout);
    app.post("/api/auth/signup", signup);
    app.post("/api/auth/profile", profile);

}
export default AuthenticationController;