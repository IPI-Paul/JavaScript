drop table if exists meetups;
create table meetups(
  id int not null auto_increment,
  title varchar(100),
  image varchar(255),
  address varchar(400),
  description varchar(400)
  ,created_at timestamp default now()
  ,primary key (id)
);
desc meetups;