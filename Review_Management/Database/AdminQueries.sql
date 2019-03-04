/*for admin */

create procedure AddParameter @Role varchar(30),@FirstLevelName varchar(30),@SecondLevelName varchar(30)
	as
	if not null


create procedure CreateRole @Role varchar(30)
	as
	if not exists (select Id from Roles where Name=@Role)
		begin
		insert into Roles (Name) values (@Role)
		end
	go

create procedure 

create procedure AddParameter
	@Role varchar(30),
	@FirstLevelName varchar(30),
	@SecondLevelName varchar(30)
as	
	
	if(@FirstLevelName is NULL and @SecondLevelName is NULL)
		begin
		if not exists (select Id from Roles where Name=@Role)
			begin
			insert into Roles (Name) values (@Role)
			end
		end
	else
		begin
			if(@SecondLevelName is NULL)
			begin
				exec CreateTillFirstLevel @Role,@FirstLevelName
			end
			else
				begin
				exec CreateTillSecondLevel @Role,@FirstLevelName,@SecondLevelName
				end
			end
go



declare @id int;
exec @id = getRolesId 'Dev'
select @id

create procedure getRolesId
	@Name varchar(30)
as
	begin
		declare @myId int
		 
		select @myId=id
		from Roles
		where Name=@Name

		return @myId
	end 
	
go

create procedure getFirstLevelId
	@Name varchar(30)
as
	begin
		declare @myId int
		 
		select @myId=id
		from FirstLevel
		where Name=@Name

		return @myId
	end 
	
go

create procedure getSecondLevelId
	@Name varchar(30)
as
	begin
		declare @myId int
		 
		select @myId=id
		from SecondLevel
		where Name=@Name

		return @myId
	end 
	
go

create procedure CreateTillSecondLevel
	@Role varchar(30),
	@FirstLevelName varchar(30),
	@SecondLevelName varchar(30)

as
				if not exists (select Id from Roles where Name=@Role)
				begin
				insert into Roles (Name) values (@Roles)
				end
				
				if not exists (select Id from FirstLevel where Name=@FirstLevelName)
				begin
				insert into FirstLevel (Name) values (@FirstLevelName)
				end

				if not exists (select Id from SecondLevel where Name=@SecondLevelName)
				begin
				insert into SecondLevel (Name) values (@SecondLevelName)
				end

				declare @x int;
				declare @y int;
				declare @z int;
				exec @x = getRolesId @Role; 
				exec @y = getFirstLevelId @FirstLevelName;
				exec @y = getFirstLevelId @SecondLevelName;
				insert into RolesFirstLevel (RoleId,FirstLevelId)
				values (@x,@y)
				insert into FirstSecondLevel (FirstLevelId,SecondLevelId)
				values (@y,@z)
go

drop procedure CreateTillSecondLevel
exec AddParameter 'Intern','Skills','Java'



create Procedure CreateTillFirstLevel
	@Role varchar(30),
	@FirstLevelName varchar(30)
as
				if not exists (select Id from Roles where Name=@Role)
				begin
				insert into Roles (Name) values (@Role)
				end
				
				if not exists (select Id from FirstLevel where Name=@FirstLevelName)
				begin
				insert into FirstLevel (Name) values (@FirstLevelName)
				end

				declare @x int;
				declare @y int;
				exec @x = getRolesId @Role; 
				exec @y = getFirstLevelId @FirstLevelName;
				insert into RolesFirstLevel (RoleId,FirstLevelId)
				values (@x,@y)
go

drop procedure CreateTillFirstLevel
exec CreateTillFirstLevel 'Pres','Delivery'