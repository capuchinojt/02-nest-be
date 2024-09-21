import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from '@/modules/users/schemas/user.schema'
import { Model } from 'mongoose'
import { hashPassword } from '@/helpers/util'
import aqp from 'api-query-params'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Hash password
    if (await this.checkIfUserExists(createUserDto.email)) {
      throw new BadRequestException(
        `User with email ${createUserDto.email} already exists. Please use a different email.`
      )
    }

    const passwordHashed = await hashPassword(createUserDto.password)
    const userDtoWithPasswordHashed = {
      ...createUserDto,
      password: passwordHashed,
    }
    const newUser = await this.userModel.create(userDtoWithPasswordHashed)
    const userWithoutPassword = newUser.toObject()
    delete userWithoutPassword.password

    return userWithoutPassword
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
  async findAll(
    query: string,
    current: number = 1,
    pageSize: number = 10
  ): Promise<{ result: User[]; totalPages: number }> {
    const { filter, sort, projection } = aqp(query)
    for (const key of ['current', 'pageSize']) {
      delete filter[key]
    }

    const totalItems = await this.userModel.countDocuments(filter)
    const totalPages = Math.ceil(totalItems / pageSize)
    const skip = (current - 1) * pageSize

    const result = await this.userModel
      .find(filter)
      .skip(skip)
      .limit(pageSize)
      .sort(sort as any)
      .select(projection)

    return { result, totalPages }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email })
  }

  async checkIfUserExists(email: string) {
    return !!(await this.userModel.findOne({ email }).select('_id').lean())
  }
}
