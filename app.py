from flask import Flask, jsonify, request
import sqlite3

app=Flask(__name__)

@app.route('/api/categories', methods=['GET'])
def kategoriak_lekerese():
    conn=sqlite3.connect('budget.db')
    cursor=conn.cursor()

    sorok = cursor.execute("""
                SELECT * FROM categories
            """)

    sorok=list(sorok)
    conn.close()

    return jsonify(sorok)

@app.route('/api/categories', methods=['POST'])
def kategoria_hozzaadasa():
    package = request.get_json()
    nev=package["nev"]
    conn=sqlite3.connect("budget.db")
    cursor=conn.cursor()

    cursor.execute("""

        INSERT INTO categories (nev) VALUES (?)

    """, (nev,))

    conn.commit()
    conn.close()

    return jsonify({"message": "Kategória hozzáadva"}), 201

@app.route("/api/transactions", methods=["GET"]) 
def tranzakciok_lekerese():
    conn=sqlite3.connect('budget.db')
    cursor=conn.cursor()

    cursor.execute("SELECT * FROM transactions")
    eredmeny=cursor.fetchall()

    tranzakciok=[]
    
    for sor in eredmeny:
        tranzakciok.append({
            "id":sor[0],
            "note":sor[1],
            "value":sor[2],
            "type":sor[3],
            "datum":sor[4],
            "kategoria_id":sor[5]
        })

    conn.close()

    return jsonify(tranzakciok)

@app.route('/api/transactions', methods=["POST"])
def tranzakcio_hozzaadasa():
    package = request.get_json()
    note=package["note"]
    value=package["value"]
    type=package["type"]
    datum=package["datum"]
    kategoria_id=package["kategoria_id"]
    conn=sqlite3.connect("budget.db")
    cursor=conn.cursor()

    cursor.execute("""

        INSERT INTO transactions (note, value, type, datum, kategoria_id) VALUES (?, ?, ?, ?, ?)
       
    """, (note, value, type, datum, kategoria_id))

    conn.commit()
    conn.close()

    return jsonify({"message": "Tranzakció hozzáadva"}), 201

if __name__=="__main__":
    app.run(debug=True)