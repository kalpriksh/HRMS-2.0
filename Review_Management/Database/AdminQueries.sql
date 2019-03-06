/*to get roles Id */
create procedure getRolesId
	@Name varchar(30)
as
	begin
		declare @myId int

		select @myId=Id
		from ProjectRole
		where Name=@Name

		return @myId
	end

go
select * from ProjectRole


drop procedure getRolesId

/*to get first level Id*/
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


/*to get second level Id*/
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

/*creates new role if absent, creates new level if absent, maps role id and lv1 id to RolesFirstLevel table*/
create Procedure CreateTillFirstLevel
	@Role varchar(30),
	@FirstLevelName varchar(30)
as
				if not exists (select Id from ProjectRole where Name=@Role)
				begin
				insert into ProjectRole (Name) values (@Role)
				end

				if not exists (select Id from FirstLevel where Name=@FirstLevelName)
				begin
				insert into FirstLevel (Name) values (@FirstLevelName)
				end

				declare @x int;
				declare @y int;
				exec @x = getRolesId @Role;
				exec @y = getFirstLevelId @FirstLevelName;
				if not exists (select Id from RolesFirstLevel where RoleId=@x and FirstLevelId=@y)
				begin
				insert into RolesFirstLevel (RoleId,FirstLevelId)
				values (@x,@y)
				end
go

drop procedure CreateTillFirstLevel
exec CreateTillFirstLevel 'Pres','Delivery'

/*to create entries till second level and then map lv1 and lv2 in FirstSecondLevel table */
create procedure CreateTillSecondLevel
	@Role varchar(30),
	@FirstLevelName varchar(30),
	@SecondLevelName varchar(30)

as
				if not exists (select Id from ProjectRole where Name=@Role)
				begin
				insert into ProjectRole (Name) values (@Role)
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
				exec @z = getSecondLevelId @SecondLevelName;
				if not exists (select Id from RolesFirstLevel where RoleId=@x and FirstLevelId=@y)
				begin
				insert into RolesFirstLevel (RoleId,FirstLevelId)
				values (@x,@y)
				end
				if not exists (select Id from FirstSecondLevel where SecondLevelId=@z and FirstLevelId=@y)
				begin
				insert into FirstSecondLevel(FirstLevelId,SecondLevelId)
				values (@y,@z)
				end
go

drop procedure CreateTillSecondLevel
exec CreateTillSecondLevel 'Cat','sound','purr'


/*to add parameters for roles*/
create procedure AddParameter
	@Role varchar(30),
	@FirstLevelName varchar(30),
	@SecondLevelName varchar(30)
as

	if(@FirstLevelName is NULL and @SecondLevelName is NULL)
		begin
		if not exists (select Id from ProjectRole where Name=@Role)
			begin
			insert into ProjectRole (Name) values (@Role)
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

exec AddParameter comeon,this,works
drop procedure AddParameter

declare @id int;
exec @id = getRolesId 'Dev'
select @id
