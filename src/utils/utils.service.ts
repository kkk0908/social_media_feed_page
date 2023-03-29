import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt"

@Injectable()
export class UtilService {

	async checkValidMongoDBId(id: string) {
		if (id.match(/^[0-9a-fA-F]{24}$/)) {
			return true
		} else {
			return false
		}
	}

	async hashPassword(password) {
		const hash = await bcrypt.hash(password, 10);
		return hash;
	}

	async comparePassword(enteredPassword, dbPassword) {
		const match = await bcrypt.compare(enteredPassword, dbPassword);
		return match;
	}
}