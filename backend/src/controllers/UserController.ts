import { Request, Response } from 'express'
import { getRepository } from 'typeorm';

import User from '../models/user';
import userView from '../views/users_view';
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

export default {
    async show(request: Request, response: Response) {
        const { email, password } = request.params;

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOneOrFail({ email: email });

        const compare = await bcrypt.compare(password, user.password);

        if (!compare) {
            return response.status(409).json({ error: "Falha na autenticação" });
        }

        const token = jwt.sign({ id: user.id }, "delicinha", { expiresIn: 86400 });

        return response.status(200).json(token);
    },

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            password
        } = request.body;

        const usersRepository = getRepository(User);

        const cryptedPassword = await bcrypt.hash(password, 8);

        const data = {
            name,
            email,
            password: cryptedPassword
        };

        const user = usersRepository.create(data);

        await usersRepository.save(user);

        return response.status(201).json(user);
    }
};