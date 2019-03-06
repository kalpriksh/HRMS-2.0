/*to get the ID */

create procedure getRoleId @Name varchar(30)
as
begin
	declare @RoleId int 
	select @RoleId= Id from ProjectRole where Name=@Name
	return @RoleId
end
go

create procedure getLevel1Id @Name varchar(30)
as
begin
	declare @getLevel1Id int 
	select @getLevel1Id= Id from FirstLevel where Name=@Name
	return @getLevel1Id
end
go

create procedure getLevel2Id @Name varchar(30)
as
begin
	declare @getLevel2Id int 
	select @getLevel2Id= Id from SecondLevel where Name=@Name
	return @getLevel2Id
end
go


/*To create new role if not exists*/
create procedure NewRole @Role varchar(20)
as
	if not exists ( select * from ProjectRole where Name=@Role )
		begin
		insert into ProjectRole values (@Role)
	end
go
exec NewRole QA;


/*to create new level1 parameters*/
create procedure NewLv1Parameter @FirstLevel varchar(20)
as
	if not exists( select * from FirstLevel where Name=@FirstLevel)
	begin
		insert into FirstLevel values(@FirstLevel)
	end
go

exec NewLv1Parameter 'abcd'


/*to create new level 2 parameters*/
create procedure NewLv2Parameter @SecondLevel varchar(20)
as
	if not exists( select * from SecondLevel where Name=@SecondLevel)
	begin
		insert into SecondLevel values(@SecondLevel)
	end
go

exec NewLv2Parameter 'xyzzz'


/*to map given role with first level parameter if it does not already exists*/

create procedure mapRoleFirstLevel (@Role varchar(30) ,@FirstLevelName varchar(30))
as
	declare @x int; declare @y int;
	exec @x = getRoleId @Role;
	exec @y = getLevel1Id @FirstLevelName;
	if not exists ( select * from RolesFirstLevel where (RoleId=@x And FirstLevelId=@y))
	begin
		insert into RolesFirstLevel values (@x,@y)
	end		
go


exec mapRoleFirstLevel Dev, Effectiveness


/*Role--> new Lv1Parameter--> new Lv2Parameter*/
create procedure proc1 (@Role varchar(30), @FirstLevelName varchar(30),@SecondLevelName varchar(30))
as
	if not exists (select * from FirstLevel where Name=@FirstLevelName )
		begin
		insert into FirstLevel values(@FirstLevelName)
		if not exists(select * from SecondLevel where Name=@SecondLevelName)
			begin
				insert into SecondLevel values(@SecondLevelName)
				declare @x int; declare @y int; declare @z int;
				exec @x = getRoleId @Role;
				exec @y = getLevel1Id @FirstLevelName;
				exec @z = getLevel2Id @SecondLevelName;
				insert into RolesFirstLevel values (@x,@y)
				insert into FirstSecondLevel values (@y,@z)
			end
		end
go

exec proc1 'HR','Delivery','zzy'
drop procedure proc1

/*to get all the roles present in database*/
create procedure GetAllRoles
as
begin
	Select Name from ProjectRole
end
exec GetAllRoles

/*to drop all procedures*/
drop procedure GetAllRoles
drop procedure proc1
drop procedure mapRoleFirstLevel
drop procedure NewLv2Parameter
drop procedure NewLv1Parameter
drop procedure NewRole
drop procedure getRoleId
drop procedure getLevel1Id
drop procedure getLevel2Id