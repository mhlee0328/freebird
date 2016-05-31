var util = require('util');
var _ = require('lodash');
var http = require('http');
var ncMock = require('freebird-netcore-mockup');
var expect = require('chai').expect,
    assert = require('chai').assert;

var FreebirdBase = require('freebird-base'),
    Device = FreebirdBase.Device,
    Gadget = FreebirdBase.Gadget,
    Netcore = FreebirdBase.Netcore;

var Freebird = require('../index');

var httpServer = http.createServer();

// console.log(ncMock);
httpServer.listen(3000);

var fbird = new Freebird(httpServer);

fbird.registerNetcore(ncMock, function (err, nc) {
    if (err)
        console.log('err');
    else
        console.log('nc');
});

fbird.on('error', function (err) {
    console.log('>> FB:error');
});

fbird.on('devIncoming', function (msg) {
    console.log('>> FB:devIncoming');
    // console.log(msg);
});

fbird.on('devLeaving', function (msg) {
    console.log('>> FB:devLeaving');
    console.log(msg);
});

fbird.on('devReporting', function (msg) {
    console.log('>> FB:devReporting');
});

fbird.on('bannedDevIncoming', function (msg) {
    console.log('>> FB:bannedDevIncoming');
});

fbird.on('bannedDevReporting', function (msg) {
    console.log('>> FB:bannedDevReporting');
});

fbird.on('gadIncoming', function (msg) {
    console.log('>> FB:gadIncoming');
});

fbird.on('gadLeaving', function (msg) {
    console.log('>> FB:gadLeaving');
});

fbird.on('bannedGadIncoming', function (msg) {
    console.log('>> FB:bannedGadIncoming');
});

fbird.on('bannedGadReporting', function (msg) {
    console.log('>> FB:bannedGadReporting');
});

fbird.on('gadReporting', function (msg) {
    console.log('>> FB:gadReporting');
    console.log({ gad: msg.gad.getId(), data: msg.data });
});

fbird.on('netReady', function (msg) {
    console.log('>> FB:netReady');
});

fbird.on('permitJoin', function (msg) {
    // console.log('>> FB:permitJoin');
    // console.log({ netcore: msg.netcore.getName(), timeLeft: msg.timeLeft });
});

fbird.on('started', function (msg) {
    console.log('>> FB:started');
});

fbird.on('stopped', function (msg) {
    console.log('>> FB:stopped');
});

fbird.on('enabled', function (msg) {
    console.log('>> FB:enabled');
});

fbird.on('disabled', function (msg) {
    console.log('>> FB:disabled');
});

fbird.on('netChanged', function (msg) {
    // console.log('>> FB:netChanged');
    // console.log({ dev: msg.dev.getId(), data: msg.data });
});

fbird.on('statusChanged', function (msg) {
    // console.log('>> FB:statusChanged');
    // console.log({ dev: msg.dev.getId(), data: msg.data });
});

fbird.on('devPropsChanged', function (msg) {
    console.log('>> FB:devPropsChanged');
});

fbird.on('devAttrsChanged', function (msg) {
    // console.log('>> FB:devAttrsChanged');
    // console.log({ dev: msg.dev.getId(), data: msg.data });
});

fbird.on('panelChanged', function (msg) {
    // console.log('>> FB:panelChanged');
    // console.log({ gad: msg.gad.getId(), data: msg.data });
});

fbird.on('gadPropsChanged', function (msg) {
    console.log('>> FB:gadPropsChanged');
    console.log(msg);
});

fbird.on('gadAttrsChanged', function (msg) {
    // console.log('>> FB:gadAttrsChanged');
    // console.log({ gad: msg.gad.getId(), data: msg.data });

});

fbird.start(function (err) {
    fbird.net.permitJoin('mock', 180);
});

