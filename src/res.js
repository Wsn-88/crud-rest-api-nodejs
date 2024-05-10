'use strict';

exports.ok = function (values, res) {
    const data = {
        'status' : values,
        'value' : 200
    };

    res.json(data);
    res.end();
}

exports.created = function (values, res) {
    const success = {
        'status' : values,
        'value' : 201
    };

    res.json(success);
    res.end();
}

exports.notFound = function (values, res) {
    const results = {
        'status' : values,
        'value' : 404
    };

    res.json(results);
    res.end();
}

exports.Unauthorized = function (values, res) {
    const results = {
        'status' : values,
        'value' : 401
    };

    res.json(results);
    res.end();
}

exports.badRequest = function (values, res) {
    const results = {
        'status' : values,
        'value' : 400
    };

    res.json(results);
    res.end();
}

//respon untuk nested matakuliah
exports.okNested = function (values, res){
    //lakukan akumulasi
    const results = values.reduce((accumulation, item) => {
        //tentukan key group
        if (accumulation[item.nama]) {
            //buat variable untuk grup nama mahasiswa
            const group = accumulation[item.nama];
            //cek isi array adalah matakuliah
            if (Array.isArray(group.matakuliah)){
                //tambah value ke dalam grup matakuliah 
                group.matakuliah.push(item.matakuliah);
            }else {
                group.matakuliah = [group.matakuliah, item.matakuliah];
            }

        }else{
            accumulation[item.nama] = item;
        }
        return accumulation;
    },{});

    const data = {
        'status':200,
        'values':results
    };
    
     res.json(data);
     res.end();
}