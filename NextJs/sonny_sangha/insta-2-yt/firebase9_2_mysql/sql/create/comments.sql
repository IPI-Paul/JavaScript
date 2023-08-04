drop table if exists comments;
create table comments(
  id int not null auto_increment,
  comment varchar(255),
  username varchar(100),
  userImage varchar(255),
  posts_id int,
  `timestamp` timestamp default now(),
  primary key (id),
  foreign key (posts_id)
    references instapost (id)
);
desc comments;