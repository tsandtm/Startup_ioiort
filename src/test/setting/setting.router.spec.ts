// su dung cai nay de chay cac test va output ra cac loi
import { Expect, Test, TestCase, AsyncTest, Setup, Teardown, Timeout } from 'alsatian';
// su dung cai nay de test api cua express
import * as supertest from 'supertest';
// su dung cai nay de ket hop voi asnyc test cua alsatian
import * as bluebird from 'bluebird';
// lay cai app chinh
import app from '../../api/app';
// lay class Server tu http
import { Server } from 'http';

import path = require('path');
let testdata = require(path.join(__dirname, 'setting.test.json'));
let config = require(path.join(__dirname, '..', '..', 'config', 'server.config.json'))['test'];

export class ReportTest {
    // no se tao ra mot client gia va se noi chuyen voi url la http://localhost:8081/api 
    request: supertest.SuperTest<supertest.Test> = supertest('http://' + config.host + ':' + config.port + '/api');
    instance: Server;

    // ham nay se chay dau tien truoc khi cac test chay
    @Setup
    public setUp() {
        // khoi tao cai Server
        this.instance = app.listen(config.port, config.host);
        // console.log('chay setup')
    }

    // cai ham nay se chay cuoi cung sau khi cac test chay
    @Teardown
    public tearDown() {
        // dong server lai
        this.instance.close();
        // console.log('chay Teardown')
    }


    // dung se test nhung thu ko tra ve lien
    // va them cai dong de mo ta cai test
    // timeout la thoi gian ma cai test nay se cho
    @AsyncTest('mot danh sach cac device')
    @Timeout(5000)
    public getAllBook() {
        return new bluebird((resolve, reject) => {
            this.request.get('/setting')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect((res: supertest.Response) => {
                    Expect(res.body).toEqual(testdata)
                })
                .end((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                })
        })
    }


    // @AsyncTest('should return book with name book1')
    // @Timeout(5000)
    // public getABook() {
    //     return new bluebird((resolve, reject) => {
    //         this.request.get('/book')
    //             .query({ id: 1 })
    //             .expect('Content-Type', /json/)
    //             .expect((res: supertest.Response) => {
    //                 Expect(res.body).toEqual(bookData[0]);
    //             })
    //             .end(err => {
    //                 if (err) {
    //                     reject(err);
    //                 } else {
    //                     resolve();
    //                 }
    //             })
    //     })
    // }

    // @AsyncTest('shuold create and return book')
    // @Timeout(5000)
    // public createABook() {
    //     return new bluebird((resolve, reject) => {
    //         this.request.post('/book')
    //             .type('form')
    //             .send({ name: 'tao tu test' })
    //             .expect(200)
    //             .expect((res: supertest.Response) => {
    //                 Expect(res.body).toEqual({ id: 4, name: 'tao tu test' })
    //             })
    //             .end(err => {
    //                 if (err) {
    //                     reject(err)
    //                 } else {
    //                     resolve()
    //                 }
    //             })
    //     })
    // }

    // @AsyncTest('should delete and return book name')
    // @Timeout(5000)
    // @TestCase(1)
    // public deleteABook(index: number) {
    //     return new bluebird((resolve, reject) => {
    //         this.request.delete('/book')
    //             .query({ id: bookData[index].id })
    //             .expect(200)
    //             .expect((res: supertest.Response) => {
    //                 Expect(res.text).toEqual('sach ' + bookData[index].name + ' da duoc huy')
    //             })
    //             .end(err => {
    //                 if (err) {
    //                     reject(err)
    //                 } else {
    //                     resolve()
    //                 }
    //             })
    //     })
    // }

    @Test('add 1 and 2 shuold return 3')
    @TestCase(1, 2, 3)
    public testAdd(v1, v2, expected) {
        Expect(v1 + v2).toEqual(expected);
    }


}