import os
import app
import unittest
import tempfile
import json
from flaskext.mysql import MySQL

class AppTestCase(unittest.TestCase):
        # Initial set up before each test
        def setUp(self):
                #MySQL configurations
                app.app.config['MYSQL_DATABASE_USER'] = 'root'
                app.app.config['MYSQL_DATABASE_DB'] = 'virtual_wine_cellar'
                app.app.config['MYSQL_DATABASE_HOST'] = 'localhost'
                app.app.config['JWT_SECRET_KEY'] = 'secret'

                # Configuration for Windows
                app.app.config['MYSQL_DATABASE_PASSWORD'] = 'mysql'

                #Configuration for Mac
                # app.app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
                # app.app.config['MYSQL_DATABASE_PORT'] = 8889

                app.app.testing = True
                self.app = app.app.test_client()
                app.app.mysql = MySQL()
                app.app.mysql.init_app(app.app)

        # Code to run after each test
        def tearDown(self):
                #Delete the test user
                conn = app.mysql.connect()
                cursor = conn.cursor()
                cursor.execute("DELETE FROM users WHERE username='test'")
                conn.commit()

                #Delete the wine test in DM
                cursor.execute("DELETE FROM wineUserRelationDM WHERE wineID='99'")
                conn.commit()

                #Delete the wine test in Cellar
                cursor.execute("DELETE FROM wineUserRelation WHERE wineID='99'")
                conn.commit()

        # Test connection to initial page
        def test_home(self):
                rv = self.app.get('/')
                self.assertEqual(rv.default_status, 200)

        # Test connection to login
        def test_login(self):
                rv = self.app.get("/login")
                self.assertEqual(rv.default_status, 200)

        # Test connection to register
        def test_register(self):
                rv = self.app.get("/register")
                self.assertEqual(rv.default_status, 200)

        # Test conection to getWines
        def test_getWines(self):
                rv = self.app.get("/getWines")
                self.assertEqual(rv.default_status, 200)

        # Test conection to getWinesDM
        def test_getWinesDM(self):
                rv = self.app.get("/getWinesDM")
                self.assertEqual(rv.default_status, 200)

        # Test conection to getMasterWines
        def test_getMasterWines(self):
                rv = self.app.get("/getMasterWines")
                self.assertEqual(rv.default_status, 200)

        # Test conection to addwineDM
        def test_addWineDM(self):
                rv = self.app.get("/addWineDM")
                self.assertEqual(rv.default_status, 200)
        
        # Test conection to addWineCellar
        def test_addWineCellar(self):
                rv = self.app.get("/addWineCellar")
                self.assertEqual(rv.default_status, 200)

        # Test conection to addWineFriend
        def test_addWineFriend(self):
                rv = self.app.get("/addWineFriend")
                self.assertEqual(rv.default_status, 200)

        # Test conection to removeWineDM
        def test_removeWineDM(self):
                rv = self.app.get("/removeWineDM")
                self.assertEqual(rv.default_status, 200)

        # Test conection to editWine
        def test_editWine(self):
                rv = self.app.get("/addWine")
                self.assertEqual(rv.default_status, 200)

        # Test a successful login 
        def test_login_succes_user(self):
                data = {
                        'username':'masterUser',
                        'password':'masterUser1234'
                }
                rv = self.app.post('/login', json=data)
                self.assertEqual(rv.json, None)

        # Test a wrong login
        def test_login_error_user(self):
                data = {
                        'username':'masterUser',
                        'password':'masterUser'
                }
                rv = self.app.post('/login', json=data)
                self.assertEqual(rv.json, {"error" : "Invalid username or password"})

        # Test a successful register
        def test_register_success_user(self):
                data = {
                        'username':'test',
                        'email': 'test@gmail.com',
                        'password':'test1234'
                }
                rv = self.app.post('/register', json=data)
                self.assertEqual(rv.json, {'username': "test"})

        # Test a successful getWines
        def test_getWines_success(self):
                data = {
                        'id': 1
                }
                rv = self.app.post('/getWines', json=data)
                assert b'Undurraga' in rv.data

        # Test a wrong getWines
        def test_getWines_error(self):
                data = {
                        'id': 1
                }
                rv = self.app.post('/getWines', json=data)
                assert b'TestWine 1' not in rv.data

        # Test a successful getWinesDM
        def test_getWinesDM_success(self):
                data1 = {
                        'wine': 99,
                        'id': 1
                }
                self.app.post('/addWineDM', json=data1)
               
                data = {
                        'id': 1
                }
                rv = self.app.post('/getWinesDM', json=data)
                assert b'99' in rv.data

        # Test a successful getMasterWines
        def test_getMasterWines_success(self):
                data = {
                        'id': 5
                }
                rv = self.app.post('/getMasterWines', json=data)
                assert b'Undurraga' in rv.data

        # Test a wrong getMasterWines
        def test_getMasterWines_error(self):
                data = {
                        'id': 2
                }
                rv = self.app.post('/getMasterWines', json=data)
                assert b'TestWine 1' not in rv.data

        # Test a successful addWineDM
        def test_addWineDM_success(self):
                data = {
                        'wine': 99,
                        'id': 1
                }
                rv = self.app.post('/addWineDM', json=data)
                self.assertEqual(rv.json, {"result" : {'user': 1, 'wine': 99}})

        # Test a successful addWineCellar
        def test_addWineCellar_success(self):
                data = {
                        'wine': 99,
                        'id': 1
                }
                rv = self.app.post('/addWineCellar', json=data)
                self.assertEqual(rv.json, {"result" : {'user': 1, 'wine': 99}})

        # Test a successful removeWineDM
        def test_removeWineDM_success(self):
                data = {
                        'wine': 100,
                        'id': 1
                }
                self.app.post('/addWineDM', json=data)

                rv = self.app.post('/removeWineDM', json=data)
                self.assertEqual(rv.json, {"result" : {'user': 1, 'wine': 100}})

        # Test a successful editWine
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