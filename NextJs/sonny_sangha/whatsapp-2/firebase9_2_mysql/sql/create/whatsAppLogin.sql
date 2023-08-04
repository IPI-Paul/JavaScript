drop table if exists whatsAppLogin;
create table whatsAppLogin(
  uid int not null auto_increment,
  name varchar(100),
  photoURL varchar(255),
  email varchar(255) unique,
  `password` varchar(40),
  `timestamp` timestamp default now(),
  primary key (uid)
);
desc whatsAppLogin;