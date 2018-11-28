/*
    custom loader for deleting numeric attributes in json files
    accepts string as input
    outputs string
    chainable with other loaders (for example raw-loader)
    you can specify in the loader options ('regularExpression' parameter), i.e.
    your custom regular expression for deleting attributes
*/

const validateOptions = require('schema-utils');
const getOptions = require('loader-utils/lib/getOptions');

const schema = {
    properties: {
        'regularExpression': {
           'instanceof': 'RegExp',
        }
    }
};

module.exports = function (source) {

    const options = getOptions(this);
    validateOptions(schema, options, 'json-delete-numeric-attributes-loader');

    let numericCheckRegExp;

    if (options) {
        numericCheckRegExp = options.regularExpression;
    } else {
        numericCheckRegExp = /^\d+$/;
    }

    let obj;

    if(typeof source === 'string') {
        obj = JSON.parse(source);
    } else if(source !== null && typeof source === 'object') {
        obj = source;
    } else return `export default ${ source }`;

    for (key in obj) {
        if (numericCheckRegExp.test(key)) {
            delete obj[key];
        }
    }

    return `${ JSON.stringify(obj) }`;
};
