import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { UserRepository } from './user.repository';
import { UserEntity } from './users.entity';

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: UserRepository,
    private dataSource: DataSource
  ) {}

  findAll()/* : Promise<UserEntity[]> */ {
    
    // return this.userRepository.find();
    return new Date();
  }
  
  async create(user: CreateUserDto) {
    this.userRepository.insert({ firstName: 'dat20' });
    
  }
}
