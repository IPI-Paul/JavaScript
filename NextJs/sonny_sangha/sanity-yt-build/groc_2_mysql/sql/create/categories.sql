drop table if exists categories;
create table categories(
  _id int not null auto_increment,
  category varchar(100),
  slug varchar(130),
  primary key (_id)
);
desc categories;