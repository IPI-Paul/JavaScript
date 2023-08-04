insert into whatsAppLogin (email, password, name, photoURL) 
with cte as (
  select 
    null as email,
    null as `password`,
    null as name,
    null as photoURL
  union all
  values
  ('sonnySangha@gmail.com', 'papaFam', 'Sonny Sangha', 'http://localhost:8080/CSS/david_gray/tailwind/lesson02/build/images/rocketdab.png'),
  ('paul@cool.com', 'DaOne', 'Paul Dude', 'http://localhost:8080/CSS/david_gray/tailwind/lesson02/build/images/rocketman.png'),
  ('gorge@ous.com', 'loveIT', 'Sexy Seniorita', 'http://localhost:8080/CSS/david_gray/tailwind/lesson02/build/images/rocketlaunch.png')
)
select 
  email,
  SHA1(password) as `password`,
  name,
  photoURL
from cte
where email is not null;