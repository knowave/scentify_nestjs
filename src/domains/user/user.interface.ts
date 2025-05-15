import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

export interface UserServiceInterface {
    getUserById(id: number): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<void>;
}
