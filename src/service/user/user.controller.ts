import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,

  ParseUUIDPipe,
  UseGuards,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from '../../models/user/user.service';
import { UpdateUserDto } from '../../models/user/dto/update-user.dto';
import { IdParamUserDto } from 'src/models/user/dto/id-param-user.dto';
import { JwtAuthGuard } from 'src/libs/config/auth/jwt-auth.guard';
import { UserFilter } from './dto/filter-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // @UsePipes(new ValidationPipe({whitelist: true, transform:true}))
  // async create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }
  
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('JWT')
  async findAll(@Query() filter : UserFilter) {
    return this.userService.findAll(filter);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findByUserId(id);
  }

  @Patch(':id')
  async update(@Param() {id}: IdParamUserDto,
  @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
