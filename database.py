import sqlite3

conn = sqlite3.connect("budget.db")
cursor = conn.cursor()

cursor.execute("""
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nev TEXT NOT NULL
    )
    
""")

cursor.execute("""
    CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            note TEXT,
            value INTEGER NOT NULL,
            type TEXT NOT NULL,
            datum TEXT NOT NULL,
            kategoria_id INTEGER NOT NULL, 
            FOREIGN KEY (kategoria_id) REFERENCES categories(id)
        )
""")
print("Adatbázis sikeresen létrehozva!")
conn.commit()
conn.close()