from flask import Flask, request, json, jsonify
from flaskext.mysql import MySQL
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token

app = Flask(__name__)

#MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'mysql'
app.config['MYSQL_DATABASE_DB'] = 'virtual_wine_cellar'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

mysql = MySQL()
mysql.init_app(app)
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
    password = request.get_json()['password']

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

    if password is data[3]:

        result = {
        'id' : data[0],
        'username' : data[1],
        'email' : data[2],
        'password' : data[3]
    }

    else:
        result = jsonify({"error" : "Invalid username and password"})

    return result

if __name__ == "__main__":
    app.run(debug = True)