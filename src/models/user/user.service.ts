import { HttpException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { PageService } from 'src/libs/utils/pagination/pagination-handler';
import { UserFilter } from 'src/service/user/dto/filter-user.dto';
import { ResponseUserDto } from 'src/service/user/dto/response-user.dto';
import { PageDto } from 'src/libs/utils/pagination/dto/page-dto-meta';

@Injectable()
export class UserService extends PageService {
  constructor(
    @InjectRepository(User)
     private readonly userRepository: Repository<User>,
  ) {
    super();
  }

  // create(createUserDto: CreateUserDto): Promise<User> {
  //   const user: User = new User();
  //   user.name = createUserDto.name;
  //   user.email = createUserDto.email;
  //   user.name = createUserDto.name;
  //   user.enabled = true;
  //   user.external = false;
  //   user.internal = true;
  //   return this.userRepository.save(user);
  // }

  async register(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }
  
  async findAll(filter: UserFilter) : Promise<PageDto<ResponseUserDto>>{
    const {name, search} = filter;
    let where: FindOptionsWhere<User>[] = [];

    if (search) {
      where = [
        { username: ILike(`%${search}%`) },
        { name: ILike(`%${search}%`) },
        { userDetails : {address : ILike(`%${search}%`)}}
      ];
      if (name) {
        where = where.map(condition => ({
          ...condition,
          name: ILike(`%${name}%`),
        }));
      }
    } else {
      where = [{}];
    }

    const relations = { userDetails: true };
    
    const [data, total] = await this.paginate(
      this.userRepository,
      filter,
      where,
      undefined,
      relations
    );

    const transformedData : ResponseUserDto[] = data.map(user => ({
      username: user.username,
      name: user.name,
      address: user.userDetails?.address ?? null,
    }));
    
    return {
      data: transformedData,
      meta: {
        total,
        page: filter.page,
        limit: filter.pageSize,
        totalPages: Math.ceil(total / filter.pageSize),
      },
    };
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findByUserId(user_id: string): Promise<User> {
    const userData = await this.userRepository.findOneBy({ user_id });
    if (!userData) {
      throw new HttpException('User Not Found', 404);
    }
    return userData;
  }

  async update(user_id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.findByUserId(user_id);
    const user = this.userRepository.merge(existingUser, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(user_id: string) {
    const existingUser = await this.findByUserId(user_id);
    return this.userRepository.remove(existingUser);
  }
  
  async updateRefreshToken(user_id: string, refresh_token: string) {
    await this.userRepository.update(user_id, { refresh_token: refresh_token });
  }
}
