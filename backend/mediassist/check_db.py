
from sqlalchemy import create_engine, text
from sqlalchemy.exc import OperationalError
import urllib.parse
import sys
import os

# Add current directory to path to allow importing main
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from main import app, db
    print("Successfully imported app and db from main.")
    
    with app.app_context():
        # This ensures tables are created
        db.create_all()
        print("db.create_all() executed.")
        
        # Verify connection and tables
        with db.engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            print("Successfully connected to the database!")
            
            result = connection.execute(text("SHOW TABLES"))
            tables = [row[0] for row in result]
            print(f"Tables found: {tables}")

except ImportError as e:
    print(f"ImportError: {e}")
except OperationalError as e:
    print(f"Connection failed: {e}")
except Exception as e:
    print(f"An error occurred: {e}")
