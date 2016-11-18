


Create table test."Contacts"
(
	"ContactID" Integer NOT NULL,
	"Token" Varchar(256),
	"Email" Varchar(256),
	"TaiKhoan" Varchar(256),
	"Device" Varchar(256),
	"PhoneNumber" Varchar(50),
	"NgayTao" Timestamp,
	"FaceBook" Varchar(256),
	"Contact_TagID" Integer[],
	"Contact_TagName" Text[],
 primary key ("ContactID")
) Without Oids;


Create table test."n_App"
(
	"AppID" Integer NOT NULL,
	"APIKey" Varchar(256),
	"AppName" Varchar(256),
	"IsActive" Boolean,
	"NgayTao" Timestamp,
 primary key ("AppID")
) Without Oids;


Create table test."n_Notifications"
(
	"NotifiID" Integer NOT NULL,
	"AppID" Integer NOT NULL,
	"TieuDe" Varchar(256),
	"NoiDung" Text,
	"ThoiGianGui" Timestamp,
	"ThoiHanToiDa" Timestamp,
	"DoUuTien" Integer,
	"TrangThaiGoi" Integer,
	"SoLuong" Integer,
	"Send_UserID" Integer[],
	"Send_UserName" Text[],
	"Send_TagID" Integer[],
	"Send_TagName" Text[],
	"Send_UserDenieID" Integer[],
	"Send_UserDenieName" Text[],
	"Send_TagDenieID" Integer[],
	"Send_TagDenieName" Text[],
 primary key ("NotifiID")
) Without Oids;


Create table test."n_Tag"
(
	"TagID" Integer NOT NULL,
	"TagNameDisplay" Varchar(256),
	"AccountID" Varchar(128),
	"IsDefault" Boolean,
 primary key ("TagID")
) Without Oids;


Create table test."n_Contacts_Notifications"
(
	"ContactID" Integer NOT NULL,
	"NotifiID" Integer NOT NULL,
	"TrangThai" Integer,
	"ThoiGianCanGoi" Timestamp,
	"LogLoi" Text,
	"SoLanGoi" Integer,
	"ThoiGianDaGoi" Timestamp,
 primary key ("ContactID","NotifiID")
) Without Oids;


Create table test."AccountID"
(
	"AccountID" Varchar(128) NOT NULL,
 primary key ("AccountID")
) Without Oids;


Create table test."Users_Contacts"
(
	"ContactID" Integer NOT NULL,
	"AccountID" Varchar(128) NOT NULL,
	"Contact_Tag" Char(20),
 primary key ("ContactID","AccountID")
) Without Oids;


Alter table test."n_Contacts_Notifications" add  foreign key ("ContactID") references test."Contacts" ("ContactID") on update restrict on delete restrict;

/* Create Foreign Keys */

Alter table test."n_Contacts_Notifications" add  foreign key ("ContactID") references test."Contacts" ("ContactID") on update restrict on delete restrict;

Alter table test."Users_Contacts" add  foreign key ("ContactID") references test."Contacts" ("ContactID") on update restrict on delete restrict;

Alter table test."n_Notifications" add  foreign key ("AppID") references test."n_App" ("AppID") on update restrict on delete restrict;

Alter table test."n_Contacts_Notifications" add  foreign key ("NotifiID") references test."n_Notifications" ("NotifiID") on update restrict on delete restrict;

Alter table test."Users_Contacts" add  foreign key ("AccountID") references test."AccountID" ("AccountID") on update restrict on delete restrict;

INSERT INTO test."Contacts"(
	"ContactID", "Token", "Email", "TaiKhoan", "Device", "PhoneNumber", "NgayTao", "FaceBook", "Contact_TagID", "Contact_TagName")
	VALUES  (1, 'a', 'a', 'a', 'a', 'a', '12/12/2016', 'a', '{1}', '{default}'),
			(2, 'b', 'a', 'a', 'a', 'a', '12/12/2016', 'a', '{2}', '{denine}'),
			(3, 'c', 'a', 'a', 'a', 'a', '12/12/2016', 'a', '{3}', '{block}'),
			(4, 'd', 'a', 'a', 'a', 'a', '12/12/2016', 'a', '{1,2}', '{default,denine}'),
			(5, 'e', 'a', 'a', 'a', 'a', '12/12/2016', 'a', '{2,3}', '{denine,block}'),
			(6, 'f', 'a', 'a', 'a', 'a', '12/12/2016', 'a', '{1,2,3}', '{default,denine,block}');

-- 2 table khac nhau nho ngan cach bang dau ;

INSERT INTO test."n_Tag"(
	"TagID", "TagNameDisplay", "AccountID", "IsDefault")
	VALUES  (1, 'default', 1, true),
    		(2, 'denine', 2, false),
            (3, 'block', 1, true);

