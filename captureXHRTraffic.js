const assert = require("assert");
const fs = require('fs');

module.exports = {
    'Capture XHR Traffic' : function (browser) {
        browser
            .url('https://www.test-cors.org/')
            .execute(fs.readFileSync('ajaxListener.js').toString())
            .waitForElementVisible('body')
            .setValue('#server_url', 'https://httpbin.org/get')
            .click('#btnSendRequest')
            .pause(3000)
            .getLog('browser', function(traffics) {
                // Write to the traffics.log
                fs.writeFileSync('traffics.log', JSON.stringify(traffics, null, 4));

                // Parse traffics
                traffics.forEach(function(traffic) {
                    consoleMessage = traffic.message;
                    try {
                        jsonObj = JSON.parse(JSON.parse(consoleMessage.substring(18, consoleMessage.length)));
                        method = jsonObj.method;
                        url = jsonObj.url;
                        requestData = jsonObj.requestData;
                        responseCode = jsonObj.responseCode;
                        responseHeader = jsonObj.responseHeader;
                        responseText = jsonObj.responseText;

                        console.log('**********************');
                        console.log('method: ' + method);
                        console.log('url: ' + url);
                        console.log('requestData: ' + requestData);
                        console.log('responseCode: ' + responseCode);
                        console.log('responseHeader: '+ responseHeader);
                        console.log('responseText: ' + responseText);
                        console.log('\n');

                        browser.assert.equal(responseCode, '200')
                    } catch (err) {
                        if (err instanceof assert.AssertionError) {
                            throw err;
                        } else {
                        }
                    }
                })

            })
            .end();
    }
};