
import pymysql

connection = pymysql.connect(
    host='localhost',
    user='root',
    password='KS72@kittu',
    port=3306
)

try:
    with connection.cursor() as cursor:
        cursor.execute("CREATE DATABASE IF NOT EXISTS mediassist_db")
        print("Database 'mediassist_db' created or already exists.")
finally:
    connection.close()
