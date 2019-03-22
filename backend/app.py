from flask import Flask, request, json
from flaskext.mysql import MySQL

app = Flask(__name__)

mysql = MySQL()

#MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'mysql'
app.config['MYSQL_DATABASE_DB'] = 'virtual_wine_cellar'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)
conn = mysql.connect()
cursor = conn.cursor()

@app.route("/register", methods = ['POST'])
def register():
    
    # read the posted values from the UI
    name = request.form['username']
    email = request.form['email']
    password = request.form['password']
    confirm_password = request.form['confirm_password']

    # validate the received values 
    if name and email and password and confirm_password:
        return json.dumps ({'html' : '<span>All fields good</span>'})
    else:
        return json.dumps({'html':'<span>Enter the required fields</span>'})

    #Save data in the database 
    

@app.route("/login", methods = ['POST'])
def login():
    
    # read the posted values from the UI
    name = request.form['username']
    password = request.form['password']

    # validate the received values 
    if name  and password:
        return json.dumps ({'html' : '<span>All fields good</span>'})
    else:
        return json.dumps({'html':'<span>Enter the required fields</span>'})

if __name__ == "__main__":
    app.run(debug = True)