// script.js (com tudo consertado e funcionando)

document.addEventListener('DOMContentLoaded', () => {
  aplicarMascaraCpf('cpf');
  aplicarMascaraCpf('cpf1');
  aplicarMascaraTelefone('telefone');
  aplicarMascaraTelefone('telefone1');
  carregarUltimasVendas();
});

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('hidden');
}

function mostrarSecao(id) {
  document.querySelectorAll('main > section').forEach(sec => sec.classList.add('hidden'));
  const secao = document.getElementById(id);
  if (secao) secao.classList.remove('hidden');
  else console.error(`Seção com id "${id}" não encontrada!`);
}

function mostrarFormularioProduto() {
  const form = document.getElementById('formProduto');
  if (form) form.classList.remove('hidden');
}

function fecharFormularioProduto() {
  const form = document.getElementById('formProduto');
  if (form) form.classList.add('hidden');
}

function buscarProduto() {
  const filtro = document.getElementById('buscaProduto').value.toLowerCase();
  const linhas = document.querySelectorAll('#tabelaEstoque tr');
  linhas.forEach(linha => {
    const produto = linha.cells[0].textContent.toLowerCase();
    linha.style.display = produto.includes(filtro) ? '' : 'none';
  });
}

function adicionarProduto() {
  const nome = document.getElementById('nomeProduto').value;
  const quantidade = document.getElementById('quantidadeProduto').value;
  const preco = document.getElementById('precoProduto').value;
  if (!nome || !quantidade || !preco) return;

  const tabela = document.getElementById('tabelaEstoque');
  const linha = tabela.insertRow();
  linha.innerHTML = `
    <td>${nome}</td>
    <td>${quantidade}</td>
    <td>${parseFloat(preco).toFixed(2)}</td>
    <td>
      <button class="text-red-500" onclick="excluirProduto(this)">Excluir</button>
      <button class="text-blue-500" onclick="editarProduto(this)">Editar</button>
    </td>
  `;
  fecharFormularioProduto();
}

function excluirProduto(botao) {
  const linha = botao.closest('tr');
  linha.remove();
}

function editarProduto(botao) {
  const linha = botao.closest('tr');
  const celulas = linha.querySelectorAll('td');
  if (botao.textContent === 'Salvar') return;

  for (let i = 0; i < 3; i++) {
    celulas[i].innerHTML = `<input class='border p-1 w-full' value='${celulas[i].textContent}'>`;
  }
  botao.textContent = 'Salvar';
  botao.onclick = function () { salvarEdicao(this); };
}

function salvarEdicao(botao) {
  const linha = botao.closest('tr');
  const celulas = linha.querySelectorAll('td');
  for (let i = 0; i < 3; i++) {
    celulas[i].textContent = celulas[i].querySelector('input').value;
  }
  celulas[3].innerHTML = `
    <button class="text-red-500" onclick="excluirProduto(this)">Excluir</button>
    <button class="text-blue-500" onclick="editarProduto(this)">Editar</button>
  `;
}

function adicionarLancamento() {
  const tipo = document.getElementById('tipoLancamento').value;
  const descricao = document.getElementById('descricaoLancamento').value;
  const valor = parseFloat(document.getElementById('valorLancamento').value);
  if (!tipo || !descricao || isNaN(valor)) return;

  const li = document.createElement('li');
  li.textContent = `${tipo === 'receita' ? 'Receita' : 'Despesa'} - ${descricao}: R$ ${valor.toFixed(2)}`;
  document.getElementById('listaLancamentos').appendChild(li);

  const receitasEl = document.getElementById('totalReceitas');
  const despesasEl = document.getElementById('totalDespesas');
  let receitas = parseFloat(receitasEl.textContent);
  let despesas = parseFloat(despesasEl.textContent);

  if (tipo === 'receita') {
    receitas += valor;
    receitasEl.textContent = receitas.toFixed(2);
  } else {
    despesas += valor;
    despesasEl.textContent = despesas.toFixed(2);
  }

  const saldo = receitas - despesas;
  document.getElementById('saldoFinal').textContent = saldo.toFixed(2);
}

let ultimoId = 0;
function gerarNovoId() {
  return ++ultimoId;
}

function mostrarfuncionarionovo() {
  const id = gerarNovoId();
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = `<p class='text-green-600'>Funcionário ID: ${id} cadastrado!</p>`;
  document.getElementById('formfunc').classList.remove('hidden');
}

function demitir() {
  document.getElementById('formfunc').classList.add('hidden');
}

function aplicarMascaraCpf(id) {
  const input = document.getElementById(id);
  if (!input) return;
  input.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '');
    v = v.replace(/(\d{3})(\d)/, '$1.$2')
         .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
         .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    e.target.value = v;
  });
}

function aplicarMascaraTelefone(id) {
  const input = document.getElementById(id);
  if (!input) return;
  input.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '');
    v = v.replace(/^(.{2})(.{5})(.{4}).*/, '($1) $2-$3');
    e.target.value = v.substring(0, 15);
  });
}

function carregarUltimasVendas() {
  const vendas = [
    { cliente: 'Anna Clara', valor: 150, produtos: 'Arroz, Feijão, Leite' },
    { cliente: 'João Pereira', valor: 85, produtos: 'Óleo, Açúcar' },
    { cliente: 'Ana Costa', valor: 200, produtos: 'Leite, Sal, Feijão' },
    { cliente: 'Lucas Silva', valor: 120, produtos: 'Arroz, Sal' },
  ];
  const corpo = document.getElementById('tabelaUltimasVendas');
  if (!corpo) return;
  vendas.forEach(v => {
    const linha = document.createElement('tr');
    linha.innerHTML = `<td>${v.cliente}</td><td>R$ ${v.valor.toFixed(2)}</td><td>${v.produtos}</td>`;
    corpo.appendChild(linha);
  });
}

function cadastrarCliente() {
  alert('Cliente cadastrado com sucesso!');
}
