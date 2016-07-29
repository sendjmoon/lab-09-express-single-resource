# Express - Single Resource API
##Description
This creates a server to route and handle HTTP requests. It uses an api to allow the user to create a new hero based on three parameters: `name`, `race`, and `faction` (Definitely related to World of Warcraft). The hero template is built with an object constructor and another object is used for storage as well. The server handles errors given certain conditions and will return errors found during the request-response cycle.

## Installation
First, clone down the repo.
Next, do `npm install` for dependencies.
Then, you may `node server`, `nodemon server`, or `npm start`

## Usage
Commands will be written (not restricted to) using `HTTPie`
GET an existing hero
`http :3000/api/hero/unique_id` where `unique_id` is the unique id issued through UUID.

POST a new hero.
`http POST :3000/api/hero name=name_value race=race_value faction=faction_value`

Update info in an existing hero via PUT. Properties can be updated simultaneously or at the same time.
`http PUT :3000/api/hero/unique_id name=new_name race=new_race faction=new_faction`

DELETE a hero
`http DELETE :3000/api/hero/unique_id`

## Testing
Gulp runs custom tasks that check for linter errors. It also uses mocha to check and make sure individual components are working as they should. To test,
