drop table if exists comment;
create table comment(
  _id int not null auto_increment,
  post_ref int,
  name varchar(100),
  email varchar(255),
  comment varchar(700),
  approved boolean, 
  slug varchar(130),
  createdAt timestamp default now(),
  primary key (_id),
  foreign key (post_ref)
    references post (_id)
);
desc comment;