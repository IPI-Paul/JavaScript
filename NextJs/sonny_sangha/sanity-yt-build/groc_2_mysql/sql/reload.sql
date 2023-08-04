drop table if exists post; 
drop table if exists comment; 
drop table if exists categories; 
drop table if exists author;
source ./create/author.sql; 
source ./create/categories.sql;
source ./create/post.sql;
source ./create/comment.sql;
source ./insert/authors.sql; 
source ./insert/categories.sql;
source ./insert/posts.sql;
source ./insert/comments.sql;