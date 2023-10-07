import { AccessDeniedError } from '@/core/domain/errors/AccessDeniedError'
import { HttpResponse, fail, forbidden, ok } from '@/core/infra/http-response'
import { Middleware } from '@/core/infra/middleware'
import { decode } from 'jsonwebtoken'

type EnsureAuthenticationMiddlewareRequest = {
  jwt: string
}

type DecodedJwt = {
  sub: string
}

export class EnsureAuthenticatedMiddleware implements Middleware {
  constructor() {}

  async handle(
    request: EnsureAuthenticationMiddlewareRequest,
  ): Promise<HttpResponse> {
    try {
      const { jwt } = request
      const [_, token] = jwt.split(' ')

      if (!token) return forbidden(new AccessDeniedError())

      try {
        const { sub } = decode(token) as DecodedJwt
        return ok({ userId: sub })
      } catch (err) {
        return forbidden(new AccessDeniedError())
      }

    } catch (error: any) {
      return fail(error)
    }
  }
}
