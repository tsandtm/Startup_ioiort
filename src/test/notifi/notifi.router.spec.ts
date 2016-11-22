import { Expect, Test, TestCase, AsyncTest, Setup, Teardown, Timeout } from 'alsatian';
import * as supertest from 'supertest';
import * as bluebird from 'bluebird';
//import { bookData,productData } from './test.data';
import app from '../../api/app';
import { Server } from 'http';

import path = require('path');
let testdata = require(path.join(__dirname, 'notifi.test.json'));
let config = require(path.join(__dirname, '..', '..', 'config', 'server.config.json'))['test'];


export class NotifiRouter {
    request: supertest.SuperTest<supertest.Test> = supertest('http://' + config.host + ':' + config.port + '/api');
    instance: Server;

    @Setup
    public setUp() {
        this.instance = app.listen(config.port, config.host);
        // console.log('chay setup')
    }

    @Teardown
    public tearDown() {
        this.instance.close();
        // console.log('chay Teardown')
    }


        // this.router.route('/notifi')
        //     .post(this.Create)
        // this.router.route("/notifigetone")
        // .post(this.Update);

        // this.router.route("/sl")
        // .post(this.getSLsend)

        // this.router.route("/sldenied")
        // .post(this.getSLsenddenied)

        // this.router.route("/sentuser")
        // .post(this.Insert)
        

    // @AsyncTest('should return json array')
    // @Timeout(5000)
    // public getLastNotifi() {
    //     return new bluebird((resolve, reject) => {
    //         this.request.get('/notifi')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .expect((res: supertest.Response) => {
    //                 Expect(res.body).toEqual(testdata[0])
    //             })
    //             .end((err, res) => {
    //                 if (err) {
    //                     reject(err);
    //                 } else {
    //                     resolve();
    //                 }
    //             })
                
    //     })
    // }

    // @AsyncTest('should return json array')
    // @Timeout(5000)
    // public getAllnotifi() {
    //     return new bluebird((resolve, reject) => {
    //         this.request.get('/notifigetone')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .expect((res: supertest.Response) => {
    //                 Expect(res.body).toEqual(testdata[1])
    //             })
    //             .end((err, res) => {
    //                 if (err) {
    //                     reject(err);
    //                 } else {
    //                     resolve();
    //                 }
    //             })
                
    //     })
    // }
    
    // @AsyncTest('should return json array')
    // @Timeout(5000)
    // public getSL() {
    //     return new bluebird((resolve, reject) => {
    //         this.request.get('/sl')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .expect((res: supertest.Response) => {
    //                 Expect(res.body).toEqual(testdata[2])
    //             })
    //             .end((err, res) => {
    //                 if (err) {
    //                     reject(err);
    //                 } else {
    //                     resolve();
    //                 }
    //             })

    //     })
    // }

    // @AsyncTest('should return json array')
    // @Timeout(5000)
    // public getSLdenied() {
    //     return new bluebird((resolve, reject) => {
    //         this.request.get('/sldenied')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .expect((res: supertest.Response) => {
    //                 Expect(res.body).toEqual(testdata[3])
    //             })
    //             .end((err, res) => {
    //                 if (err) {
    //                     reject(err);
    //                 } else {
    //                     resolve();
    //                 }
    //             })

    //     })
    // }


    // @AsyncTest('should return json array')
    // @Timeout(5000)
    // public getSentUser() {
    //     return new bluebird((resolve, reject) => {
    //         this.request.get('/sentuser')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .expect((res: supertest.Response) => {
    //                 Expect(res.body).toEqual(testdata[4])
    //             })
    //             .end((err, res) => {
    //                 if (err) {
    //                     reject(err);
    //                 } else {
    //                     resolve();
    //                 }
    //             })

    //     })
    // }


    // @AsyncTest('should return json array')
    // @Timeout(5000)
    // public getSentUserDenied() {
    //     return new bluebird((resolve, reject) => {
    //         this.request.get('/sentuserdenied')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .expect((res: supertest.Response) => {
    //                 Expect(res.body).toEqual(testdata[5])
    //             })
    //             .end((err, res) => {
    //                 if (err) {
    //                     reject(err);
    //                 } else {
    //                     resolve();
    //                 }
    //             })

    //     })
    // }


    

    @AsyncTest('should create and return book')
    @Timeout(5000)
    public createNotifi() {
        return new bluebird((resolve, reject) => {
            this.request.post('/notifi')
                .query({NotifiID:2,AppID:1,TieuDe:'test',NoiDung:'test'})
                .expect(200)
                .expect((res: supertest.Response) => {
                    Expect(res.body).toEqual(null)
                })
                .end(err => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                })
        })
    }

//     // @AsyncTest('should delete and return book name')
//     // @Timeout(5000)
//     // @TestCase(1)
//     // public deleteABook(index: number) {
//     //     return new bluebird((resolve, reject) => {
//     //         this.request.delete('/book')
//     //             .query({ id: bookData[index].id })
//     //             .expect(200)
//     //             .expect((res: supertest.Response) => {
//     //                 Expect(res.text).toEqual('sach ' + bookData[index].name + ' da duoc huy')
//     //             })
//     //             .end(err => {
//     //                 if (err) {
//     //                     reject(err)
//     //                 } else {
//     //                     resolve()
//     //                 }
//     //             })
//     //     })
//     // }

    @Test('add 1 and 2 shuold return 3')
    @TestCase(1,2,3)
    public testAdd(v1,v2,expected){
        Expect(v1+v2).toEqual(expected);
    }


}