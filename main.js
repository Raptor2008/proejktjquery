$(document).ready(function () {
    let tabwydatki = [];
    let tabprzychody = [];

    function aktualizujPodsumowanie() {
        let sumaWydatkow = tabwydatki.reduce((suma, element) => suma + element.kwota, 0);
        let sumaPrzychodow = tabprzychody.reduce((suma, element) => suma + element.kwota, 0);
        let bilans = sumaPrzychodow - sumaWydatkow;

        $("#suma-wydatki").text(sumaWydatkow.toFixed(2) + " PLN");
        $("#suma-przychody").text(sumaPrzychodow.toFixed(2) + " PLN");

        let poleBilans = $("#suma-bilans");
        poleBilans.text(bilans.toFixed(2) + " PLN");

        poleBilans.removeClass("text-success text-danger");
        if (bilans > 0) {
            poleBilans.addClass("text-success");
        } else if (bilans < 0) {
            poleBilans.addClass("text-danger");
        }
    }

    function zapis() {
        localStorage.setItem("wydatki", JSON.stringify(tabwydatki));
        localStorage.setItem("przychody", JSON.stringify(tabprzychody));
    }

    function wczytaj() {
        let zapiswydatki = localStorage.getItem("wydatki");
        let zapisprzychody = localStorage.getItem("przychody");

        if (zapiswydatki) {
            tabwydatki = JSON.parse(zapiswydatki);
            tabwydatki.forEach(function (element) {
                tabela("2", element.kwota, element.opis); 
            });
        }

        if (zapisprzychody) {
            tabprzychody = JSON.parse(zapisprzychody);
            tabprzychody.forEach(function (element) {
                tabela("1", element.kwota, element.opis);
            });
        }
        aktualizujPodsumowanie();
    }

    $("#form1").submit(function (e) {
        e.preventDefault();

        let opisOperacji = $("#opis").val();
        let kwotaOperacji = Number($("#ilosc").val());
        let typOperacji = $("#typoperacji").val();

        if (isNaN(kwotaOperacji) || kwotaOperacji <= 0) {
            alert("Podaj poprawną kwotę większą od zera.");
            return;
        }

        let wpis = {
            opis: opisOperacji,
            kwota: kwotaOperacji
        };

        if (typOperacji == "1") {
            tabprzychody.push(wpis);
        } else {
            tabwydatki.push(wpis);
        }

        tabela(typOperacji, kwotaOperacji, opisOperacji);

        aktualizujPodsumowanie();
        zapis();

        $("#opis").val("");
        $("#ilosc").val("");
    });

    function tabela(typ, kwota, opis) {
        if (typ == 1) {
            $("#tabela").append(`<tr>
                <td>Dochód</td>
                <td style="color:green">${kwota}</td>
                <td>${opis}</td>
                <td>
                    <button class="btn btn-sm btn-primary">Edytuj</button>
                    <button class="btn btn-sm btn-primary">Usuń</button>
                </td>
            </tr>`);
        } else {
            $("#tabela").append(`<tr>
                <td>Wydatek</td>
                <td style="color:red">${kwota}</td>
                <td>${opis}</td>
                <td>
                    <button class="btn btn-sm btn-primary">Edytuj</button>
                    <button class="btn btn-sm btn-primary">Usuń</button>
                </td>
            </tr>`);
        }
    }

    wczytaj();
});
