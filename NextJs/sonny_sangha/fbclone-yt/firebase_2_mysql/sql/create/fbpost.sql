drop table if exists fbpost;
create table fbpost(
  id int not null auto_increment,
  name varchar(100),
  image varchar(255),
  email varchar(255),
  message varchar(400),
  postImage mediumblob
  ,`timestamp` timestamp default now()
  ,primary key (id)
);
desc fbpost;