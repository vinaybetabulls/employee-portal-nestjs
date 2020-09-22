import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import *as jwt from 'jsonwebtoken';

export interface JwtInterface {
    username: string,
    roles: string[],
    permissions: string[],
    empUniqueId: string,
    isFirstTimeLogin: boolean

}

@Injectable()
export class UtilService {
    /**
     * 
     * @param password 
     */
    async passwordEncrypt(password: string): Promise<string> {
        try {
            const saltNumber = parseInt(process.env.CRYPT_NUMBER, 10)
            const salt = bcrypt.genSaltSync(saltNumber);
            const hashedPassword = bcrypt.hashSync(password, salt);
            return hashedPassword;
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param password 
     * @param hashedPassword 
     */
    decryptPassword(password: string, hashedPassword: string): boolean {
        return bcrypt.compareSync(password, hashedPassword);
    }

    /**
     * 
     * @param user 
     */
    async generateJSONToken(user: JwtInterface) {
        const expireTime = 60 * 60 * 24; // 1hour
        return jwt.sign({
            user
        }, process.env.JWT_SECRETE_KEY, { expiresIn: expireTime });
    }

    /**
     * 
     * @param userAuthToken 
     */
    async validateJSONToken(userAuthToken): Promise<any> {
        try {
            return jwt.verify(userAuthToken, process.env.JWT_SECRETE_KEY)
        } catch (error) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
        }

    }
}