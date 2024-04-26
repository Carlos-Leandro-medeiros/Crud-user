
const openModal = () => {

    document.getElementById('modal').classList.add('active')

}

const closeModal = ( ) => {

    document.getElementById('modal').classList.remove('active')

}

document.getElementById('cadastrarUsuario').addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal); 

//MODAL

document.addEventListener("DOMContentLoaded", function() {

    const cadastrarUsuarioButton = document.getElementById("cadastrarUsuario");

    const modal = document.getElementById("modal");

    const modalCloseButton = document.getElementById("modalClose");

    const salvarButton = document.querySelector(".modal-footer .button.green");

    const cancelButton = document.querySelector(".modal-footer .button.blue");

    const modalForm = document.querySelector(".modal-form");

    const recordsTable = document.querySelector(".records tbody");

    // Carregar dados do localStorage ao iniciar

    carregarDadosLocalStorage();

    cadastrarUsuarioButton.addEventListener("click", function() {

        modal.style.display = "block";

        delete modal.dataset.editIndex;

    });

    modalCloseButton.addEventListener("click", function() {

        modal.style.display = "none";

        limparFormulario();

    });

    cancelButton.addEventListener("click", function() {

        modal.style.display = "none";

        limparFormulario();

    });

    salvarButton.addEventListener("click", function(event) {

        event.preventDefault();

        const inputs = modalForm.querySelectorAll("input");

        const dadosUsuario = {};

        inputs.forEach(input => {

            dadosUsuario[input.placeholder] = input.value;

        });

        const usuarioExistente = modal.dataset.editIndex;

        if (usuarioExistente !== undefined) {

            editarUsuario(dadosUsuario, usuarioExistente);

        } else {

            adicionarNovoUsuario(dadosUsuario);

            salvarLocalStorage(dadosUsuario);

        }

        modal.style.display = "none";

        limparFormulario();

    });

    function adicionarNovoUsuario(dadosUsuario) {

        const novaLinha = document.createElement("tr");

        novaLinha.innerHTML = `

            <td>${dadosUsuario["Nome"]}</td>

            <td>${dadosUsuario["E-mail"]}</td>

            <td>${dadosUsuario["Celular"]}</td>

            <td>${dadosUsuario["Cidade"]}</td>

            <td>

                <button type="button" class="button green editar">Editar</button>

                <button type="button" class="button red excluir">Excluir</button>

            </td>

        `;

        recordsTable.appendChild(novaLinha);

        configurarBotoes(novaLinha);

    }

    function limparFormulario() {

        const inputs = modalForm.querySelectorAll("input");

        inputs.forEach(input => {

            input.value = "";

        });

    }

    function salvarLocalStorage(dadosUsuario) {

        let usuarios = [];

        if (localStorage.getItem("usuarios")) {

            usuarios = JSON.parse(localStorage.getItem("usuarios"));

        }

        usuarios.push(dadosUsuario);

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

    }

    function carregarDadosLocalStorage() {

        if (localStorage.getItem("usuarios")) {

            const usuarios = JSON.parse(localStorage.getItem("usuarios"));

            usuarios.forEach(usuario => {

                adicionarNovoUsuario(usuario);

            });

        }

    }

    function configurarBotoes(linha) {

        const editarButton = linha.querySelector(".editar");

        const excluirButton = linha.querySelector(".excluir");

        editarButton.addEventListener("click", function() {

            const index = Array.from(recordsTable.children).indexOf(linha);

            const usuario = JSON.parse(localStorage.getItem("usuarios"))[index];

            preencherFormulario(usuario);

        });

        excluirButton.addEventListener("click", function() {

            linha.remove();

            atualizarLocalStorage();

        });

    }

    function preencherFormulario(usuario) {

        modal.style.display = "block";

        modal.dataset.editIndex = Array.from(recordsTable.children).indexOf(linha);

        const inputs = modalForm.querySelectorAll("input");

        inputs[0].value = usuario["Nome"];

        inputs[1].value = usuario["E-mail"];

        inputs[2].value = usuario["Celular"];

        inputs[3].value = usuario["Cidade"];

    }

    function editarUsuario(dadosUsuario, index) {

        const usuarios = JSON.parse(localStorage.getItem("usuarios"));

        usuarios[index] = dadosUsuario;

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        const linhas = recordsTable.querySelectorAll("tr");

        const linha = linhas[index];

        linha.cells[0].textContent = dadosUsuario["Nome"];

        linha.cells[1].textContent = dadosUsuario["E-mail"];

        linha.cells[2].textContent = dadosUsuario["Celular"];

        linha.cells[3].textContent = dadosUsuario["Cidade"];

    }

    function atualizarLocalStorage() {

        const linhas = recordsTable.querySelectorAll("tr");

        let usuarios = [];

        linhas.forEach(linha => {

            const nome = linha.cells[0].textContent;

            const email = linha.cells[1].textContent;

            const celular = linha.cells[2].textContent;

            const cidade = linha.cells[3].textContent;

            usuarios.push({ "Nome": nome, "E-mail": email, "Celular": celular, "Cidade": cidade });

        });

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

    }

});