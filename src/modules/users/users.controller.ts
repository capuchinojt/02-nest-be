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

  /**
   * Finds all users that match the given query.
   *
   * The query string is parsed using the
   * [api-query-params](https://github.com/colingo/api-query-params) library.
   *
   * @param query The query string to parse.
   * @param current The current page to return. Defaults to `1`.
   * @param pageSize The number of items to return per page. Defaults to `10`.
   * @returns An object with the following properties:
   *
   * - `result`: An array of `User` objects that match the query.
   * - `totalPages`: The total number of pages that match the query.
   */
  @Get()
  findAll(
    @Query() query: string,
    @Query() { current, pageSize }: { current: string; pageSize: string }
  ) {
    const parsedCurrent = Number.parseInt(current, 10)
    const parsedPageSize = Number.parseInt(pageSize, 10)
    if (Number.isNaN(parsedCurrent) || Number.isNaN(parsedPageSize)) {
      console.error('current and pageSize must be numbers')
      throw new BadRequestException('There is an error while get information.')
    }
    return this.usersService.findAll(query, parsedCurrent, parsedPageSize)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
