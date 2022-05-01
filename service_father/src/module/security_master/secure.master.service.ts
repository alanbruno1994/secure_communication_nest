import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class SecureMasterService {
  private async verifyMasterToken(token: string) {
    console.log('testou1 ', token);
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        process.env.SECRET_KEY_MASTER,
        {},
        (jwt_err, payload) => {
          if (jwt_err) {
            reject(jwt_err);
          } else {
            resolve(payload);
          }
        },
      );
    });
  }

  private async verifyWebToken(token: string) {
    console.log('testou2 ', token);
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRET_KEY_WEB, {}, (jwt_err, payload) => {
        if (jwt_err) {
          reject(jwt_err);
        } else {
          resolve(payload);
        }
      });
    });
  }

  private async verifyMobileToken(token: string) {
    console.log('testou3 ', token);
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        process.env.SECRET_KEY_MOBILE,
        {},
        (jwt_err, payload) => {
          if (jwt_err) {
            reject(jwt_err);
          } else {
            resolve(payload);
          }
        },
      );
    });
  }

  async generateTokenMaster() {
    return await jwt.sign({}, process.env.SECRET_KEY_MASTER, {
      expiresIn: '24h',
    });
  }

  async generateTokenWeb() {
    return await jwt.sign({}, process.env.SECRET_KEY_WEB, {
      expiresIn: '24h',
    });
  }

  async generateTokenMobile() {
    return await jwt.sign({}, process.env.SECRET_KEY_MOBILE, {
      expiresIn: '24h',
    });
  }

  async accessAll(token: string) {
    try {
      await this.verifyMasterToken(token);
    } catch (e) {
      try {
        await this.verifyMobileToken(token);
      } catch (e) {
        try {
          await this.verifyWebToken(token);
        } catch (e) {
          throw new UnauthorizedException(
            'You are not authorized to make this request.',
          );
        }
      }
    }
  }
  async accessMaster(token: string) {
    try {
      console.log('bateu accessMaster ', token);
      await this.verifyMasterToken(token);
    } catch (e) {
      throw new UnauthorizedException(
        'You are not authorized to make this request.',
      );
    }
  }
}
