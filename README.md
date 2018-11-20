<!-- https://www.youtube.com/watch?v=E_eMhH1M37I --> connect to iphone debugger

# Life Dashboard
A dashboard for all of life's necessities.

## Python Notes
Start a new python project:
```
python3 -m venv <project-name>
```

### Virtual Environment
This gives each project its own isolated environment so it only uses its own dependencies and packages. If a package in another python project is updated it shouldn't affect this project.

1. `. bin/activate`
2. `deactivate`

### Python project structure and running files
Everything needs to be imported from outer most file with __init__. In this case it's the server folder, so all absolute paths need to start from server so server.<file/folder name>.

To run a file in terminal, cd into appropriate folder, start python, then import file.
Example:
```
import server.alert_updater
```

Exit python terminal with ctrl + D

### Pip
[Pip tutorial](https://www.youtube.com/watch?v=U2ZN104hIcc)
```
Output installed packages in requirements format. Use this to save all installed packages into a requirements.txt file

pip freeze > requirements.txt
```

```
Install from the given requirements file. This option can be used multiple times. -r means we’re using a requirements file (a requirements file can have any name)

pip install -r requirements.txt
```

### Python Objects
- Classes are templates to create objects
- Object Constructor __init__: the constructor initializes (assigns values to) any instance variables that the object will need when it starts
- Can only jsonify dictionaries or arrays of dictionaries. Not objects
- en_de = {"red" : "rot", "green" : "grün", "blue" : "blau", "yellow":"gelb"} (this is a dictionary. It is a list of key value pairs)
- Each model maps to a single database table. Each model is a Python class that subclasses
- Data path: website => (data) => API => (data) => Model => (data) => Database

## Flask
To turn on debug mode (run this in terminal):
```
export FLASK_ENV=development
python run.py
```

## Mongo
Type mongo in terminal to start mongo
### Show database
- show dbs

### Make/Use database
- use <database name>
- the database will show in list once it has data in it

### Show data in database
- show collections // blogs, posts (collections are basically tables, but in json data format)
- db.students.find({}).pretty() // this will find all the data in a database

### Create new Collection
- use <database name>
- db.<new collection name>.find({})
- db.<new collection name>.insert({ "email": "test@test.com", "password":"password"})

### Insert data into database
- use your database (db will refer to database you're on, students is the collection and insert is the data to insert)
- db.students.insert({"name":"jose", "mark": 99})

### Remove data
- db.students.remove({"name":"jose"}) // finds any element that matches this and deletes it
- db.students.remove({}) // deletes everything in this collection

### Update data
```
{
  _id: 1,
  item: "TBD",
  stock: 0,
  info: { publisher: "1111", pages: 430 },
  tags: [ "technology", "computer" ],
  ratings: [ { by: "ijk", rating: 4 }, { by: "lmn", rating: 5 } ],
  reorder: false
}
```
how to update [db.collection.update()](https://docs.mongodb.com/manual/reference/method/db.collection.update/)
```
db.books.update(
   { "_id": "1" },
   {
     $inc: { stock: 5 },
     $set: {
       "item": "ABC123",
       "info.publisher": "2222",
       "tags": [ "software" ],
       "ratings.1": { by: "xyz", rating: 3 }
     }
   }
)
```
will return
```
{
  "_id" : 1,
  "item" : "ABC123",
  "stock" : 5,
  "info" : { "publisher" : "2222", "pages" : 430 },
  "tags" : [ "software" ],
  "ratings" : [ { "by" : "ijk", "rating" : 4 }, { "by" : "xyz", "rating" : 3 } ],
  "reorder" : false
}
```

## React
To run app do ```yarn dev```
building and deploying: https://zeit.co/docs/examples/next
### Connect react to python
1. Make sure to install yarn in static folder
2. Add correct path to react build files in Flask and create initial route to index.html
``flask app = Flask(__name__, static_url_path='', static_folder="../static/build", template_folder="../static/build")

@app.route('/') # www.mysite.com/api the end point
def index():
    return render_template("index.html")
``
3. "yarn build" when I want to rebuild my site and then do python run.py to view the site

## CSS
Add css with [NEXT css](https://github.com/zeit/next-plugins/tree/master/packages/next-sass)

<!-- { "_id" : "d3c4749ca7e34fb3958e3ee5f6ec8925", "recipe_link" : "https://www.youtube.com/watch?v=gCQGDWlVN50", "ingredients" : [ ], "title" : "Gyudon", "directions" : [ { "1" : "Put dashi, soy sauce, sugar, mirin, and sake in a large pan and bring to a boil over medium heat." }, { "2" : "Add onion slices and simmer for a few minutes or until softened." } ], "cuisine_type" : "Japanese" } -->
