/*to create the required tables, insert dummy data to them and display them*/
create procedure RequiredTables
as
	Create table FirstLevel(
		Id int Primary key identity(1,1),
		Name varchar(max)
			)

	Create table RolesFirstLevel(
		Id int Primary Key identity(1,1),
		RoleId int
		FOREIGN KEY (RoleId) REFERENCES ProjectRole(Id),
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
		Foreign Key(SecondLevelId) references SecondLevel(Id),
		Foreign Key(Empcode) references Employee(EmployeeId)
			)

		create table FirstSecondLevel(
		Id int Primary Key identity(1,1),
		FirstLevelId int,
		SecondLevelId int,
		foreign key(FirstLevelId) references FirstLevel(Id),
		foreign key(SecondLevelId) references SecondLevel(Id),
		)


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

	insert into FirstSecondLevel(FirstLevelId,SecondLevelId)
	values (1,Null),(2,1),(2,3),(2,4),(3,2),(3,3),(3,4),(4,1),(4,5),(5,NULL)

	insert into EmployeeReviews (FirstLevelId,SecondLevelId,Own_Review,Own_Rating,QA_Review,QA_Rating,Empcode)
	values (3,3,'random Review',5,'one more random review',4 ,1),
	(3,4,'Problem Solver',5,'one more Problem solverv review',4 ,1),
	(4,1,'Problem Solver',5,'one more Problem solverv review',4 ,1),
	(3,4,'Problem Solver for a differnt person',5,'one more Problem solver review fora different person',4 ,2),
	(3,3,'Problem Solver for a differnt person',5,NULL,4 ,2)
go

/*to display all the tables*/
create procedure DisplayTableEntries
as
begin
	select * from ProjectRole
	select * from FirstLevel
	select * from SecondLevel
	select * from RolesFirstLevel
	select * from FirstSecondLevel
	select * from EmployeeReviews
	select * from Employee
	select * from Projects
	select * from ProjectTeamDetails
end
go


/*
	
	drop procedure RequiredTables
	drop procedure DisplayTableEntries

*/
