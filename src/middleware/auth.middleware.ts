import { SERVER } from './../config/dotenv';
import { BadRequestException, CanActivate, ExecutionContext, GoneException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from "@nestjs/common";
import axios from 'axios';

@Injectable()
export default class AuthGaurd implements CanActivate {

  public async canActivate(context: ExecutionContext): Promise<boolean> {

    const req = context.switchToHttp().getRequest();

    const token: string | undefined = req.headers['access-token'];

    if (token === undefined) {

      throw new UnauthorizedException('토큰이 전송되지 않았습니다');
    }

    try {
      const { data } = await axios.get(`${SERVER.OPENAPI}/user`, {
        headers: {
          "access-token": token,
        },
      });

      req.user = data.data;
      return true;
    } catch (err) {

      if (err.response !== undefined) {
        switch (err.response.status) {
          case 400:
            throw new BadRequestException('토큰이 전송되지 않았습니다');
          case 401:
            throw new UnauthorizedException('위조된 토큰입니다');
          case 410:
            throw new GoneException('토큰이 만료 되었습니다');
          default:
            Logger.error(err);
            throw new InternalServerErrorException('openAPI 오류');
        }
      }

      Logger.error(err);
      throw new InternalServerErrorException('DDR6서버 오류');
    }
  }
}