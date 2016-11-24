import { Expect, Test, TestCase, AsyncTest, Setup, Teardown, Timeout } from 'alsatian';
import * as supertest from 'supertest';
import * as bluebird from 'bluebird';
import { bookData,productData,TienIch } from './test.data';
import app from '../api/app';
import { Server } from 'http';



export class TienIchRouterTest {
    request: supertest.SuperTest<supertest.Test> = supertest('http://localhost:8081/api');
    instance: Server;

    @Setup
    public setUp() {
        this.instance = app.listen(8081, 'localhost');
        // console.log('chay setup')
    }

    @Teardown
    public tearDown() {
        this.instance.close();
        // console.log('chay Teardown')
    }



    // @AsyncTest('should return json array')
    // @Timeout(5000)
    // public getAllTienIch() {
    //     return new bluebird((resolve, reject) => {
    //         this.request.get('/tienich')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .expect((res: supertest.Response) => {
    //                 Expect(res.body).toEqual(TienIch)
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


    // @AsyncTest('should return book with name book1')
    // @Timeout(5000)
    // public getATienIch() {
    //     return new bluebird((resolve, reject) => {
    //         this.request.get('/tienich')
    //             .query({id:1})
    //             .expect('Content-Type', /json/)
    //             .expect((res: supertest.Response) => {
    //                 Expect(res.body).toEqual([TienIch[0]]);
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

    @AsyncTest('shuold create and return book')
    @Timeout(5000)
    public createATienIch() {
        return new bluebird((resolve, reject) => {
            this.request.post('/tienich')
                .type('form')
                .send({ KyHieu:'ttt', TenGoi:'TTT', BieuTuong:'ttt' })
                .expect(200)
                .expect((res: supertest.Response) => {
                    Expect(res.body).toEqual({ id:4,  KyHieu:'ttt', TenGoi:'TTT', BieuTuong:'ttt' })
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

    // @AsyncTest('should delete and return tienich TenGoi')
    // @Timeout(5000)
    // @TestCase(0)
    // public deleteATienIch(index: number) {
    //     return new bluebird((resolve, reject) => {
    //         this.request.delete('/tienich')
    //             .query({ id: TienIch[index].id })
    //             .expect(200)
    //             .expect((res: supertest.Response) => {
    //                 Expect(res.text).toEqual('Tien Ich ' + TienIch[index].TenGoi + ' da duoc huy')
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

    // @Test('add 1 and 2 shuold return 3')
    // @TestCase(1,2,3)
    // public testAdd(v1,v2,expected){
    //     Expect(v1+v2).toEqual(expected);
    // }


}