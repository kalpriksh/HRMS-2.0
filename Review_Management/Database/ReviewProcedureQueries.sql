/*to get all first level names for particular role*/
	create procedure RoleFirstLevelName @Role varchar(30)
	as
		select FirstLevel.Name
		from ProjectRole
		inner join RolesFirstLevel on ProjectRole.Id=RolesFirstLevel.RoleId
		inner join FirstLevel on FirstLevel.Id=RolesfirstLevel.FirstLevelId

		where ProjectRole.Name=@Role
	GO

/*to get all second level names linked with particular first level parameter*/
	create procedure RoleSecondLevelName @FirstLevelName varchar(30)
		as
		select SecondLevel.Name
		from FirstSecondLevel
		inner join FirstLevel on FirstLevel.Id=FirstSecondLevel.FirstLevelId
		inner join SecondLevel on SecondLevel.Id=FirstSecondLevel.SecondLevelId

		where FirstLevel.Name=@FirstLevelName
	go

/*to enter the reviews if not present and update the review if already present*/
	create procedure Review
		@OwnReview varchar(255),
		@OwnRating int,
		@QAReview varchar(255),
		@QARating int,
		@FirstLevel	varchar(30),
		@SecondLevel varchar(30),
		@EmployeeCode int
	as
				declare @x int;
				declare @y int;
				exec @x = getSecondLevelId @SecondLevel;
				exec @y = getFirstLevelId @FirstLevel;

		if not exists (select * from EmployeeReviews where Empcode=@EmployeeCode and FirstLevelId=@y and SecondLevelId=@x)
			begin
				insert into EmployeeReviews values (@y,@x,@OwnReview,@OwnRating,@QAReview,@QARating,@EmployeeCode)
			end
		else
			begin
				update
				EmployeeReviews
				set
				Own_Review=@OwnReview,
				Own_Rating=@OwnRating,
				QA_Review=@QAReview,
				QA_Rating=@QARating
				where
				Empcode=@EmployeeCode
				and
				FirstLevelId=@y
				and
				SecondLevelId=@x
			end
	go

create procedure GetEmployeeDetails (@Empcode int , @Project varchar(30))
as
	if exists(select * from ProjectTeamDetails where EmployeeID=@Empcode) 
	begin
		 
	end
go

	exec Review null,55,null,55,'Leadership','Problem Solving',15

/*to display the stored reviews*/
	create procedure GetReviews
		@FirstLevel varchar(30),
		@EmployeeId int
	as
		select SecondLevel.Name,Own_Review,Own_Rating,QA_Review,QA_Rating
		from EmployeeReviews
		inner join SecondLevel on SecondLevel.Id=EmployeeReviews.SecondLevelId
		inner join FirstLevel on FirstLevel.Id=EmployeeReviews.FirstLevelId
		where
		FirstLevel.Name=@FirstLevel
		and
		Empcode=@EmployeeId
	go


/*link to employee table with review table*/
Create PROCEDURE spEmployeesandRoles  @Projectid int
AS 
Begin
	SELECT ProjectTeamDetails.ProjectID,Employee.EmployeeId, Employee.FirstName, Employee.LastName,Employee.Email,
			 ProjectRole.Name,Projects.Name
	FROM (((ProjectTeamDetails
	INNER JOIN Employee ON ProjectTeamDetails.EmployeeID = Employee.EmployeeId)
	INNER JOIN ProjectRole ON ProjectTeamDetails.RoleID = ProjectRole.Id)
	Inner JOIN Projects ON ProjectTeamDetails.ProjectID=Projects.ProjectID)
	WHERE ProjectTeamDetails.ProjectID = @Projectid and ProjectTeamDetails.isPrimary=1
	Order by ProjectTeamDetails.RoleID
End
 
EXEC spEmployeesandRoles 1;
EXEC spEmployeesandRoles 3;

drop procedure spEmployeesandRoles

/*to get Name of Employee and Designation on passing Empcode and primary project name */
create procedure GetProjectId @ProjectName varchar(30)
as
	if exists(select * from Projects where Name=@ProjectName)
	begin
	declare @x int;
	select @x=ProjectId from Projects where Name=@ProjectName
	return @x
	end
go

create PROCEDURE EmployeePrimaryProject  @Empcode int,@Projectname varchar(30)
AS 
	declare @x int;
	exec @x = GetProjectId @ProjectName

Begin
	SELECT ProjectTeamDetails.ProjectID,Employee.EmployeeId, Employee.FirstName, Employee.LastName,Employee.Email,
			 ProjectRole.Name as Role,Projects.Name as ProjectName
	FROM ProjectTeamDetails
	INNER JOIN Employee ON ProjectTeamDetails.EmployeeID = Employee.EmployeeId 
	INNER JOIN ProjectRole ON ProjectTeamDetails.RoleID = ProjectRole.Id
	Inner JOIN Projects ON ProjectTeamDetails.ProjectID=Projects.ProjectID
	WHERE ProjectTeamDetails.ProjectID = @x and ProjectTeamDetails.isPrimary=1 and Employee.EmployeeId=@Empcode
	Order by ProjectTeamDetails.RoleID
End

exec EmployeePrimaryProject 5,'Paw Tree'




/*
drop procedure GetReviews
drop procedure Review
drop procedure RoleSecondLevelName
drop procedure RoleFirstLevelName

exec RoleFirstLevelName Dev
exec RoleSecondLevelName Leadership
exec Review 'workin',1,,1,3,3,15
exec Review 'null',1,'good performance',1,3,3,19

*/
