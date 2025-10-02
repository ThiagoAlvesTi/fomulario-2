const form = document.getElementById("formEndereco");
const cep = document.getElementById("cep");
const logradouro = document.getElementById("logradouro");
const numero = document.getElementById("numero");
const uf = document.getElementById("uf");

// === Máscara automática para CEP ===
cep.addEventListener("input", () => {
  let valor = cep.value.replace(/\D/g, "");
  if (valor.length > 5) {
    valor = valor.replace(/^(\d{5})(\d{1,3}).*/, "$1-$2");
  }
  cep.value = valor;
});

// === UF: só letras, no máximo 2, sempre maiúsculo ===
uf.addEventListener("input", () => {
  uf.value = uf.value.replace(/[^a-zA-Z]/g, "");
  uf.value = uf.value.slice(0, 2);
  uf.value = uf.value.toUpperCase();
});

// === Número: só dígitos ===
numero.addEventListener("input", () => {
  numero.value = numero.value.replace(/\D/g, "");
});

// === Validação no submit ===
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Regex
  const regexCEP = /^\d{5}-\d{3}$/;
  const regexNumero = /^\d+$/;
  const regexUF = /^[A-Z]{2}$/;

  let erros = [];

  // CEP
  if (!regexCEP.test(cep.value)) {
    erros.push("CEP inválido! Use o formato 00000-000.");
  }

  // Logradouro
  if (logradouro.value.trim().length < 5) {
    erros.push("O logradouro deve ter pelo menos 5 caracteres.");
  }

  // Número
  if (!regexNumero.test(numero.value)) {
    erros.push("O número deve conter apenas dígitos.");
  }

  // UF
  if (!regexUF.test(uf.value)) {
    erros.push("UF inválido! Digite exatamente 2 letras maiúsculas (ex: SP, RJ).");
  }

  // Exibir os erros encontrados
  if (erros.length > 0) {
    erros.forEach((erro) => alert(erro));
    return;
  }

  // Se não tiver erro
  alert("Endereço cadastrado com sucesso!");
});
