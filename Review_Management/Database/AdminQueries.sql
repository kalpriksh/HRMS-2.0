/*to get the ID */

create procedure getRoleId @Name varchar(30)
as
begin
	declare @RoleId int 
	select @RoleId= Id from Roles where Name=@Name
	return @RoleId
end
create procedure getLevel1Id @Name varchar(30)
as
begin
	declare @getLevel1Id int 
	select @getLevel1Id= Id from FirstLevel where Name=@Name
	return @getLevel1Id
end
create procedure getLevel2Id @Name varchar(30)
as
begin
	declare @getLevel2Id int 
	select @getLevel2Id= Id from SecondLevel where Name=@Name
	return @getLevel2Id
end


/*To create new role if not exists*/
create procedure NewRole @Role varchar(20)
as
	if not exists ( select * from Roles where Name=@Role )
		begin
		insert into Roles values (@Role)
	end
go
exec NewRole QA;



/*to create and map new first level with old Role if not exists*/

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

drop procedure mapRoleFirstLevel
exec mapRoleFirstLevel Dev, Effectiveness



/*old role-- new p1--new p2*/
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

exec proc1 'HR','blaa','zzy'
drop procedure proc1



/*role--old parameter mapping in RolesFirstLevel*/
create procedure proc2 (@Role varchar(20),@FirstLevelName varchar(20))
as
	declare @x int; declare @y int; declare @z int;
	exec @x = getRoleId @Role;
	exec @y = getLevel1Id @FirstLevelName;
	if not exists (select * from RolesFirstLevel where RoleId=@x and FirstLevelId=@y )
begin
	insert into RolesFirstLevel(RoleId,FirstLevelId) values(@x,@y)
end 

exec proc2 
drop procedure proc2 
q
