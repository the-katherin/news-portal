import handleResponse from "./handleResponse";
import { DEFAULT_HEADERS } from "../config";

const requestTypes =  {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    deleteType: 'DELETE',
};

export default class RequestHandler {
    constructor (method, bodyData = '', headers = {}, ...rest) {
        this.parameters = RequestHandler.defineRequestParameters(method, bodyData, headers, ...rest);
    }

    static defineRequestParameters (requestMethod, bodyData, headers, ...rest) {
        const parametersObject = {
            method: requestTypes[requestMethod],
            ...rest,
        };

        if (requestMethod === 'post' || requestMethod === 'put') {
            parametersObject.body = JSON.stringify(bodyData);
            parametersObject.headers = headers || DEFAULT_HEADERS;
        }

        return parametersObject;
    }

    send (url) {
        return fetch(url, this.parameters)
            .then(handleResponse)
            .catch(error => console.log(error));
    }
}