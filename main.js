$(document).ready(function () {
    let tabwydatki = [];
    let tabprzychody = [];

    $("#form1").submit(function (e) {
        e.preventDefault();

        let opisOperacji = $("#opis").val();
        let kwotaOperacji = Number($("#ilosc").val());
        let typOperacji = $("#typoperacji").val();

        let wpis = {
            opis: opisOperacji,
            kwota: kwotaOperacji
        };

        if (typOperacji == "1") {
            tabprzychody.push(wpis);
            console.log("Przychody:", tabprzychody);
        } else {
            tabwydatki.push(wpis);
            console.log("Wydatki:", tabwydatki);
        }

        $("#opis").val("");
        $("#ilosc").val("");
    });
});
