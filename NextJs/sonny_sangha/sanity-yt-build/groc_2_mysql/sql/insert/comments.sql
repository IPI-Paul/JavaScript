insert into comment(
  post_ref,
  name,
  email,
  comment,
  approved,
  slug
)
with cte as (
  select
    null as post_ref, 
    null as name, 
    null as email, 
    null as comment,
    null as approved
  union all
  values
  (1, 'John Appleseed', 'john@appleseed.com', 'Will probably change this', true)
)
select 
  post_ref, 
  name, 
  email, 
  comment, 
  approved,
  replace(lower(name), ' ', '-') as slug
from cte
where name is not null
;
