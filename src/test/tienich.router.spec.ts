import { Expect, Test, TestCase, AsyncTest, Setup, Teardown, Timeout } from 'alsatian';
import * as supertest from 'supertest';
import * as bluebird from 'bluebird';
import { tienichData } from './test.data';
import app from '../api/app';
import { Server } from 'http';



export class TienichRouterTest {
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
    // public getAllTienich() {
    //     return new bluebird((resolve, reject) => {
    //         this.request.get('/tienich')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .expect((res: supertest.Response) => {
    //                 Expect(res.body).toEqual(tienichData)
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



    // @AsyncTest('should delete and return book name')
    // @Timeout(5000)
    // @TestCase(0)
    // public xoaTienIch(index: number) {
    //     return new bluebird((resolve, reject) => {
    //         this.request.delete('/tienich')
    //             .query({id:tienichData[index].id})
    //             .expect(200)
    //             .expect((res: supertest.Response) => {
    //                 Expect(res.text).toEqual('Tên '+tienichData[index].TenGoi + ' đã xóa được')
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


    @AsyncTest('shuold create and return book')
    @Timeout(5000)
    public themTienIch() {
        return new bluebird((resolve, reject) => {
            this.request.post('/tienich')
                .type('form')
                .send({ id: 7, KyHieu: 'hl' ,TenGoi: 'ff', BieuTuong: 'hhhhh'})
                .expect(200)
                .expect((res: supertest.Response) => {
                    Expect(res.body).toEqual({ id: 7, KyHieu: 'hl' ,TenGoi: 'ff', BieuTuong: 'hhhhh' })
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
}
