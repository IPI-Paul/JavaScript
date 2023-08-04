drop table if exists instapost;
create table instapost(
  id int not null auto_increment,
  username varchar(100),
  profile varchar(255),
  caption varchar(255),
  image mediumblob
  ,`timestamp` timestamp default now()
  ,primary key (id)
);
desc instapost;