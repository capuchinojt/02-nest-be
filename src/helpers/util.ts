import * as bcrypt from 'bcrypt'

export const hashPassword = async (plainPassword: string, salt: number = 10) => {
  try {
    return await bcrypt.hash(plainPassword, salt)
  } catch (error) {
    throw new Error('Error hashing password. Error:: ' + error)
  }
}

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  try {
    console.log('comparePassword:: ', {plainPassword, hashPlain: await hashPassword(plainPassword), hashedPassword})
    return await bcrypt.compare(plainPassword, hashedPassword)
  } catch (error) {
    throw new Error('Error comparing password. Error:: ' + error)
  }
}
