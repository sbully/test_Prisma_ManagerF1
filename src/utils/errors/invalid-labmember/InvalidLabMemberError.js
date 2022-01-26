import RequestError from '../request-error/requestError';

export default class InvalidLabMemberError extends RequestError {
	constructor() {
		super('Invalid labMember id', 400);
	}
}
