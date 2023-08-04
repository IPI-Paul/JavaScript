drop table if exists instalogin;
create table instalogin(
  id int not null auto_increment,
  name varchar(100),
  image varchar(255),
  email varchar(255) unique,
  `password` varchar(40),
  `timestamp` timestamp default now(),
  primary key (id)
);
desc instalogin;