// This code is forked from: https://gist.github.com/icodejs/3183154

var open = window.XMLHttpRequest.prototype.open,
    send = window.XMLHttpRequest.prototype.send,
    onReadyStateChange;

function openReplacement(method, url, async, user, password) {
    var syncMode = async !== false ? 'async' : 'sync';
    this.syncMode = syncMode;
    this.method = method;
    this.url = url;

    return open.apply(this, arguments);
}

function sendReplacement(data) {
    if(this.onreadystatechange) {
        this._onreadystatechange = this.onreadystatechange;
    }
    this.onreadystatechange = onReadyStateChangeReplacement;
    this.requestData = data;

    return send.apply(this, arguments);
}

function onReadyStateChangeReplacement() {
    warnJson = {
        "type": "response",
        "syncMode": this.syncMode,
        "method": this.method,
        "url": this.url,
        "requestData": this.requestData,
        "readyState": this.readyState,
        "responseText": this.responseText,
        "responseCode": this.status,
        "responseHeader": this.getAllResponseHeaders()
    };
    console.warn(JSON.stringify(warnJson));
    if(this._onreadystatechange) {
        return this._onreadystatechange.apply(this, arguments);
    }
}

window.XMLHttpRequest.prototype.open = openReplacement;
window.XMLHttpRequest.prototype.send = sendReplacement;
