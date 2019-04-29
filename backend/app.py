

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

    return jsonify({'username': username})

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

@app.route("/addWineFriend", methods = ['POST'])
def adWineFriend():

    # Connect database
    conn = mysql.connect()
    cursor = conn.cursor()
    
    # read the posted values from the UI
    username = request.get_json()['username']
    wine = request.get_json()['wine']

    # Result variable
    result = ""

    #Get data from the database 
    cursor.execute("SELECT * FROM users where username = '" + str(username) + "'")
    data = cursor.fetchone()

    if data != None:

        userWines = []
        id = data[0]

        cursor.execute("SELECT * FROM wineUserRelationDM where userID = '" + str(id) + "'")
        dmData = cursor.fetchall()
        cursor.execute("SELECT * FROM wineUserRelation where userID = '" + str(id) + "'")
        userData = cursor.fetchall()

        for rows in dmData:
            userWines.append(rows[2])
        for rows in userData:
            userWines.append(rows[2])

        if userWines.__contains__(wine):
            result = jsonify({"result": "User already have that wine!"})

        else:
            #Get data from the database 
            cursor.execute("INSERT INTO wineUserRelationDM (userID, wineID) VALUES ('" +
            str(id) + "', '" +
            str(wine) + "')")
            
            conn.commit()
            result = jsonify({"result": "Wine sended!"})

    else:
        result = jsonify({"result" : "User doesn't exist"})

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

@app.route("/getWinesDM", methods = ['POST'])
def getWinesDM():

    # Connect database
    conn = mysql.connect()
    cursor = conn.cursor()
    
    # read the posted values from the UI
    id = request.get_json()['id']

    #Get data from the database 
    cursor.execute("SELECT * FROM wineUserRelationDM where userID = '" + str(id) + "'")
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

@app.route("/getMasterWines", methods = ['POST'])
def getMasterWines():

    # Connect database
    conn = mysql.connect()
    cursor = conn.cursor()
    
    # read the posted values from the UI
    id = request.get_json()['id']
    
    #Get data from the database 
    cursor.execute("SELECT * FROM wineUserRelation where userID = '1'")
    masterData = cursor.fetchall()
    userWines = []
    masterWines = []
    wines = []

    cursor.execute("SELECT * FROM wineUserRelationDM where userID = '" + str(id) + "'")
    dmData = cursor.fetchall()
    cursor.execute("SELECT * FROM wineUserRelation where userID = '" + str(id) + "'")
    userData = cursor.fetchall()

    for rows in masterData:
        masterWines.append(rows[2])
    for rows in dmData:
        userWines.append(rows[2])
    for rows in userData:
        userWines.append(rows[2])
    
    for wine in userWines:
        if masterWines.__contains__(wine):
            masterWines.remove(wine)

    for wine in masterWines:
        cursor.execute("SELECT * FROM wines where id = '" + str(wine) + "'")
        data = cursor.fetchone()
        wines.append(data)

    return json.dumps(wines)

@app.route("/addWineDM", methods = ['POST'])
def addWineDM():

    # Connect database
    conn = mysql.connect()
    cursor = conn.cursor()
    
    # read the posted values from the UI
    wine = request.get_json()['wine']
    id = request.get_json()['id']

    #Get data from the database 
    cursor.execute("INSERT INTO wineUserRelationDM (userID, wineID) VALUES ('" +
    str(id) + "', '" +
    str(wine) + "')")
    
    conn.commit()

    result = {
        'user' : id,
        'wine' : wine
    }

    return jsonify({'result': result})

@app.route("/addWineCellar", methods = ['POST'])
def addWineCellar():

    # Connect database
    conn = mysql.connect()
    cursor = conn.cursor()
    
    # read the posted values from the UI
    wine = request.get_json()['wine']
    id = request.get_json()['id']

    #Get data from the database 
    cursor.execute("INSERT INTO wineUserRelation (userID, wineID) VALUES ('" +
    str(id) + "', '" +
    str(wine) + "')")
    
    conn.commit()

    cursor.execute("DELETE FROM wineUserRelationDM WHERE wineID='"+ str(wine) +"'")
    conn.commit()

    result = {
        'user' : id,
        'wine' : wine
    }

    return jsonify({'result': result})

@app.route("/removeWineDM", methods = ['POST'])
def removeWineDM():

    # Connect database
    conn = mysql.connect()
    cursor = conn.cursor()
    
    # read the posted values from the UI
    wine = request.get_json()['wine']
    id = request.get_json()['id']

    # Delete wine from table
    cursor.execute("DELETE FROM wineUserRelationDM WHERE wineID='"+ str(wine) +"'")
    conn.commit()

    result = {
        'user' : id,
        'wine' : wine
    }

    return jsonify({'result': result})

@app.route("/editWine", methods = ['POST'])
def editWine():

    # Connect database
    conn = mysql.connect()
    cursor = conn.cursor()
    
    # read the posted values from the UI REST
    id = request.get_json()['id']
    name = request.get_json()['name']
    year = request.get_json()['year']
    country = request.get_json()['country']
    grape = request.get_json()['grape']
    alcohol = request.get_json()['alcohol']    

    #Save data in the database    
    cursor.execute("UPDATE wines SET name = '"+ str(name) +"' WHERE id ='"+ str(id) +"'")
    cursor.execute("UPDATE wines SET year = '"+ str(year) +"' WHERE id ='"+ str(id) +"'")
    cursor.execute("UPDATE wines SET country = '"+ str(country) +"' WHERE id ='"+ str(id) +"'")
    cursor.execute("UPDATE wines SET grape = '"+ str(grape) +"' WHERE id ='"+ str(id) +"'")
    cursor.execute("UPDATE wines SET alcohol = '"+ str(alcohol) +"' WHERE id ='"+ str(id) +"'")
    conn.commit()

    result = {
        'id' : id,
        'name' : name,
        'year' : year,
        'country' : country,
        'grape' : grape,
        'alcohol': alcohol
    }

    return jsonify({'result': result})

if __name__ == "__main__":
    app.run(debug = True)