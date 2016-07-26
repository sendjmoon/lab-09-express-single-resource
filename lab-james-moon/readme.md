# Express - Single Resource API
##Description
This creates a server to handle HTTP requests. It uses an api to allow the user to create a new hero based on three parameters: `name`, `race`, and `faction` (Definitely related to World of Warcraft).

##Installation
First, clone down the repo.
Next, do `npm install` for dependencies.
Then, `node server` (`nodemon` can also be used).

##Usage
To create a new hero, access `/api/hero`. for example, an accepted format with HTTPie would be `http POST :3000/api/hero?'name=james&race=human&faction=alliance'`. This will instantiate a new hero object with their information which is stored in an object containing all heroes.

To GET an existing hero, get their unique id which is provided upon a hero's creation. This can be accessed using `http :3000/api/hero/unique_id`.

To use a PUT request to update info, you can follow this format. `http PUT :3000/api/hero?'id=unique_id&property=new_variable'`

To do a DELETE request, you can type `http DELETE :3000/api/hero/unique_id`
