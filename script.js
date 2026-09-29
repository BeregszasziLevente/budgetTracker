

async function kategoriaBetoltes() {
    let valasz = await fetch('http://127.0.0.1:5000/api/categories');
    let kategoriaAdatok = await valasz.json();
    
    for (let x of kategoriaAdatok) {
        let li = document.createElement("li");
        li.innerText=x[1];
        document.getElementById("kategoriak-lista").appendChild(li);
        
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
    })
})
