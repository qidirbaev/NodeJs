CREATE TABLE SystemUser (
  Id		serial,
  Login		varchar(64) NOT NULL,
  Password	varchar(64) NOT NULL,
  FullName	varchar(255)
);

ALTER TABLE SystemUser ADD CONSTRAINT pcSystemUser PRIMARY KEY (Id);

CREATE UNIQUE INDEX akSystemUserLogin ON SystemUser (Login);

CREATE TABLE SystemGroup (
  Id		serial,
  Name		varchar(64) NOT NULL
);

ALTER TABLE SystemGroup ADD CONSTRAINT pcSystemGroup PRIMARY KEY (Id);

CREATE UNIQUE INDEX akSystemGroupName ON SystemGroup (Name);

CREATE TABLE GroupUser (
  GroupId	integer NOT NULL,
  UserId	integer NOT NULL
);

ALTER TABLE GroupUser ADD CONSTRAINT fkGroupUserId FOREIGN KEY (GroupId, UserId);
ALTER TABLE GroupUser ADD CONSTRAINT fkGroupUserGroupId FOREIGN KEY (GroupId) REFERENCES SystemGroup (Id) ON DELETE CASCADE;
ALTER TABLE GroupUser ADD CONSTRAINT fkGroupUserUserId FOREIGN KEY (UserId) REFERENCES SystemUser (Id) ON DELETE CASCADE;

CREATE TABLE Session (
  Id		serial,
  UserId	integer NOT NULL,
  Token		varchar(64) NOT NULL,
  IP		varchar(64) NOT NULL
  Data		text
);

ALTER TABLE Session ADD CONSTRAINT pkSession PRIMARY KEY (Id);

CREATE UNIQUE INDEX akSession ON Session (Token);

ALTER TABLE Session ADD CONSTRAINT fkSessionUserId FOREIGN KEY (UserId) REFERENCES Session (Id) ON DELETE CASCADE;


