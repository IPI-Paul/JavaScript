insert into post(title, description, slug, author_id, mainImage, categories_id, body)
with cte as (
  select
    null as title, 
    null as description, 
    null as author_id, 
    null as mainImage, 
    null as categories_id, 
    null as body
  union all
  values
  ("My First POST", "This is the 1st EVER post on the YT build", 1, 'http://localhost:8080/CSS/david_gray/tailwind/lesson02/build/images/rocketdab.png', 1, '<div><div><h1>What is Lorem Ipsum?</h1><p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard <em>{"_type": "span", "className": "text-blue-500", "children": "dummy text ever since the 1500s"}</em>, when an unknown printer took a gallery of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Lettraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p></div><div><h1>Why do we use it?</h1><p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letter, as opposed to using "Content here, content here", making it look like readable English. Many Desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. Various versions have evolved ove the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p><em>{"_type": "img", "src": "http://localhost:8080/JavaScript/React/bob_ziroll/scrimba/my-app/public/images/Sport-06.jpg"}</em></div></div>'),
  ("My Second POST", "Another post which is cool!", 2, 'http://localhost:8080/CSS/david_gray/tailwind/lesson02/build/images/rocketlaunch.png', 3, '<h1>I just bought a TESLA</h1><span><br>to celebrate 100,000 subs!!!!</span>')
)
select 
  title, 
  description, 
  replace(lower(title), ' ', '-') as slug, 
  author_id, 
  mainImage, 
  categories_id, 
  body
from cte
where title is not null
;
