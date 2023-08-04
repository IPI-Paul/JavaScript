drop table if exists chats;
create table chats(
  id int not null auto_increment,
  users varchar(100),
  primary key (id)
);
desc chats;