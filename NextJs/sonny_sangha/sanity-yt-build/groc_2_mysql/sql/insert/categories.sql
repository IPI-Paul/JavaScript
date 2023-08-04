insert into categories (category, slug) 
with cte as (
  select 
    null as category
  union all
  values
  ('Tutor'),
  ('Student'),
  ('Entrepreneur')
)
select 
  category,
  replace(lower(category), ' ', '-') as slug
from cte
where category is not null;