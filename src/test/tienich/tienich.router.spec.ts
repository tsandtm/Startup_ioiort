import { Expect, Test, TestCase, AsyncTest, Setup, Teardown, Timeout } from 'alsatian';
import * as supertest from 'supertest';
import * as bluebird from 'bluebird';
import app from '../../api/app';
import { Server } from 'http';

import path = require('path');
let testtienich = require(path.join(__dirname, 'tienich.test.json'));
let config = require(path.join(__dirname, '..', '..', 'config', 'server.config.json'))['test'];

export class TienichRouterTest {
    request: supertest.SuperTest<supertest.Test> = supertest('http://localhost:3000/api');
    instance: Server;

    @Setup
    public setUp() {
        this.instance = app.listen(3000, 'localhost');
        // console.log('chay setup')
    }

    @Teardown
    public tearDown() {
        this.instance.close();
        // console.log('chay Teardown')
    }



    @AsyncTest('should return json array')
    @Timeout(5000)
    public getAllTienich() {
        return new bluebird((resolve, reject) => {
            this.request.get('/tienich')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect((res: supertest.Response) => {
                    Expect(res.body).toEqual(testtienich)
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



    @AsyncTest('should delete and return name')
    @Timeout(5000)
    @TestCase(2)
    public xoaTienIch(index: number) {
        return new bluebird((resolve, reject) => {
            this.request.delete('/tienich')
                .query({id:testtienich[index].id})
                .expect(200)
                .expect((res: supertest.Response) => {
                    Expect(res.text).toEqual('Tên '+testtienich[index].TenGoi + ' đã xóa được')
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


    @AsyncTest('should create and return tienich')
    @Timeout(5000)
    public themTienIch() {
        return new bluebird((resolve, reject) => {
            this.request.post('/tienich')
                .type('form')
                .send({TienIchID: '8',KyHieu: 'hl', TenGoi: 'ff', BieuTuong: 'cs' })
                .expect(200)
                .expect((res: supertest.Response) => {
                    Expect(res.body).toEqual({TienIchID: '8', KyHieu: 'hl', TenGoi: 'ff', BieuTuong: 'cs'})
                })
                .end(function(err){
                    if (err) {
                        reject(err);
                        console.log("Lỗi k thêm được");
                    } else {
                        resolve();
                        console.log("thêm thành công được");
                    }
                })
        })
    }
    
   @AsyncTest('should edit and return Tienich')
   @Timeout(7000)
    public suaTienIch() {
        return new bluebird((resolve, reject) => {
            this.request.put('/tienich')
                .type('form')
                .send({id: 3, KyHieu: 'faf', TenGoi: 'fsd', BieuTuong: 'gsfasfh' })
                .expect(200)
                .expect((res: supertest.Response) => {
                    Expect(res.body).toEqual({id: "3", KyHieu: 'faf', TenGoi: 'fsd', BieuTuong: 'gsfasfh'})
                })
                .end(function(err){
                    if (err) {
                        reject(err);
                        console.log("sửa bị lỗi");
                    } else {
                        resolve();
                        console.log("sửa thành công");
                    }
                })
        })
    }
 }
