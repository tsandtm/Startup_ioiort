import { RepoBase } from './repositories.base';
import { User } from '../models/user.model';

export class UsersRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<User[]> {
        let queryText = 'select * from "users"';

        console.info('Excute: ' + queryText);
        let pResult;   

        if (option.IDUser != undefined) {
            pResult = this._pgPool.query(queryText + ' where "iduser" = ' + option.IDUser)
            console.info('Excute: ' + queryText + ' where "iduser" = ' + option.IDUser);
        } else {
            pResult = this._pgPool.query(queryText)
        }
        
        return pResult.then(result => {
            let users: User[] = result.rows.map(r => {
                let user = new User();
                user.IDUser = r.iduser;
                user.UserName = r.username;
                user.Facebook = r.facebook;
                user.PhoneNumber = r.phonenumber;
                user.Email = r.email;
                return user;
            });
            return users;
        })
            .catch(err => {
                console.error(err.message);
                return null;
        });
    }

    public getUser(option): Promise<User> {
        let queryText = 'select * from "users" where iduser=$1';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [option.IDUser])
            .then(result => {
                let user = new User();
                user.IDUser = result.rows[0].iduser;
                user.UserName = result.rows[0].username;
                user.Facebook = result.rows[0].facebook;
                user.PhoneNumber = result.rows[0].phonenumber;
                user.Email = result.rows[0].email;
                return user;
            });
    }

    public count(option): Promise<number> {
        let queryText = 'select count(*) as abc from users';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText)
            .then(result => {
                return result.rows[0].abc
            })
    }
    public Create(option): Promise<User> {
        let queryText = 'INSERT INTO "users" values($1,$2,$3,$4,$5)';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [option.IDUser,
        option.UserName,
        option.Facebook,
        option.PhoneNumber,
        option.Email
        ])
        .then(result => {
            return null;
        });
    }
}