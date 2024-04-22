document.addEventListener("DOMContentLoaded", function() {
    const createButton = document.getElementById("create");
    const readButton = document.getElementById("read");
    const updateButton = document.getElementById("update");
    createButton.addEventListener("click", async function(){
        let megnevezes = document.getElementById("megnevezes").value;
        let baseUrl='http://localhost/etelek/index.php?etelek/'+megnevezes;
        const formdata= new FormData(document.getElementById("levesForm")); 
        let options={
            method: "POST",
            mode: "cors",
            body: formdata
        };
        let response= await fetch(baseUrl, options);
    });
    updateButton.addEventListener("click", async function(){
        let baseUrl='http://localhost/etelek/index.php?etelek/'+megnevezes;
        let object={
            megnevezes: document.getElementById("megnevezes").value,
            kaloria: document.getElementById("kaloria").value,
            feherje: document.getElementById("feherje").value,
            zsir: document.getElementById("zsir").value,
            szenhidrat: document.getElementById("szenhidrat").value,
            hamu: document.getElementById("hamu").value,
            rost: document.getElementById("rost").value
        };
        let body=JSON.stringify(object);
        let options={
            method: "PUT",
            mode: "cors",
            body: body
        };
        let response= await fetch(baseUrl, options);
    });
    readButton.addEventListener("click", async function(){
        let baseUrlEtelek="http://localhost/etelek/index.php?etelek";
        let optionsEtelek={
            method: "GET",
            mode: "cors"
        };
        let responseEtelek= await fetch(baseUrlEtelek, optionsEtelek);
        if(responseEtelek.ok){
            let dataEtelek= await responseEtelek.json();
            etelekListazasa(dataEtelek);
        }
        else{
            console.error("Hiba a szerver válaszában!");
        }
    });
    function etelekListazasa(levesek){
        let etelekDiv= document.getElementById("leveslista");
        let tablazat = etelekFejlec();
        for(let leves of levesek){
            tablazat+= etelekSor(leves);
        }
        etelekDiv.innerHTML = tablazat+"</tbody> </table>";
    }
    function etelekSor(levesek){
        let sor=`<tr>
                    <td>${levesek.megnevezes}</td>
                    <td>${levesek.kaloria}</td>
                    <td>${levesek.feherje}</td>
                    <td>${levesek.zsir}</td>
                    <td>${levesek.szenhidrat}</td>
                    <td>${levesek.hamu}</td>
                    <td>${levesek.rost}</td>
                    <td>
                        <button type="button" class="btn btn-outline-success" id="select" onclick="adatBetoltes('${levesek.megnevezes}',${levesek.kaloria},${levesek.feherje},${levesek.zsir},${levesek.szenhidrat},${levesek.hamu},${levesek.rost})" >Kiválaszt</button>
                        <button type="button" class="btn btn-outline-danger" id="delete" onclick="adatTorles('${levesek.megnevezes}')" ><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>`;
        return sor;
    }
    function etelekFejlec(){
        let fejlec=`<table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Megnevezés</th>
                                <th>Kalória</th>
                                <th>Fehérje</th>
                                <th>Zsír</th>
                                <th>Szénhidrát</th>
                                <th>Hamu</th>
                                <th>Rost</th>
                                <th>Művelet</th>
                            </tr>
                        </thead>
                        <tbody>`;
        return fejlec;
    }
});
function adatBetoltes(megnevezes, kaloria, feherje, zsir, szenhidrat, hamu, rost){
    let baseUrl='http://localhost/etelek/index.php?etelek/'+megnevezes;
    let options={
        method: "GET",
        mode: "cors"
    };
    let response= fetch(baseUrl, options);
    document.getElementById("megnevezes").value=megnevezes;
    document.getElementById("kaloria").value=kaloria;
    document.getElementById("feherje").value=feherje;
    document.getElementById("zsir").value=zsir;
    document.getElementById("szenhidrat").value=szenhidrat;
    document.getElementById("hamu").value=hamu;
    document.getElementById("rost").value=rost;
    response.then(function(response){
        if(response.ok){
            let data= response.json();
        }
        else{
            console.error("Hiba a szerverben!");
        }
    });
}
function adatTorles(megnevezes){
    let baseUrl='http://localhost/etelek/index.php?etelek/'+megnevezes;
    let options={
        method: "DELETE",
        mode: "cors"
    };
    let response= fetch(baseUrl, options);
    response.then(function(response){
        if(response.ok){
            let data= response.json();
        }
        else{
            console.error("Hiba a szerverben!");
        }
    });
}
