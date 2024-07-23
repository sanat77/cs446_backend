import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { UserDTO } from './user.dto';
import { UserService } from './user.service';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async CreateUser(req: Request, res: Response): Promise<void> {
        try {
            const userDTO = plainToClass(UserDTO, req.body);
            const errors = await validate(userDTO);
            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }
            const user = await this.userService.createUser(req.body);
            if (!user) {
                res.status(400).send('User already exists!');
                return;
            }
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async GetUser(req: Request, res: Response): Promise<void> {
        try {
            const username = req.params.username;
            const password = req.params.password;
            const user = await this.userService.getUser(username, password);
            if (!user) {
                res.status(404).send('Invalid username/password');
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async UpdateUser(req: Request, res: Response): Promise<void> {
        try {
            const oldUsername = req.body.oldUsername;
            const data = req.body.newUser;
            const userDTO = plainToClass(UserDTO, data);
            const errors = await validate(userDTO);
            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }
            const user = await this.userService.updateUser(oldUsername, data);
            if (!user) {
                res.status(404).send('Invalid User');
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
