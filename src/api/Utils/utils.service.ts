import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';

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
}