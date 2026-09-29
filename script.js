async function kategoriaBetoltes() {
    let valasz = await fetch('http://127.0.0.1:5000/api/categories');
    let adatok = await valasz.json();

   
    for (let x of adatok) {
        let li = document.createElement("li");
        li.innerText=x[1];
        document.getElementById("kategoriak-lista").appendChild(li);
        
    };
    
}

async function tranzakcioBetoltese() {
    let valasz = await fetch('http://127.0.0.1:5000/api/transactions');
    let adatok = await valasz.json();

    console.log(adatok)
}

window.addEventListener('load', () => {
    kategoriaBetoltes()
    tranzakcioBetoltese()
})