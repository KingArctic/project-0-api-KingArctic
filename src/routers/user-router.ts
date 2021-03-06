import express from 'express';
import { findAllUsers, findUserByID, updateUser } from '../daos/users.dao';
import { authorization } from '../middleware/authorization';
import User from '../classes/users';
export const userRouter = express.Router();

userRouter.get('', /* authorization([1, 2]), */ async (req, res) => {
    res.json(await findAllUsers());
});

userRouter.get('/:id', async (req, res) => {
    if (req.session.user && req.session.user.roleid == 4 && req.session.user.userid == req.params.id)
        res.json(await findUserByID(req.params.id));
    else if (req.session.user && req.session.user.roleid < 4)
        res.json(await findUserByID(req.params.id));
    else
        res.sendStatus(403);
});

userRouter.patch('', authorization([1, 2]), async (req, res) => {
    const body = req.body;
    const tempUser = new User(body.userid, undefined, undefined, undefined, undefined, undefined, undefined);
    for (const field in tempUser) {
        if (body[field] != undefined) {
            tempUser[field] = body[field];
        }
    }

    if (tempUser.userid != undefined) {
        const updateReturn = await updateUser(tempUser);

        if (updateReturn) {
            res.status(202);
            res.json(updateReturn);
        }
        else {
            res.sendStatus(400);
        }
    }
    else {
        res.sendStatus(400);
    }
});