import * as josh from ".";

josh.describe("outer describe", () => {
	josh.beforeEach(() => {
		return {
			fixtureElementOne: true,
		};
	});

	josh.test("first test", fixture => {
		expect(fixture.fixtureElementOne).toBe(true);
		expect(fixture.fixtureElementTwo).toBe(undefined);
		expect(fixture.fixtureElementThree).toBe(undefined);
	});

	josh.describe("middle describe", () => {
		josh.beforeEach(fixture => {
			return {
				...fixture,
				fixtureElementTwo: true,
			};
		});

		josh.test("second test", fixture => {
			expect(fixture.fixtureElementOne).toBe(true);
			expect(fixture.fixtureElementTwo).toBe(true);
			expect(fixture.fixtureElementThree).toBe(undefined);
		});

		josh.describe("inner describe", () => {
			josh.beforeEach(fixture => {
				return {
					...fixture,
					fixtureElementThree: true,
				};
			});

			josh.afterEach(fixture => {});

			josh.test("third test", fixture => {
				expect(fixture.fixtureElementOne).toBe(true);
				expect(fixture.fixtureElementTwo).toBe(true);
				expect(fixture.fixtureElementThree).toBe(true);
			});

			josh.test("async test", fixture => {
				expect(fixture.fixtureElementOne).toBe(true);
				expect(fixture.fixtureElementTwo).toBe(true);
				expect(fixture.fixtureElementThree).toBe(true);

				return new Promise(resolve => setTimeout(resolve, 500));
			});
		});
	});

	josh.describe.skip("skipped", () => {
		josh.test("should fail", () => {
			expect(true).toBe(false);
		});
	});

	josh.test.skip("skipped test", () => {
		expect(true).toBe(false);
	});

	josh.it("it syntax", () => {
		expect(true).toBe(true);
	});

	josh.describe("async beforeEach and afterEach", () => {
		josh.beforeEach(fixture => {
			return new Promise(resolve => {
				setTimeout(resolve, 500, {
					...fixture,
					fixtureElementTwo: true,
				});
			});
		});

		josh.afterEach(fixture => {
			return new Promise(resolve => {
				setTimeout(resolve, 500, {
					...fixture,
					fixtureElementTwo: true,
				});
			});
		});

		josh.it("matches 'second test'", fixture => {
			expect(fixture.fixtureElementOne).toBe(true);
			expect(fixture.fixtureElementTwo).toBe(true);
			expect(fixture.fixtureElementThree).toBe(undefined);
		});
	});
});
