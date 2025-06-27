import { generationService } from "@/Modules/Generation/model/servicies/generationService.ts";

export const mockGenerationService = () => ({
	generateFile: vi.spyOn(generationService, "generateFile").mockImplementation(() => Promise.resolve()),
});
