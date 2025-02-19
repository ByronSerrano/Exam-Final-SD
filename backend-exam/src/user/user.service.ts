import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    const user = this.userRepository.create({ username, password });
    await this.userRepository.save(user);

    return user;
  }

  async findAll() {
    const users = await this.userRepository.find();

    return users;
  }

  async findOneByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      const errorMsg = 'User not found';
      throw new HttpException(errorMsg, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      const errorMsg = 'User not found';
      throw new HttpException(errorMsg, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    
    if (!user) {
      const errorMsg = 'User not found';
      throw new HttpException(errorMsg, HttpStatus.NOT_FOUND);
    }

    const newUser = this.userRepository.create({
      ...user,
      ...updateUserDto,
    });
    
    await this.userRepository.save(newUser);

    return newUser;
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
