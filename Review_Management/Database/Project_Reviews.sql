	
create procedure RequiredTables
as
	create table Roles(
		Id int Primary key identity(1,1),
		Name varchar(max)
			)

	Create table FirstLevel(
		Id int Primary key identity(1,1),
		Name varchar(max)
			)

	Create table RolesFirstLevel(
		Id int Primary Key identity(1,1),
		RoleId int
		FOREIGN KEY (RoleId) REFERENCES Roles(Id),
		FirstLevelId int,
		FOREIGN KEY (FirstLevelId) REFERENCES FirstLevel(Id)
		
			)

	Create table SecondLevel(
		Id int Primary key identity(1,1),
		Name varchar(max)
			)

	create table EmployeeReviews(
		Id int Primary Key identity(1,1),
		FirstLevelId int,
		SecondLevelId int,
		Own_Review varchar(max),
		Own_Rating int,
		QA_Review varchar(max),
		QA_Rating int,
		Empcode int,
		Foreign Key(FirstLevelId) references FirstLevel(Id),
		Foreign Key(SecondLevelId) references SecondLevel(Id)

			)

		create table FirstSecondLevel(
		Id int Primary Key identity(1,1),
		FirstLevelId int,
		SecondLevelId int,
		foreign key(FirstLevelId) references FirstLevel(Id),
		foreign key(SecondLevelId) references SecondLevel(Id),
		)


	insert into Roles (Name)
	values ('HR')
	insert into Roles (Name)
	values ('Dev')
	insert into Roles (Name)
	values ('Team Lead')

	insert into FirstLevel (Name)
	values ('Development')
	insert into FirstLevel(Name)
	values ('Growth')
	insert into FirstLevel(Name)
	values ('Leadership')
	insert into FirstLevel(Name)
	values ('Effectiveness')
	insert into FirstLevel(Name)
	values ('Feedback')

	insert into SecondLevel (Name)
	values ('Technical')
	insert into SecondLevel (Name)
	values ('Team Play')
	insert into SecondLevel (Name)
	values ('Management')
	insert into SecondLevel (Name)
	values ('Problem Solving')
	insert into SecondLevel (Name)
	values ('Quality')





	insert into RolesFirstLevel (RoleId,FirstLevelId)
	values (1,1),(1,2),(1,3),(1,4),(1,5)
	insert into RolesFirstLevel (RoleId,FirstLevelId)
	values (2,1),(2,2),(2,3)
	insert into RolesFirstLevel (RoleId,FirstLevelId)
	values (3,1),(3,2),(3,3),(3,4)

	insert into FirstSecondLevel(FirstLevelId,SecondLevelId)
	values (1,Null),(2,1),(2,3),(2,4),(3,2),(3,3),(3,4),(4,1),(4,5),(5,NULL)
	
	insert into EmployeeReviews (FirstLevelId,SecondLevelId,Own_Review,Own_Rating,QA_Review,QA_Rating,Empcode)
	values (3,3,'random Review',5,'one more random review',4 ,14),
	(3,4,'Problem Solver',5,'one more Problem solverv review',4 ,14),
	(4,1,'Problem Solver',5,'one more Problem solverv review',4 ,14),
	(3,4,'Problem Solver for a differnt person',5,'one more Problem solver review fora different person',4 ,15),
	(3,3,'Problem Solver for a differnt person',5,NULL,4 ,15)
	

	
	select * from Roles
	select * from RolesFirstLevel
	select * from FirstLevel
	select * from SecondLevel
	select * from FirstSecondLevel
	select * from EmployeeReviews
	select * from FirstSecondLevel
go

	drop table Roles
	drop table RolesFirstLevel
	drop table FirstLevel
	drop table SecondLevel
	drop table FirstSecondLevel
	drop table EmployeeReviews


	
	drop procedure RequiredTables
	
	
	select * from EmployeeReviews where Empcode=14;

	