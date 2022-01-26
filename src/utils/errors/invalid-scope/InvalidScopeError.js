import RequestError from '../request-error/requestError';

export default class InvalidScopeError extends RequestError {
	constructor() {
		super('Invalid scope', 400);
	}
}
