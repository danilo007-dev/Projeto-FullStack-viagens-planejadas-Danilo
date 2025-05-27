// Mostra campo de passaporte apenas para viagens internacionais
const tipoSelect = document.getElementById("tipo");
const passaporteLabel = document.querySelector("label[for='passaporte']");
const passaporteSelect = document.getElementById("passaporte");

tipoSelect.addEventListener("change", () => {
    const isInternacional = tipoSelect.value === "internacional";
    passaporteLabel.style.display = isInternacional ? "block" : "none";
    passaporteSelect.style.display = isInternacional ? "block" : "none";
});

// Referências
const form = document.getElementById("form-viagem");
const tabela = document.getElementById("tabela-viagens").querySelector("tbody");

// Atualiza os IDs da tabela após adição ou remoção
function atualizarIds() {
    const linhas = tabela.querySelectorAll("tr");
    linhas.forEach((linha, index) => {
        linha.children[0].textContent = index + 1; // Define o ID como a posição da linha
    });
}

// Evento de envio do formulário
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o comportamento padrão

    const destino = document.getElementById("destino").value;
    const data = document.getElementById("data").value;
    const tipo = tipoSelect.value;
    const internacional = tipo === "internacional" ? "Sim" : "Não";
    const passaporte = tipo === "internacional"
        ? (document.getElementById("passaporte").value === "true" ? "Sim" : "Não")
        : "—";

    // Cria nova linha na tabela
    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
        <td></td>
        <td>${destino}</td>
        <td>${data}</td>
        <td>Planejada</td>
        <td>${internacional}</td>
        <td>${passaporte}</td>
    `;
    tabela.appendChild(novaLinha);

    atualizarIds(); // Reorganiza os IDs

    // Limpa o formulário
    form.reset();
    passaporteLabel.style.display = "none";
    passaporteSelect.style.display = "none";
});

// Exclui viagem com base no ID fornecido
function excluirViagem() {
    const idExcluir = parseInt(document.getElementById("id-excluir").value);
    const linhas = tabela.querySelectorAll("tr");
    let encontrou = false;

    linhas.forEach((linha) => {
        const id = parseInt(linha.children[0].textContent);
        if (id === idExcluir) {
            linha.remove();
            encontrou = true;
        }
    });

    if (!encontrou) {
        alert("ID não encontrado.");
    } else {
        alert(`Viagem com ID ${idExcluir} excluída.`);
        atualizarIds(); // Reorganiza os IDs após exclusão
    }

    document.getElementById("id-excluir").value = "";
}
