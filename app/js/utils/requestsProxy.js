import RequestHandler from './requestsFactory';

const requestsLogger = [];

const RequestsProxy = new Proxy(RequestHandler, {
    construct: (target, argArray) => {
        const [method, params = []] = argArray;
        const objectLog = {method, params};
        requestsLogger.push(objectLog);

        console.log(`${method} method was invoked`);
        console.log(`with the following parameters: ${params}`);
        return new target(...argArray);
    }
});

export default RequestsProxy;