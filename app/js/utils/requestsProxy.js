import RequestHandler from './requestsFactory';

const requestsLogger = [];

const RequestsProxy = new Proxy(RequestHandler, {
    construct: (target, argArray) => {

        const [method] = argArray;
        const request = new RequestHandler(...argArray);

        requestsLogger.push(request.parameters);

        console.log(`${method} method was invoked`);
        console.log(`with the following parameters: ${JSON.stringify(request.parameters)}`);

        return new target(...argArray);
    }
});

export default RequestsProxy;