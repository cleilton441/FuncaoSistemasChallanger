$(document).ready(function () {

    // Máscaras de entrada para CPF, CEP e Telefone
    $('#CPF').mask('000.000.000-00');
    $('#CEP').mask('00000-000');
    $('#Telefone').mask('(00) 00000-0000');

    // Cria dinamicamente o botão "Beneficiários"
    const btnBeneficiarios = $('<button>', {
        type: 'button',
        class: 'btn btn-primary',
        text: 'Beneficiários',
        id: 'btnBeneficiarios',
        click: function () {
            const clienteId = $('#clienteId').val(); // Supondo que você tenha um campo com o ID do cliente

            $.ajax({
                url: urlBeneficiarioList,
                type: 'POST',
                data: {
                    Id: clienteId,  // Envia o ID do cliente
                    Nome: $('#Nome').val(),
                    CPF: $('#CPF').val(),
                    // Adicione aqui os demais campos necessários
                },
                success: function (response) {
                    alert('Sucesso: ' + response);
                    window.location.href = urlRetorno; // Redireciona após sucesso
                },
                error: function (response) {
                    alert('Erro: ' + response.responseText);
                }
            });
        }
    });

    // Adiciona o botão ao final do formulário, no local apropriado
    $('#formCadastro .row').last().after($('<div>', { class: 'row' }).append(
        $('<div>', { class: 'col-md-12' }).append(btnBeneficiarios)
    ));

    // Submissão do formulário
    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        const cpf = $(this).find("#CPF").val();
        const cep = $(this).find("#CEP").val();
        const telefone = $(this).find("#Telefone").val();

        if (!ValidarCPF(cpf)) {
            ModalDialog("Erro", "CPF inválido!");
            return; // Não envia o formulário se o CPF for inválido
        }

        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": cep.replace(/[^\d]+/g, ''),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": telefone.replace(/[^\d]+/g, ''),
                "CPF": $(this).find("#CPF").val(),
            },
            error: function (r) {
                if (r.status === 400) {
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                } else if (r.status === 500) {
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                }
            },
            success: function (r) {
                ModalDialog("Sucesso!", r);
                $("#formCadastro")[0].reset();
            }
        });
    });
});
