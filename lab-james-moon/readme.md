# Express - Single Resource API
##Description
This creates a server to handle HTTP requests. It uses an api to allow the user to create a new hero based on three parameters: `name`, `race`, and `faction` (Definitely related to World of Warcraft).

##Installation
First, clone down the repo.
Next, do `npm install` for dependencies.
Then, `node server` (`nodemon` can also be used).

##Usage
Commands will be written using `HTTPie`
GET an existing hero
`http :3000/api/hero/unique_id` where `unique_id` is the unique id issued through UUID.

POST a new hero.
`http POST :3000/api/hero name=name_value race=race_value faction=faction_value`

Update info in an existing hero via PUT. Can be updated simultaneously or all at the same time.
`http PUT :3000/api/hero/unique_id name=new_name race=new_race faction=new_faction`

DELETE a hero
`http DELETE :3000/api/hero/unique_id`
