import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import aqp from 'api-query-params'

import { CreateUserDto } from '@/modules/users/dto/create-user.dto'
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto'
import { User } from '@/modules/users/schemas/user.schema'
import { hashPassword } from '@/helpers/util'
import { find } from 'rxjs'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  /**
   * Creates a new user
   *
   * @param createUserDto The request body to create a new user
   * @returns The newly created user without the password
   * @throws {BadRequestException} If a user with the same email already exists
   */
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

  /**
   * Finds a user by its id.
   *
   * @param id The id of the user to find.
   * @returns The user if found, otherwise `null`.
   */
  async findOne(id: string) {
    return await this.findUserByInfo({ _id: id })
  }

  /**
   * Updates a user by its id.
   *
   * @param id The id of the user to update.
   * @param updateUserDto The partial user data to update.
   * @returns The result of the update operation.
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({ _id: id }, updateUserDto)
  }

  async remove(id: string) {
    return this.userModel
      .findByIdAndDelete(id)
      .exec()
      .then(() => null)
      .catch(() => {
        throw new BadRequestException('User not found.')
      })
  }

  async findUserByInfo(info: any) {
    return await this.userModel.findOne({ ...info })
  }

  async checkIfUserExists(email: string) {
    return !!(await this.userModel.findOne({ email }).select('_id').lean())
  }
}
