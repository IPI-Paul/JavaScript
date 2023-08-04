drop table if exists likes;
create table likes(
  id int not null auto_increment,
  uid int,
  username varchar(100),
  posts_id int,
  `timestamp` timestamp default now(),
  primary key (id),
  foreign key (posts_id)
    references instapost (id)
);
desc likes;