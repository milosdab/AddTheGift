$(document).ready(function () {
    $("#proizvodiDiv").hide();
    zaposleni();



    function zaposleni() {
        $.ajax({
            url: "https://services.odata.org/V3/Northwind/Northwind.svc/Employees?$format=json",
            dataType: "json",
            success: function (result) {
                listaZap = result.value;

                for (const key in listaZap) {

                    const element = listaZap[key];


                    prikazZaposlenih(element, key);


                }


            }
        })
    }

    function prikazZaposlenih(element, i) {
        tablewrite = document.getElementById("listaZaposlenih");
        tr1 = document.createElement("tr");

        td1 = document.createElement("td");
        td1.innerHTML = element.FirstName;

        td2 = document.createElement("td");
        td2.innerHTML = element.LastName;

        td3 = document.createElement("td");
        td3.setAttribute("id", "nije" + i);
        td3.setAttribute("class", "nijeDiv");
        td3.innerHTML = "";

        td4 = document.createElement("td");



        dugme = document.createElement("button");
        dugme.setAttribute("class", "btn btn-primary");
        dugme.setAttribute("id", "dodeli" + i);
        dugme.setAttribute("value", i);
        dugme.innerHTML = "Dodeli nagradu"




        td4.appendChild(dugme);


        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tr1.appendChild(td3);
        tr1.appendChild(td4);
        tablewrite.appendChild(tr1);

        document.getElementById("dodeli" + i).addEventListener("click", function (event) {

            selektovanZaposleni = event.target.value;
            nagrade(event.target.value);


        })

    }

    let selektovanZaposleni;
    let proizvodiGlobal = [];

    function nagrade(key) {
        $("#proizvodiDiv").show()
        $("#listaDiv").hide();
        selectedEmployee = key;
        selectKategorije = document.getElementById("kategorije");
        $.ajax({
            url: "https://services.odata.org/V3/Northwind/Northwind.svc/Categories?$format=json",
            dataType: "json",
            success: function (categories) {
                listaKategorije = categories;
                document.getElementById("kategorije").innerHTML = " ";
                for (const key in categories.value) {
                    option = document.createElement("option");
                    option.setAttribute("value", categories.value[key].CategoryID);
                    option.innerHTML = categories.value[key].CategoryName;
                    selectKategorije.appendChild(option);

                }
            }
        })
    }
    function spakujProizvode(value) {

        for (const key in proizvodiGlobal) {

            const element = proizvodiGlobal[key];
            if (element.ProductName == value) {
                return element.ProductName;
            }


        }
    }




    j = 0;

    document.getElementById("nadji").addEventListener("click",
        function nadjiProizvod(categories) {


            lista = document.getElementById("listaProizvoda");
            selectedKategorija = document.getElementById("kategorije").value;
            $.ajax({
                url: "https://services.odata.org/V3/Northwind/Northwind.svc/Products?$format=json",
                dataType: "json",
                success: function (products) {
                    let prod = products.value;
                    proizvodiGlobal = prod;

                    document.getElementById("listaProizvoda").innerHTML = " ";


                    for (const key in prod) {

                        const product = prod[key];

                        if (product.CategoryID == selectedKategorija) {

                            j++
                            div = document.createElement("div");
                            div.setAttribute("class", "divNagrade");
                            div.innerHTML += product.ProductName + "   ";
                            dugme = document.createElement("button");
                            dugme.setAttribute("id", "uKorpu" + j);
                            dugme.setAttribute("class", "btn btn-info");
                            dugme.setAttribute("value", product.ProductName);
                            dugme.innerHTML = "Dodeli nagradu";

                            div.appendChild(dugme);
                            lista.appendChild(div);

                            document.getElementById("uKorpu" + j).addEventListener("click", function (event) {


                                document.getElementById("nije" + selektovanZaposleni).innerHTML = spakujProizvode(event.target.value);
                                $("#proizvodiDiv").hide()
                                $("#listaDiv").show();
                            })
                        }
                    }
                }


            })

        }
    )
    

})


