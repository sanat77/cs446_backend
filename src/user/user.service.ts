import bcrypt from 'bcrypt';

import { User } from './user.schema';
import { IUser } from '../interfaces/IUser';

import { SALT_ROUNDS_FOR_HASH } from '../Constants';

export class UserService {
    public async createUser(data: IUser): Promise<IUser | null> {
        const user: IUser | null = await User.findOne({
            username: data.username,
        });
        if (user) {
            return null;
        }
        const { _id, role, username, password } = data;
        const hashed_password = await bcrypt.hash(
            password,
            SALT_ROUNDS_FOR_HASH
        );
        const newUser = new User({
            _id,
            role,
            username,
            password: hashed_password,
        });
        return await newUser.save();
    }

    public async getUser(
        username: string,
        password: string
    ): Promise<IUser | null> {
        const user: IUser | null = await User.findOne({ username: username });
        if (!user) {
            return null;
        }
        const storedHash = user.password;
        const isPasswordValid = await bcrypt.compare(password, storedHash);
        if (!isPasswordValid) {
            return null;
        }
        return user;
    }

    public async updateUser(
        oldUsername: string,
        data: IUser
    ): Promise<IUser | null> {
        const { _id, role, username, password } = data;
        const hashed_password = await bcrypt.hash(
            password,
            SALT_ROUNDS_FOR_HASH
        );
        const newUser = new User({
            _id,
            role,
            username,
            password: hashed_password,
        });
        return await User.findOneAndUpdate({ username: oldUsername }, newUser, {
            new: true,
        });
    }
}
