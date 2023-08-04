insert into author(name, slug, image, bio) 
with cte as (
  select 
    null as name, 
    null as image, 
    null as bio
  union all
  values
  ('Sonny Sangha', 'http://localhost:8080/JavaScript/React/replit_not/team_member_allocation/src/assets/images/maleProfile.jpg', 'Young Dude Tutor'),
  ('Elon Musk', 'http://localhost:8080/JavaScript/React/replit_not/team_member_allocation/src/assets/images/maleProfile.jpg', 'Dodgy Twitter Bloke')
)
select 
  name, 
  replace(lower(name), ' ', '-') as slug, 
  image, 
  bio
from cte
where name is not null;