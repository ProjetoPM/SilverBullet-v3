import { Either, left, right } from '@/core/logic/either'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { IEmailService } from '@/infra/providers/models/IEmailService'

type ForgotPasswordRequest = {
  email: string
}

type ForgotPassWordResponse = Either<UserDoesNotExistError, null>

export class ForgotPassword {
  constructor(private usersRepository: IUsersRepository, private emailService: IEmailService) {}

  async execute({email}: ForgotPasswordRequest): Promise<ForgotPassWordResponse> {

    const verifyUserExists = await this.usersRepository.exists(
      email,
    )

    await this.emailService.sendEmail(email, 'Recover Password', 'Here is your link to recover your password')

    if (!verifyUserExists) {
      return left(new UserDoesNotExistError())
    }


    return right(null)
  }
}
