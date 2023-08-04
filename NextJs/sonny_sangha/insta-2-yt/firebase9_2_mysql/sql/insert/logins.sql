insert into instalogin (email, password, name, image) 
with cte as (
  select 
    null as email,
    null as `password`,
    null as name,
    null as image
  union all
  values
  ('sonnysangha@gmail.com', 'papaFam', 'Sonny Sangha', 'http://localhost:8080/CSS/david_gray/tailwind/lesson02/build/images/rocketdab.png')
)
select 
  email,
  SHA1(password) as `password`,
  name,
  image
from cte
where email is not null;