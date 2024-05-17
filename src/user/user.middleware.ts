import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { AuthService } from 'src/auth/auth.service'

@Injectable()
export class UserMiddleware implements NestMiddleware {
	constructor(private readonly authService: AuthService) {}

	async use(req: Request, res: Response, next: NextFunction) {
		const refreshToken = req.cookies['refreshToken']

		if (refreshToken) {
			try {
				const userData = await this.authService.verifyRefreshToken(refreshToken)
				req.user = userData
			} catch (error) {}
		}

		next()
	}
}
