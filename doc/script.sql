/*
Created		10/20/2016
Modified		10/31/2016
Project		
Model			
Company		
Author		
Version		
Database		PostgreSQL 8.1 
*/


/* Create Tables */

Create table test."DanhMucSite"
(
	"IDDanhMucSite" Integer NOT NULL,
	"DuongDan" Varchar(500),
	"TenGoi" Varchar(500),
	"MoTa" Varchar(3000),
	"SoLuongTinDuyetTim" Integer,
	"TempateCrawlTieuDe" Varchar(256),
	"TempateCrawlMoTa" Varchar(256),
	"TempateCrawlNoiDung" Varchar(256),
	"TempateCrawlImage" Varchar(256),
	"LinkRSS" Varchar(256),
 primary key ("IDDanhMucSite")
) Without Oids;


Create table test."TinTuc"
(
	"IDTinTuc" Bigint NOT NULL,
	"IDDanhMucSite" Integer NOT NULL,
	"TieuDe" Varchar(256),
	"MoTa" Varchar(2000),
	"NoiDung" Text,
	"ThoiGianDangTin" Time,
	"URLNews" Varchar(256),
	"URLThumbImage" Varchar(256),
	"URLImage" Varchar(256),
 primary key ("IDTinTuc")
) Without Oids;


Create table test."User"
(
	"IDUser" Bigint NOT NULL,
	"Username" Varchar(256),
	"Facebook" Varchar(256),
	"PhoneNumber" Varchar(256),
	"Email" Varchar(256),
 primary key ("IDUser")
) Without Oids;


Create table test."User_DanhMucSite"
(
	"IDUser" Bigint NOT NULL,
	"IDDanhMucSite" Integer NOT NULL,
	"CreatedDate" Time,
 primary key ("IDUser","IDDanhMucSite")
) Without Oids;


Create table test."TinDaXem"
(
) Without Oids;


Create table test."TinDaXoa"
(
) Without Oids;


Create table test."TinDaLuu"
(
) Without Oids;

/* Create Foreign Keys */

Alter table test."TinTuc" add  foreign key ("IDDanhMucSite") references test."DanhMucSite" ("IDDanhMucSite") on update restrict on delete restrict;

Alter table test."User_DanhMucSite" add  foreign key ("IDDanhMucSite") references test."DanhMucSite" ("IDDanhMucSite") on update restrict on delete restrict;

Alter table test."User_DanhMucSite" add  foreign key ("IDUser") references test."User" ("IDUser") on update restrict on delete restrict;


INSERT INTO test.""


