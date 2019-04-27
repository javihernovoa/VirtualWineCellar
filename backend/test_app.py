import os
import app
import unittest
import tempfile
import json
from flaskext.mysql import MySQL

class AppTestCase(unittest.TestCase):
        def setUp(self):
                #MySQL configurations
                app.app.config['MYSQL_DATABASE_USER'] = 'root'
                # app.app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
                app.app.config['MYSQL_DATABASE_PASSWORD'] = 'mysql'
                app.app.config['MYSQL_DATABASE_DB'] = 'virtual_wine_cellar'
                app.app.config['MYSQL_DATABASE_HOST'] = 'localhost'
                # app.app.config['MYSQL_DATABASE_PORT'] = 8889
                app.app.config['JWT_SECRET_KEY'] = 'secret'

                app.app.testing = True
                self.app = app.app.test_client()
                app.app.mysql = MySQL()
                app.app.mysql.init_app(app.app)
        
        def tearDown(self):
                #Delete the test user
                conn = app.mysql.connect()
                cursor = conn.cursor()
                cursor.execute("DELETE FROM users WHERE username='test'")
                conn.commit()

                #Delete the wine test
                cursor.execute("DELETE FROM wineUserRelation WHERE wineID='99'")
                conn.commit()

        def test_home(self):
                rv = self.app.get('/')
                self.assertEqual(rv.default_status, 200)

        def test_login(self):
                rv = self.app.get("/login")
                self.assertEqual(rv.default_status, 200)

        def test_register(self):
                rv = self.app.get("/register")
                self.assertEqual(rv.default_status, 200)

        def test_getWines(self):
                rv = self.app.get("/getWine")
                self.assertEqual(rv.default_status, 200)

        def test_addWine(self):
                rv = self.app.get("/addWine")
                self.assertEqual(rv.default_status, 200)

        def test_editWine(self):
                rv = self.app.get("/addWine")
                self.assertEqual(rv.default_status, 200)

        def test_login_user(self):
                data = {
                        'username':'masterUser',
                        'password':'masterUser1234'
                }
                rv = self.app.post('/login', json=data)
                self.assertEqual(rv.json, None)

                data = {
                        'username':'masterUser',
                        'password':'masterUser'
                }
                rv = self.app.post('/login', json=data)
                self.assertEqual(rv.json, {"error" : "Invalid username or password"})

        def test_register_user(self):
                data = {
                        'username':'test',
                        'email': 'test@gmail.com',
                        'password':'test1234'
                }
                rv = self.app.post('/register', json=data)
                self.assertEqual(rv.json, {'username': "test"})

        def test_getWines_user(self):
                data = {
                        'id': 1
                }
                rv = self.app.post('/getWines', json=data)
                assert b'Undurraga' in rv.data

        def test_addWine_user(self):
                data = {
                        'wine': 99,
                        'id': 1
                }
                rv = self.app.post('/addWine', json=data)
                self.assertEqual(rv.json, {"result" : {'user': 1, 'wine': 99}})

        def test_editWine_user(self):
                data = {
                        'id': 1,
                        'name' : 'Undurraga',
                        'year' : 2016,
                        'country' : 'Argentina',
                        'grape' : 'Cabernet Sauvignon',
                        'alcohol': 12
                }
                rv = self.app.post('/editWine', json=data)
                self.assertEqual(rv.json, {"result" : data})

if __name__ == '__main__':
    unittest.main()