import { generationApi } from "../api/generationApi.ts";

export class GenerationService {
	async generateFile() {
		return generationApi.generateFile();
	}
}

export const generationService = new GenerationService();
