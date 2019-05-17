import { Response, Request, NextFunction } from 'express';

import { IUserService } from '../abstract/service/IUserService';
import { BaseController } from './BaseController';

export class UserController extends BaseController {

    private _userService: IUserService;

    constructor(dIContainer) {
        super();

        this._userService = dIContainer.get("userService");
    }

    /**
     * @swagger
     * /users:
     *   get:
     *     tags:
     *       - Users
     *     summary: Get many users
     *     responses:
     *       200:
     *         description: Ok
     */
    findMany = async (req: Request, res: Response, next: NextFunction) => {
        const page = req.query.page;
        const size = req.query.size;

        const { error, data } = await this._userService.findMany(page, size);
        
        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    }
}
