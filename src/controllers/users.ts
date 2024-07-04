import UserModel from "../models/user";

interface CreateArgs {
  email: string;
  name: string;
}

interface UpdateArgs {
  email: string;
  data: {
    name: string;
  };
}

interface DeleteArgs {
  email: string
}

class UserController {
  async create({ email, name }: CreateArgs) {
    try {
      const userExist = await UserModel
        .exists({ email, deleted: false })
      
      if (userExist) throw new Error('user exist with email')
      
      return await UserModel.create({
        email,
        name
      })
    } catch (error) {
      throw error
    }
  }

  async update({ email, data }: UpdateArgs) {
    try {
      const userUpdated = await UserModel
        .findOneAndUpdate(
          { email, deleted: false },
          { $set: { ...data } },
          { 'new': true }
        )
        .lean()

      if (!userUpdated) throw new Error('user not found')
      
      return userUpdated
    } catch (error) {
      throw error
    }
  }

  async delete({ email }: DeleteArgs) {
    try {
      await UserModel
        .findOneAndUpdate(
          { email, deleted: false },
          { $set: { deleted: true } },
          { 'new': true }
        )
        .lean()
    } catch (error) {
      throw error
    }
  }

  async getUsers() {
    try {
      return await UserModel
        .find({ deleted: false })
        .select({ email: 1 })
        .lean()
    } catch (error) {
      throw error
    }
  }
}

export default new UserController()

