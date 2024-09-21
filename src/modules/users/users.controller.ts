import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException
} from '@nestjs/common'

import { UsersService } from '@/modules/users/users.service'
import { CreateUserDto } from '@/modules/users/dto/create-user.dto'
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // Log the createUserDto for debugging purposes
    console.log('createUserDto: ', createUserDto)
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll(
    @Query() query: string,
    @Query('current') current: number,
    @Query('pageSize') pageSize: number
  ) {
    // Validate current and pageSize are numbers
    if (typeof +current !== 'number' || typeof +pageSize !== 'number') {
      console.error('current and pageSize must be numbers')
      throw new BadRequestException('There is an error while get information.');
    }
    return this.usersService.findAll(query, +current, +pageSize)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
