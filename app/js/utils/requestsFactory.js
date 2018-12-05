import handleResponse from "./handleResponse";
import { DEFAULT_HEADERS } from "../config";
import handleResponseFailed from "./handleResponseFailed";

const requestTypes =  {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    deleteType: 'DELETE',
};

export default class RequestHandler {
    constructor (url, method, ...rest) {
        this.parameters = RequestHandler.defineRequestParameters(method, rest);
        this.url = url;
    }

    static defineRequestParameters (requestMethod, params) {

        const parametersObject = RequestHandler.setParams(requestMethod, params);

        if (requestMethod === 'post' || requestMethod === 'put') {
            RequestHandler.setHeaders(parametersObject);
        }

        return parametersObject;
    }

    static setParams (requestMethod, params){
        const obj = { method: requestTypes[requestMethod]};

        if (params) {
            for (let param of params) {
                let key = Object.keys(param)[0];
                let value = Object.values(param)[0];
                obj[key] = value;
            }
        }

        return obj;
    }

    static setHeaders(parametersObject) {
        parametersObject.headers = parametersObject.headers || DEFAULT_HEADERS;
    }

    send () {
        return fetch(this.url, this.parameters)
            .then(handleResponse)
            .catch(error => handleResponseFailed(error));
    }
}