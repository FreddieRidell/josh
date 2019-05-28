import * as josh from ".";

josh.describe("only", () => {
	josh.describe.only("when inside only", () => {
		josh.it.only("will run", () => {
			expect(true).toBe(true);
		});
	});

	josh.describe("when outside only", () => {
		josh.it("will not run", () => {
			expect(true).toBe(false);
		});
	});
});
