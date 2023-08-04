drop table if exists author;
create table author(
  _id int not null auto_increment,
  name varchar(100),
  image varchar(255),
  bio varchar(400),
  slug varchar(130),
  createdAt timestamp default now(),
  primary key (_id)
);
desc author;