import { CreateUserBody } from './dto/request/create-user.req';
import { UpdateUserBody } from './dto/request/update-user.req';
import { GetUserByIdWithPerfume } from './dto/response/get-user-by-id-with-perfume.res';
import { User } from './entities/user.entity';

export interface UserServiceInterface {
    getUserById(id: number): Promise<User>;
    createUser(createUserDto: CreateUserBody): Promise<void>;
    updateUser({ id, updateUserDto }: { id: number; updateUserDto: UpdateUserBody }): Promise<void>;
    deleteUser(id: number): Promise<void>;
    getUserByIdWithPerfume(id: number): Promise<GetUserByIdWithPerfume>;
}
