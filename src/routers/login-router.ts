import express from 'express';
import { findUserByUsernameAndPassword } from '../daos/users.dao';
export const loginRouter = express.Router();

loginRouter.post('', async (req, res) => {
    const { username, password } = req.body;
    const temp = (await findUserByUsernameAndPassword(username, password));
    console.log(temp);
    if (temp) {
        req.session.user = temp;
        res.json(temp);
    } else {
        res.sendStatus(401);
    }
});