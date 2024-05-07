'use strict';

exports.ok = function(values, res){
    const data = {
        'status' : values,
        'value' : 200
    };

    res.json(data);
    res.end();
}