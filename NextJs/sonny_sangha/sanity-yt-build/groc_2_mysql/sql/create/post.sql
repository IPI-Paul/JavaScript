drop table if exists post;
create table post(
  _id int not null auto_increment,
  title varchar(100),
  description varchar(255),
  slug varchar(150),
  author_id int,
  mainImage varchar(255),
  categories_id int,
  publishedAt timestamp default now(),
  body text,
  primary key (_id),
  foreign key (author_id)
    references author (_id),
  foreign key (categories_id)
    references categories (_id)
);
desc post;