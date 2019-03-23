from flask import Flask, request, json, jsonify
from flaskext.mysql import MySQL
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token

app = Flask(__name__)

#MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'mysql'
app.config['MYSQL_DATABASE_DB'] = 'virtual_wine_cellar'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

mysql = MySQL()
bcrypt = Bcrypt(app)
mysql.init_app(app)

@app.route("/register", methods = ['POST'])
def register():

    # Connect database
    conn = mysql.connect()
    cursor = conn.cursor()
    
    # read the posted values from the UI REST
    username = request.get_json()['username']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    confirm_password = bcrypt.generate_password_hash(request.get_json()['confirm_password']).decode('utf-8')

    # validate the received values 
    if username and email and password and confirm_password:
        return json.dumps ({'html' : '<span>All fields good</span>'})
    else:
        return json.dumps({'html':'<span>Enter the required fields</span>'})

    # Generate id 
    cursor.execute("SELECT * from users")

    data = cursor.fetchall()

    id = len(data) + 1;

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

    # validate the received values 

    if username  and password:
        return json.dumps ({'html' : '<span>All fields good</span>'})
    else:
        return json.dumps({'html':'<span>Enter the required fields</span>'})

    #Get data from the database 
    cursor.execute("SELECT * FROM users where username = '" + str(username) + "'")
    data = cursor.fetchone()

    if bcrypt.check_password_hash(data['password'], password):
        access_token = create_access_token(identity = {'id': data['id'],'username': data['username'],'email': data['email']})
        result = access_token
    else:
        result = jsonify({"error" : "Invalid username and password"})

    return result

if __name__ == "__main__":
    app.run(debug = True)