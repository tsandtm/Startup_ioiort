/*
Created		20-Oct-16
Modified		08-Dec-16
Project		
Model			
Company		
Author		
Version		
Database		PostgreSQL 8.1 
*/


/* Create Tables */


/*
chuong tv chinh sua o day
chuong tv chinh sua o day
chuong tv chinh sua o day
*/

Create table "Log"
(
	"IDLog" Serial NOT NULL,
	"NgayTao" Timestamp,
	"TextLog" Text,
	"Platforfrfrm" Varchar(250),
	"UngDung" Varchar(250),
	"TieuDeLog" Varchar(250),
 primary key ("IDLog")
) Without Oids;




