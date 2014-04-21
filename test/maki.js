var test = require('tap').test,
    fs = require('fs'),
    pins = require('./pins.json'),
    makizushi = require('../');

var REGEN = false;

pins.forEach(function(pin) {
    test(JSON.stringify(pin), function(t) {
        makizushi(pin, function(err, res) {
            t.equal(err, null, 'no error returned');
            if (REGEN) {
                fs.writeFileSync(__dirname +'/data/' + slug(pin), res);
            } else {
                t.deepEqual(
                    fs.readFileSync(__dirname +'/data/' + slug(pin)),
                    res, 'image is correct');
            }
            t.end();
        });
    });
});

test('invalid-marker', function(t) {
    makizushi({}, function(err, res) {
        t.equal(err.message, 'Marker "{}" is invalid.');
        t.end();
    });
});

test('invalid-marker', function(t) {
    makizushi({
        base: 'pin-l'
    }, function(err, res) {
        t.equal(err.message, 'Marker "{"base":"pin-l"}" is invalid.');
        t.end();
    });
});

function slug(o) {
    return Object.keys(o).map(function(k) {
        return o[k];
    }).join('-') + '.png';
}
