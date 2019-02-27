module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'browserify'],
        files: [
            'spec/*spec.js',
            './*.js'
        ],
        plugins: [
            'karma-browserify',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-coverage',
        ],
        exclude: [],
        preprocessors: {
            'app/test/*.js': ['browserify']
        },
        reporters: ['progress', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: true,
        coverageReporter: {
            reporters: [
                { type: 'lcov', dir: 'coverage/' },
                { type: 'text-summary' }
            ]
        }
    });
};
