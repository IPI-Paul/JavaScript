drop table if exists whatsAppUsers;
create table whatsAppUsers(
  id int not null auto_increment,
  uid int unique,
  lastSeen timestamp default now(),
  foreign key (uid)
    references whatsAppLogin (uid)
    on delete cascade,
  primary key (id)
);
desc whatsAppUsers;