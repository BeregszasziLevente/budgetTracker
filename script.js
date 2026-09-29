async function kategoriaBetoltes() {
    let valasz = await fetch('http://127.0.0.1:5000/api/categories');
    let kategoriaAdatok = await valasz.json();
    
    for (let x of kategoriaAdatok) {
        let li = document.createElement("li");
        li.innerText=x[1];
        document.getElementById("kategoriak-lista").appendChild(li);
        
        let option = document.createElement("option")
        option.innerText=x[1];
        document.getElementById("tranz-kateg-select").appendChild(option);
    };
    
    return kategoriaAdatok 
}

async function tranzakcioBetoltese() {
    let valasz = await fetch('http://127.0.0.1:5000/api/transactions');
    let adatok = await valasz.json();
    

    for (let x of adatok) {
        let text=`${x['datum']}, ${x['note']}, ${x['type']}, ${x['value']}`;
        let li = document.createElement("li");
        li.innerText=text;
        document.getElementById("tablazat").appendChild(li);
    }
}



window.addEventListener('load', () => {
    kategoriaBetoltes()
    tranzakcioBetoltese()
    document.getElementById("kategoria-hozzadas-btn").addEventListener('click', async () => {
        let nev = document.getElementById("kategoria-nev").value;
        let valasz = await fetch('http://127.0.0.1:5000/api/categories');
        let kategoriaAdatok = await valasz.json();

        for (let x in kategoriaAdatok) {
            if (kategoriaAdatok[x][1].toLowerCase()==nev.toLowerCase()) {
                return alert("Ilyen kategória már létezik.")
            }
        }

        let ujKategoria = {
            "nev":nev
        }
        await fetch('http://127.0.0.1:5000/api/categories',{ method:'POST',headers:{'Content-Type': 'application/json'}, body: JSON.stringify(ujKategoria) })
        return alert("Kategória sikeresen hozzáadva!"), window.location.reload()
    });
    document.getElementById("tranz-hozzadas-btn").addEventListener('click', async ()=>{
        let valasz = await fetch('http://127.0.0.1:5000/api/categories');
        let kategoriaAdatok = await valasz.json();
        
        let valasztottKateg = document.querySelector('#tranz-kateg-select').value;
        let valasztottKategId;

        for (let x of kategoriaAdatok) {
            if (x[1] == valasztottKateg) {
                valasztottKategId=x[0]
            }
        }

        const most = new Date();
        const datum = `${most.getFullYear()}-${String(most.getMonth() + 1).padStart(2, "0")}-${String(most.getDate()).padStart(2, "0")} ${String(most.getHours()).padStart(2, "0")}:${String(most.getMinutes()).padStart(2, "0")}`;

        let ujTranz={
            "note": document.querySelector('#tranz-note').value,
            "value": document.getElementById('tranz-ossz').value,
            "type": document.querySelector('#tranz-type-select').value,
            "datum": datum,
            "kategoria_id": valasztottKategId
        }

        await fetch('http://127.0.0.1:5000/api/transactions', { method:'POST',headers:{'Content-Type': 'application/json'}, body: JSON.stringify(ujTranz) })
        return alert("Tranzakció sikeresen hozzáadva!"), window.location.reload()

    })
})
