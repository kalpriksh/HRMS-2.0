
/*Employee Table Data*/
create table Employee(
	EmployeeId int identity(1,1) primary key,
	FirstName varchar(50),
	LastName varchar(50),
	Designation varchar(50),
	Email varchar(50),
	[Location] varchar(50),
	DateOfJoining date,
	DateOfBirth date,
	PastExperience int,
	Department varchar(50),
	[Status] varchar(10),
	ProfilePicUrl varchar(255)
)

insert into Employee (FirstName,LastName, Designation, Email, Location, DateOfJoining, DateOfBirth, PastExperience, Department, [status], ProfilePicUrl)
		values('Deepak', 'Pahuja', 'Intern', 'deepak.pahuja@cygrp.com', 'Noida' , '2019-01-07', '1996-12-19', 1, 'Technical', 'Active', 'url')
insert into Employee (FirstName,LastName, Designation, Email, Location, DateOfJoining, DateOfBirth, PastExperience, Department, [status], ProfilePicUrl)
		values('Vidit', 'Mathur', 'Intern', 'vidit.mathur@cygrp.com', 'Noida' , '2019-01-07', '1997-10-11', 1, 'Technical', 'Active', 'url')
insert into Employee (FirstName,LastName, Designation, Email, Location, DateOfJoining, DateOfBirth, PastExperience, Department, [status], ProfilePicUrl)
		values('Gaurav', 'Singh', 'Intern', 'gaurav.singh@cygrp.com', 'Noida' , '2019-01-07', '1996-04-25', 1, 'Technical', 'Active', 'url')
insert into Employee (FirstName,LastName, Designation, Email, Location, DateOfJoining, DateOfBirth, PastExperience, Department, [status], ProfilePicUrl)
		values('Srishty', 'rawat', 'Intern', 'srishty.rawat@cygrp.com', 'Noida' , '2019-01-07', '1996-10-30', 1, 'Technical', 'Active', 'url')
insert into Employee (FirstName,LastName, Designation, Email, Location, DateOfJoining, DateOfBirth, PastExperience, Department, [status], ProfilePicUrl)
		values('Om', 'Prakash', 'Intern', 'ompraksah@cygrp.com', 'Noida' , '2019-01-07', '1995-02-05', 1, 'Technical', 'Active', 'url')


/*Projects Table Data*/
create table ProjectRole(Id int primary key identity(1,1), Name Varchar(50));
insert into ProjectRole values ('ProjectOwner');
insert into ProjectRole values ('CM');
insert into ProjectRole values ('Developers');

drop table ProjectRole

create table Projects(
	ProjectID int primary key identity(1,1),
	 Name Varchar(100),
	 Tenure int,
	 Client Varchar(100),
	 Description Varchar(max),
	 IsFinished bit,
	 Progress int,
	 DateAssigned date,
	 isPipeline bit
 );

insert into Projects
values('Paw Tree',
		2,
		'Roger Morgan',
		'You don�t like to eat the same food every day, and neither does your pet.PawTree a pet nutrition company,
		 has debuted a first-of-its-kind product in the marketplace with its pawPairings Superfood Seasoning. Designed
		 to add flavor variety and boost nutrition at meal time, pawTree created a line of seven superfood seasoning
		 medleys for dogs and cats.',
		 0,
		 65,
		'2018-07-26',
		0);
insert into Projects
values('Stage Stores',
		5,
		'Michael L Glazer',
		'Stage Stores is a department store company specializing in retailing brand name apparel, accessories,
		 cosmetics, footwear, and housewares throughout the United States.',
		0,
		55,
		'2017-08-02',
		0);
insert into Projects
values('Just Energy',
		10,
		'Jim Brown',
		'Just Energy Group Inc. is a Canadian-based natural gas and electricity retailer operating in Canadian
		and American markets across North America, and in Germany, Ireland, Japan, and the United Kingdom.',
		1,
		100,
		'2009-08-02',
		0);
		insert into Projects
values('Google',
		5,
		'Sundar Pichai',
		'Google LLC is an American multinational technology company that specializes in Internet-related services and products, which
		 include online advertising technologies, search engine, cloud computing, software, and hardware.
		 It is considered one of the Big Four technology companies, alongside Amazon, Apple and Facebook.',
		0,
		0,
		'2020-02-20',
		1);


create table ProjectTeamDetails(
	SNo int identity(1,1) primary key,
	ProjectID int  references Projects(ProjectID),
	EmployeeID int references Employee(EmployeeId),
	RoleID int  references ProjectRole(Id),
	isPrimary int
)

insert into ProjectTeamDetails
values(
	1,
	2,
	3,
	1
)
insert into ProjectTeamDetails
values(
	1,
	1,
	3,
	0
)
insert into ProjectTeamDetails
values(
	1,
	3,
	2,
	0
)
insert into ProjectTeamDetails
values(
	1,
	4,
	3,
	1
)
insert into ProjectTeamDetails
values(
	1,
	5,
	1,
	1
)

insert into ProjectTeamDetails
values(
	2,
	5,
	3,
	0
)
insert into ProjectTeamDetails
values(
	2,
	3,
	1,
	1
)
insert into ProjectTeamDetails
values(
	2,
	1,
	3,
	1
)
insert into ProjectTeamDetails
values(
	4,
	5,
	5,
	1
)

DisplayTableEntries


exec GetAllEmployeeByProjectName 'Google'
/*
drop table Employee
drop table EmployeeReviews
drop table FirstSecondLevel
drop table RolesFirstLevel
drop table FirstLevel
drop table SecondLevel
drop table Projects
drop table ProjectTeamDetails
drop table ProjectRole

*/
