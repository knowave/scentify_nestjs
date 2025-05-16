import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

export interface UserServiceInterface {
    getUserById(id: number): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<void>;
    updateUser({ id, updateUserDto }: { id: number; updateUserDto: UpdateUserDto }): Promise<void>;
    deleteUser(id: number): Promise<void>;
}
