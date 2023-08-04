drop table if exists messages;
create table messages(
  id int not null auto_increment,
  chats_id int,
  uid int, 
  message text,
  `timestamp` timestamp default now(),
  primary key (id),
  foreign key (uid)
    references whatsAppUsers (uid),
  foreign key (chats_id)
    references chats (id)
    on delete cascade
);
desc messages;