

Create Database PetshopDB
GO

USE PetshopDB
GO

--drop table product

Create table product (
	id int identity(1,1) not null,
	title varchar(80) not null,
	description nvarchar(250) not null,
	primary key (id) 
)

SELECT * FROM product

insert into product values('Mouse', 'Mouse Pad', 100, 5)
insert into product values('Computador', 'Computador Philios', 1500, 3)
insert into product values('Celular', 'Samsumg S10', 7442, 15)