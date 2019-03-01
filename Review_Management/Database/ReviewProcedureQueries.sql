create procedure RoleFirstLevelName @Role varchar(30)
	as
	select FirstLevel.Name
	from Roles
	inner join RolesFirstLevel on Roles.Id=RolesFirstLevel.RoleId
	inner join FirstLevel on FirstLevel.Id=RolesfirstLevel.FirstLevelId

	where Roles.Name=@Role
	GO
	
	drop procedure RoleFirstLevelName
	EXEC RoleFirstLevelName Dev;


	
create procedure RoleSecondLevelName @FirstLevelName varchar(30)
	as
	select SecondLevel.Name,FirstLevel.Name
	from FirstSecondLevel
	inner join FirstLevel on FirstLevel.Id=FirstSecondLevel.FirstLevelId
	inner join SecondLevel on SecondLevel.Id=FirstSecondLevel.SecondLevelId

	where FirstLevel.Name=@FirstLevelName
	go

	drop procedure RoleSecondLevelName

	exec RoleSecondLevelName Growth;



create procedure GetReviews
	@FirstLevelName varchar(30),
	@SecondLevelName varchar(30),
	@employeeId int
	as
	select
	FirstLevel.Name as FirstLeveName,
	SecondLevel.Name as SecondLevelName,
	EmployeeReviews.Own_Review,
	EmployeeReviews.Own_Rating,
	EmployeeReviews.QA_Review,
	EmployeeReviews.QA_Rating

	from EmployeeReviews
	inner join FirstLevel on FirstLevel.Id=EmployeeReviews.FirstLevelId
	inner join SecondLevel on SecondLevel.Id=EmployeeReviews.SecondLevelId

	where FirstLevel.Name=@FirstLevelName
	go

	drop procedure GetReviews

	exec GetReviews Growth;


create procedure UpdateOwnReviewRating
	@newReview varchar(255),
	@newRating int,
	@FirstLevel int,
	@SecondLevel int,
	@employeeId int
as
	update
	EmployeeReviews
	set
	Own_Review=@newReview,
	Own_Rating=@newRating
	where
	Empcode=@employeeId
	and
	FirstLevelId=@FirstLevel
	and
	SecondLevelId=@SecondLevel
go
	drop procedure UpdateReviewRating
	
	exec UpdateOwnReviewRating 'a change',99,3,3,15

	
create procedure UpdateQAReviewRating
	@newReview varchar(255),
	@newRating int,
	@FirstLevel int,
	@SecondLevel int,
	@employeeId int
as
	update
	EmployeeReviews
	set
	QA_Review=@newReview,
	QA_Rating=@newRating
	where
	Empcode=@employeeId
	and
	FirstLevelId=@FirstLevel
	and
	SecondLevelId=@SecondLevel
go
	drop procedure UpdateReviewRating
	
	exec UpdateQAReviewRating 'a different change',99,3,3,15


	
create procedure getEmployeeReview
	@EmployeeCode int
as
	select 
	FirstLevel.Name as FirstLevel,
	SecondLevel.Name as SecondLevel,
	EmployeeReviews.Own_Review,
	EmployeeReviews.Own_Rating,
	EmployeeReviews.QA_Review,
	EmployeeReviews.QA_Rating
	from EmployeeReviews
	inner join FirstLevel on FirstLevel.Id=EmployeeReviews.FirstLevelId
	inner join SecondLevel on SecondLevel.Id=EmployeeReviews.SecondLevelId
	where Empcode=@EmployeeCode
	GO
	drop procedure getEmployeeReview
	
	exec getEmployeeReview 15
	




	-------------------------------------------------------
	
	/*create procedure updateEmployeeReview
	 @EmployeeCode varchar(30),@FirstLevel int,@SecondLevel int
	 as

	insert into EmployeeReviews (FirstLevelId,SecondLevelId,Own_Review,Own_Rating,QA_Review,QA_Rating,Empcode)
	values (@FirstLevel,@SecondLevel,null,null,null,null,@EmployeeCode)

	GO

	drop procedure updateEmployeeReview

	
	exec createEmployeeReview CYG016,3,3*/

	-------------------------------------------------------------
	 
create procedure createEmployeeReview
	 @FirstLevel int,
	 @SecondLevel int,
	 @SelfReview varchar(255),
	 @SelfRating int,
	 @QAReview varchar(255),
	 @QARating int,
	 @EmployeeCode varchar(30)
as
	 insert into EmployeeReviews (FirstLevelId,SecondLevelId,Own_Review,Own_Rating,QA_Review,QA_Rating,Empcode)
	 values (@FirstLevel,@SecondLevel,@SelfReview,@SelfRating,@QAReview,@QARating,@EmployeeCode)

	 GO

	drop procedure createEmployeeReview
	
	exec createEmployeeReview


	
	create procedure masterProcedure @Role varchar(30)
	as 
	
	

	
	
	
	GO
	
	
	exec getRoleId HR

	drop procedure getRoleId

	if not exists (select * from EmployeeReviews where Empcode=15 and FirstLevelId=4 and SecondLevelId=1)
		begin
		insert into EmployeeReviews values (4,1,null,1,null,1,15)
		end

create procedure Review
	@OwnReview varchar(255),
	@OwnRating int,
	@QAReview varchar(255),
	@QARating int,
	@FirstLevel	int,
	@SecondLevel int,
	@EmployeeCode int
as
	if not exists (select * from EmployeeReviews where Empcode=@EmployeeCode and FirstLevelId=@FirstLevel and SecondLevelId=@SecondLevel)
		begin
			insert into EmployeeReviews values (@FirstLevel,@SecondLevel,@OwnReview,@OwnRating,@QAReview,@QARating,@EmployeeCode)
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
			FirstLevelId=@FirstLevel
			and
			SecondLevelId=@SecondLevel
		end
go

drop procedure Review
exec Review 'workin',1,'workin',1,3,3,15
exec Review 'null',1,'good performance',1,3,3,19