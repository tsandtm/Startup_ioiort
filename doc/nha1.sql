/*
Created		9/8/2016
Modified		11/14/2016
Project		
Model			
Company		
Author		
Version		
Database		PostgreSQL 8.1 
*/


/* Create Tables */


Create table "ioh_TienIch"
(
	"TienIchID" Integer NOT NULL,
	"KyHieu" Varchar(25),
	"TenGoi" Varchar(500),
	"BieuTuong" Varchar(100),
 primary key ("TienIchID")
) Without Oids;


Create table "ioh_LoaiDichVu"
(
	"LoaiDichVuID" Integer NOT NULL,
	"KyHieu" Varchar(25),
	"TenGoi" Varchar(500),
	"HinhThuc" Varchar(256),
 primary key ("LoaiDichVuID")
) Without Oids;


Create table "ioh_LoaiDichVu_TienIch"
(
	"TienIchID" Integer NOT NULL,
	"LoaiDichVuID" Integer NOT NULL,
	"ThuTuHienThi" Integer,
 primary key ("TienIchID","LoaiDichVuID")
) Without Oids;


Create table "ioh_KhachHang"
(
	"KhachHangID" Bigint NOT NULL,
	"HoTen" Varchar(256),
	"Email" Varchar(256),
	"DiaChi" Varchar(256),
	"DienThoai" Numeric,
	"LienHeKhac" Varchar(256),
	"DiDong" Numeric NOT NULL,
 primary key ("KhachHangID")
) Without Oids;


Create table "ioh_YeuCauMua"
(
	"YeuCauMuaID" Bigint NOT NULL,
	"KhachHangID" Bigint NOT NULL,
	"NgayDangTin" Date,
 primary key ("YeuCauMuaID")
) Without Oids;


Create table "ioh_YeuCauBan"
(
	"YeuCauBanID" Bigint NOT NULL,
	"LoaiDichVuID" Integer NOT NULL,
	"KhachHangID" Bigint NOT NULL,
	"NgayDangTin" Time,
	"TieuDeTin" Varchar(2000),
	"MatTienM2" Numeric,
	"DuongVaoM2" Numeric,
	"HuongNha" Varchar(50),
	"HuongBanCong" Varchar(50),
	"SoTang" Integer,
	"SoPhongNgu" Integer,
	"SoToilet" Integer,
	"NoiThat" Varchar(1000),
	"ArraryLinkHinh" Varchar(2000),
	"TinhThanh" Varchar(500) NOT NULL,
	"QuanHuyen" Varchar(500) NOT NULL,
	"PhuongXa" Varchar(500),
	"DuongPho" Varchar(1000),
	"DiaChi" Varchar(1000) NOT NULL,
	"Gia" Numeric,
	"DonViTinh" Varchar(50),
	"Map_Lat" Varchar(50),
	"Map_Long" Varchar(50),
	"MoTa" Text,
	"ArrayDichVu" Varchar(1000),
 primary key ("YeuCauBanID")
) Without Oids;


Create table "ioh_LoaiTinDang"
(
	"LoaiTinDangID" Integer NOT NULL,
	"KyHieu" Varchar(256),
	"TenGoi" Varchar(1000),
	"BieuTuong" Varchar(256),
 primary key ("LoaiTinDangID")
) Without Oids;


Create table "ioh_DonViGia"
(
	"DonViID" Integer NOT NULL,
	"TenGoi" Varchar(50),
	"LoaiDichVuID" Integer NOT NULL,
 primary key ("DonViID")
) Without Oids;


Create table "ioh_YeuCauMua_DichVu"
(
	"LoaiDichVuID" Integer NOT NULL,
	"YeuCauMuaID" Bigint NOT NULL,
 primary key ("LoaiDichVuID","YeuCauMuaID")
) Without Oids;


/* Create Foreign Keys */

Alter table "ioh_LoaiDichVu_TienIch" add  foreign key ("TienIchID") references "ioh_TienIch" ("TienIchID") on update restrict on delete restrict;

Alter table "ioh_LoaiDichVu_TienIch" add  foreign key ("LoaiDichVuID") references "ioh_LoaiDichVu" ("LoaiDichVuID") on update restrict on delete restrict;

Alter table "ioh_YeuCauBan" add  foreign key ("LoaiDichVuID") references "ioh_LoaiDichVu" ("LoaiDichVuID") on update restrict on delete restrict;

Alter table "ioh_YeuCauMua_DichVu" add  foreign key ("LoaiDichVuID") references "ioh_LoaiDichVu" ("LoaiDichVuID") on update restrict on delete restrict;

Alter table "ioh_DonViGia" add  foreign key ("LoaiDichVuID") references "ioh_LoaiDichVu" ("LoaiDichVuID") on update restrict on delete restrict;

Alter table "ioh_YeuCauMua" add  foreign key ("KhachHangID") references "ioh_KhachHang" ("KhachHangID") on update restrict on delete restrict;

Alter table "ioh_YeuCauBan" add  foreign key ("KhachHangID") references "ioh_KhachHang" ("KhachHangID") on update restrict on delete restrict;

Alter table "ioh_YeuCauMua_DichVu" add  foreign key ("YeuCauMuaID") references "ioh_YeuCauMua" ("YeuCauMuaID") on update restrict on delete restrict;


