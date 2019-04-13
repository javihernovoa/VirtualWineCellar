

from flask import Flask, request, json, jsonify
from flaskext.mysql import MySQL
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token

app = Flask(__name__)

#MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
# app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'mysql'
app.config['MYSQL_DATABASE_DB'] = 'virtual_wine_cellar'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
# app.config['MYSQL_DATABASE_PORT'] = 8889
app.config['JWT_SECRET_KEY'] = 'secret'

mysql = MySQL()
mysql.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)

@app.route("/register", methods = ['POST'])
def register():

    # Connect database
    conn = mysql.connect()
    cursor = conn.cursor()
    
    # read the posted values from the UI REST
    username = request.get_json()['username']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')

    # Generate id 
    cursor.execute("SELECT * from users")

    data = cursor.fetchall()

    id = len(data) + 1

    #Save data in the database 
    cursor.execute("INSERT INTO users (id, username, email, password) VALUES ('" +
    str(id) + "', '" +
    str(username) + "', '" +
    str(email) + "', '" +
    str(password) + "')")

    conn.commit()

    result = {
        'id' : id,
        'username' : username,
        'email' : email,
        'password' : password
    }

    return jsonify({'result': result})

@app.route("/login", methods = ['POST'])
def login():

    # Connect database
    conn = mysql.connect()
    cursor = conn.cursor()
    
    # read the posted values from the UI
    username = request.get_json()['username']
    password = request.get_json()['password']

    # Result variable
    result = ""

    #Get data from the database 
    cursor.execute("SELECT * FROM users where username = '" + str(username) + "'")
    data = cursor.fetchone()

    if bcrypt.check_password_hash(data[3], password):

        access_token = create_access_token(identity = {
            'id': data[0],
            'username': data[1],
            'email': data[2]
        })

        result = access_token

    else:
        result = jsonify({"error" : "Invalid username or password"})

    return result

@app.route("/getWines", methods = ['POST'])
def getWines():

    # Connect database
    conn = mysql.connect()
    cursor = conn.cursor()
    
    # read the posted values from the UI
    id = request.get_json()['id']

    #Get data from the database 
    cursor.execute("SELECT * FROM wineUserRelation where userID = '" + str(id) + "'")
    data = cursor.fetchall()
    winesID = []
    wines = []

    for rows in data:
        winesID.append(rows[2])

    for wine in winesID:
        cursor.execute("SELECT * FROM wines where id = '" + str(wine) + "'")
        data = cursor.fetchone()
        wines.append(data)

    return json.dumps(wines)

if __name__ == "__main__":
    app.run(debug = True)