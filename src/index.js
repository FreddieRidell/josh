const josh = {
	stack: [],
	i: 0,

	getPreviousStackValue() {
		for (let j = this.i; j >= 0; j--) {
			if (this.stack[j]) {
				return this.stack[j];
			}
		}
	},
};

export function describe(label, fn) {
	global.describe(label, () => {
		josh.i++;
		fn();
		josh.i--;
	});
}

describe.only = function describeOnly(label, fn) {
	global.describe.only(label, () => {
		josh.i++;
		fn();
		josh.i--;
	});
};

describe.skip = function describeSkip(label, fn) {
	global.describe.skip(label, () => {
		josh.i++;
		fn();
		josh.i--;
	});
};

export function beforeEach(fn) {
	global.beforeEach(() => {
		return Promise.resolve(fn(josh.getPreviousStackValue())).then(
			newFixture => {
				josh.stack[josh.i] = newFixture;
			},
		);
	});
}

export function afterEach(fn) {
	global.afterEach(() => {
		return Promise.resolve(fn(josh.stack[josh.i]));
	});
}

export function test(label, fn) {
	global.test(label, () => {
		return fn(josh.stack[josh.i]);
	});
}

test.only = function testOnly(label, fn) {
	global.test.only(label, () => {
		return fn(josh.stack[josh.i]);
	});
};

test.skip = function testSkip(label, fn) {
	global.test.skip(label, () => {
		return fn(josh.stack[josh.i]);
	});
};

export const it = test;
