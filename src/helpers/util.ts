import * as bcrypt from 'bcrypt'

export const hashPassword = async (plainPassword: string, salt: number = 10) => {
  try {
    return await bcrypt.hash(plainPassword, salt)
  } catch (error) {
    throw new Error('Error hashing password')
  }
}
