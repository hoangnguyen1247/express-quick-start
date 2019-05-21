import { Response, Request, NextFunction } from 'express';
import * as createError from "http-errors";

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
     *     summary: Find many users
     *     parameters:
     *       - in: query
     *         name: page
     *         description: page index
     *         type: integer
     *         example: 0
     *       - in: query
     *         name: size
     *         description: page offset
     *         type: integer
     *         example: 12
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

    /**
     * @swagger
     * /users/{id}:
     *   get:
     *     tags:
     *       - Users
     *     summary: Find one user by id
     *     parameters:
     *       - in: path
     *         name: id
     *         description: id
     *         schema: 
     *           oneOf:
     *             - integer
     *             - string
     *     responses:
     *       200:
     *         description: Ok
     */
    findOneById = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.params.id;

        const { error, data } = await this._userService.findOneById(userId);
        
        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    }

    /**
     * @swagger
     * /users:
     *   post:
     *     tags:
     *       - Users
     *     summary: Insert new user
     *     parameters:
     *       - in: body
     *         name: data
     *         description: data
     *         type: object
     *         schema:
     *           properties:
     *             fullName:
     *               type: string
     *               example: Hoàng Nguyễn
     *             name:
     *               type: string
     *               example: Hoàng Nguyễn 123
     *           required:
     *             - fullName
     *     responses:
     *       200:
     *         description: Ok
     */
    insert = async (req: Request, res: Response, next: NextFunction) => {
        const fullName = req.body.fullName;
        const name = req.body.name;

        if (!fullName) {
            return next(createError(400, "", {
                error: { errorCode: "fullNameIsRequired" },
            }))
        }

        const { error, data } = await this._userService.insert({
            name,
            fullName,
        });
        
        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    }

    /**
     * @swagger
     * /users/{id}:
     *   put:
     *     tags:
     *       - Users
     *     summary: Update user
     *     parameters:
     *       - in: path
     *         name: id
     *         description: id
     *         schema: 
     *           oneOf:
     *             - integer
     *             - string
     *       - in: body
     *         name: data
     *         description: data
     *         type: object
     *         schema:
     *           properties:
     *             fullName:
     *               type: string
     *               example: Hoàng Nguyễn
     *             name:
     *               type: string
     *               example: Hoàng Nguyễn 123
     *           required:
     *             - fullName
     *     responses:
     *       200:
     *         description: Ok
     */
    update = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.params.id;
        const fullName = req.body.fullName;
        const name = req.body.name;
    
        if (!userId) {
            return next(createError(400, "", {
                error: { errorCode: "idIsRequired" },
            }))
        }
        if (!fullName) {
            return next(createError(400, "", {
                error: { errorCode: "fullNameIsRequired" },
            }))
        }

        const { error, data } = await this._userService.update(userId, {
            name,
            fullName,
        });
        
        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    }

    /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     tags:
     *       - Users
     *     summary: Delete user
     *     parameters:
     *       - in: path
     *         name: id
     *         description: id
     *         schema: 
     *           oneOf:
     *             - integer
     *             - string
     *     responses:
     *       200:
     *         description: Ok
     */
    delete = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.params.id;

        if (!userId) {
            return next(createError(400, "", {
                error: { errorCode: "idIsRequired" },
            }))
        }
        const { error, data } = await this._userService.delete(userId);
        
        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    }

     /**
     * @swagger
     * /users/search-and-filter:
     *   get:
     *     tags:
     *       - Users
     *     summary: Search & filter users
     *     parameters:
     *       - in: query
     *         name: searchKey
     *         description: search keyword
     *         type: string
     *       - in: query
     *         name: searchFields
     *         description: search fields
     *         type: array
     *         items: 
     *           type: string
     *         collectionFormat: multi
     *       - in: query
     *         name: name
     *         description: name
     *         type: string
     *       - in: query
     *         name: page
     *         description: page index
     *         type: integer
     *         example: 0
     *       - in: query
     *         name: size
     *         description: page offset
     *         type: integer
     *         example: 12
     *     responses:
     *       200:
     *         description: Ok
     */
    searchAndFilter = async (req: Request, res: Response, next: NextFunction) => {
        const searchKey = req.query.searchKey;
        const searchFields = Array.isArray(req.query.searchFields) ? req.query.searchFields : 
            req.query.searchFields ? [req.query.searchFields] : [];
        const name = req.query.name;
        const page = req.query.page;
        const size = req.query.size;

        const filters = {
        };
        if (name) {
            filters["name"] = name;
        }
        const { error, data } = await this._userService.searchAndFilter(searchKey, searchFields, filters, page, size);
        
        if (error) return next(error);
        res.status(data.code || 200)
            .json({ ...data });
    }
}
