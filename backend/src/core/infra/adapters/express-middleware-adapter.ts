import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Middleware } from '../middleware'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const requestData = {
      jwt: request.headers.authorization,
      currentWorkspaceId: request.headers['current-workspace-id'],
      currentProjectId: request.headers['current-project-id'],
      currentUserId: request.userId,
      ...request.headers,
    }

    const httpResponse = await middleware.handle(requestData, request.body)

    /**
     * Não é um erro, mas parar a requisição.
     */
    if (httpResponse === false) {
      return response.status(StatusCodes.OK).send()
    }

    if (httpResponse.statusCode === StatusCodes.OK) {
      Object.assign(request, httpResponse.body)
      return next()
    }

    return response.status(httpResponse.statusCode).json({
      type: httpResponse.body.type,
      message: httpResponse.body.message,
    })
  }
}
