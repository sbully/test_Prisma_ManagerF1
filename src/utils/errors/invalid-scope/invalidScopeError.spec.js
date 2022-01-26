import InvalidScopeError from './InvalidScopeError';

describe('InvalidScopeError.class', () => {
	it('should create a request error with the Invalid Scope Error message', () => {
		const invalidParameterError = new InvalidScopeError();
		expect(invalidParameterError.message).toBe('Invalid scope');
		expect(invalidParameterError.httpCode).toBe(400);
	});
});
