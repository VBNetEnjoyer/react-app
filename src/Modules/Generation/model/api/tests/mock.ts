import { generationApi } from "@/Modules/Generation/model/api/generationApi.ts";

export const mockGenerationApi = () => ({
	generateFile: vi.spyOn(generationApi, "generateFile").mockImplementation(() => Promise.resolve()),
});
