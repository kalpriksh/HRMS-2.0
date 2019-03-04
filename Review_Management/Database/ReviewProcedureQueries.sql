	create procedure RoleFirstLevelName @Role varchar(30)
		as
		select FirstLevel.Name
		from Roles
		inner join RolesFirstLevel on Roles.Id=RolesFirstLevel.RoleId
		inner join FirstLevel on FirstLevel.Id=RolesfirstLevel.FirstLevelId

		where Roles.Name=@Role
	GO

	create procedure RoleSecondLevelName @FirstLevelName varchar(30)
		as
		select Secon	dLevel.Name
		from FirstSecondLevel
		inner join FirstLevel on FirstLevel.Id=FirstSecondLevel.FirstLevelId
		inner join SecondLevel on SecondLevel.Id=FirstSecondLevel.SecondLevelId

		where FirstLevel.Name=@FirstLevelName
	go

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




drop procedure GetReviews
drop procedure Review
drop procedure RoleSecondLevelName
drop procedure RoleFirstLevelName

exec RoleFirstLevelName Dev
exec RoleSecondLevelName Leadership
exec Review 'workin',1,'workin',1,3,3,15
exec Review 'null',1,'good performance',1,3,3,19
