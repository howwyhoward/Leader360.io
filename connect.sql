CREATE DATABASE ak_leadership360

USE ak_leadership360
GO

CREATE TABLE tblUSER
(
    UserID INT IDENTITY(1,1) primary key,
    UserFname varchar(30) not null,
    UserLname varchar(30) not null,
    UserEmail varchar(50) not null,
    UserPhoneNumber varchar(20) not null
)
GO

-- table will not have foreign keys

GO
CREATE PROCEDURE ak_INSERT_USERS
@Fname varchar(30),
@Lname varchar(30),
@Email varchar(50),
@Phone varchar(20)

AS
BEGIN TRANSACTION T1
INSERT INTO tblUSER (UserFname, UserLname, UserEmail, UserPhoneNumber)
VALUES (@Fname, @Lname, @Email, @Phone)
IF @@ERROR <> 0
    BEGIN
        PRINT('ROLL BACK')
        ROLLBACK TRANSACTION T1
    END
COMMIT TRANSACTION T1
GO

-- MOCK DATA
EXEC ak_INSERT_USERS
@Fname = 'Arnav',
@Lname = 'Khare',
@Email = 'arney.chillarney@gmail.com',
@Phone = '4252367685'

EXEC ak_INSERT_USERS
@Fname = 'Ali',
@Lname = 'Chawro',
@Email = 'achawro9@gmail.com',
@Phone = '4254481587'

EXEC ak_INSERT_USERS
@Fname = 'Howard',
@Lname = 'Wang',
@Email = 'howardw1120@gmail.com',
@Phone = '4253517712'

EXEC ak_INSERT_USERS
@Fname = 'Santosh',
@Lname = 'Khare',
@Email = 'santosh@golsinc.com',
@Phone = '4254926980'

EXEC ak_INSERT_USERS
@Fname = 'Atul',
@Lname = 'Khare',
@Email = 'akhare@gmail.com',
@Phone = '4254436066'

SELECT *
FROM tblUSER