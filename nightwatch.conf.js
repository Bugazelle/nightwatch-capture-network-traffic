module.exports = {
    src_folders: [],

    webdriver: {
        start_process: true,
        port: 4445,
        server_path: require('chromedriver').path,
        cli_args: [
            '--verbose',
            '--whitelisted-ips',
            '--port=4445'
        ]
    },

    test_settings: {
        default: {
            desiredCapabilities: {
                browserName: 'chrome',
            }
        }
    }
};