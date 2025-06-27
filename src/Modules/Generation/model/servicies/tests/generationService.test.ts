import { beforeEach, describe, expect } from "vitest";
import { mockGenerationApi } from "@/Modules/Generation/model/api/tests/mock.ts";
import { generationService } from "@/Modules/Generation/model/servicies/generationService.ts";
import { generationApi } from "@/Modules/Generation/model/api/generationApi.ts";

describe("Generation Service", () => {
	beforeEach(() => {
		mockGenerationApi();
	});

	it("generateFile вызывает generationApi.generateFile", () => {
		generationService.generateFile();

		expect(generationApi.generateFile).toHaveBeenCalledOnce();
	});
});
