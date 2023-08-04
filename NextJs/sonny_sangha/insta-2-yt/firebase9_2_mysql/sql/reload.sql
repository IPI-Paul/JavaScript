drop table if exists comments; 
drop table if exists likes; 
drop table if exists instalogin; 
drop table if exists instapost; 
source ./create/instalogin.sql;
source ./create/instapost.sql;
source ./create/comments.sql;
source ./create/likes.sql;
source ./insert/logins.sql;
