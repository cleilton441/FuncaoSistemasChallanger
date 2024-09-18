$(document).ready(function () {
    $('#formCadastroBeneficiario').submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: urlExclusao,
            method: "DELETE",
            data: {
                "ID": id,
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r)
                    $("#formCadastroBeneficiario")[0].reset();
                }
        });
    })
})