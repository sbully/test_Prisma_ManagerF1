import InvalidLabMemberError from './InvalidLabMemberError';

describe('InvalidLabMemberError.class', () => {
	it('should create a request error with the Invalid LabMember Id Error message', () => {
		const invalidParameterError = new InvalidLabMemberError();
		expect(invalidParameterError.message).toBe('Invalid labMember id');
		expect(invalidParameterError.httpCode).toBe(400);
	});
});
