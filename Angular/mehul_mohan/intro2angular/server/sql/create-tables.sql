drop table if exists intro2angular_users;
create table intro2angular_users(
  username varchar(100) primary key,
  password varchar(15),
  quote varchar(100) default 'You have no quote',
  registered_at timestamp default now()
);
desc intro2angular_users;