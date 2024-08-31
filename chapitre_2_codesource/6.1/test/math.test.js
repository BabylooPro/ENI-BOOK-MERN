import { expect } from "chai";

import add from "../math.js";

describe("Addition Function", () => {
	it("should return the sum of two numbers", () => {
		const result = add(2, 3);
		expect(result).to.equal(5);
	});

	it("should return a negative number if the sum is negative", () => {
		const result = add(-2, -3);
		expect(result).to.equal(-5);
	});

	it("should return zero if both numbers are zero", () => {
		const result = add(0, 0);
		expect(result).to.equal(0);
	});
});
