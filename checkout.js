/* ===========================================================
   CONFIGURE AQUI ANTES DE PUBLICAR NO GITHUB PAGES.
   Substitua os valores abaixo pelos dados REAIS de quem recebe.
   Nunca coloque senhas, tokens ou dados bancários sigilosos.
   =========================================================== */
const CONFIG = {
  chavePix: '264e88d7-6826-4b33-a0cb-ae0003423a4a',
  nomeRecebedor: 'GEAN MENDES SANTOS',
  tipoChave: 'Chave aleatória', // Ex.: E-mail, CPF, CNPJ, Telefone ou Aleatória
  instituicao: 'Banco Bradesco S.A.',
  whatsapp: '5521965204419' // DDI + DDD + número, sem símbolos
};

// Valores dos planos originais. Mantém a lista sob controle, sem aceitar
// valores arbitrários da URL como se fossem preços validados.
const PLANOS = [
  { nome:'Plano Mensal', telas:'1 Tela', valor:25 },
  { nome:'Plano Trimestral', telas:'1 Tela', valor:65 },
  { nome:'Plano Semestral + 1 mês', telas:'1 Tela', valor:125 },
  { nome:'Plano Anual + 2 meses', telas:'1 Tela', valor:250 },
  { nome:'Plano Mensal', telas:'2 Telas', valor:30 },
  { nome:'Plano Trimestral', telas:'2 Telas', valor:80 },
  { nome:'Plano Semestral + 1 mês', telas:'2 Telas', valor:160 },
  { nome:'Plano Anual + 2 meses', telas:'2 Telas', valor:320 }
];
const moeda = valor => Number(valor).toLocaleString('pt-BR', {style:'currency',currency:'BRL'});
const $ = id => document.getElementById(id);
const parametros = new URLSearchParams(location.search);
const plano = PLANOS.find(item => item.nome === parametros.get('plano') && item.telas === parametros.get('telas'));

// Preços com cupom são informativos e devem ser conferidos com o vendedor:
// URL e cupons em sites estáticos podem ser alterados pelo visitante.
const valorInformado = Number(parametros.get('valor'));
const descontoPossivel = plano && plano.nome === 'Plano Mensal' &&
  ((plano.valor === 25 && valorInformado === 15) || (plano.valor === 30 && valorInformado === 20));
const valorExibido = plano ? (descontoPossivel ? valorInformado : plano.valor) : null;

const chaveConfigurada = CONFIG.chavePix.trim() && CONFIG.chavePix !== 'SUA_CHAVE_PIX_AQUI';
const recebedorConfigurado = CONFIG.nomeRecebedor.trim() && CONFIG.nomeRecebedor !== 'NOME DO RECEBEDOR';
const pronto = chaveConfigurada && recebedorConfigurado;
$('configurationWarning').hidden = Boolean(pronto);
$('recipientName').textContent = recebedorConfigurado ? CONFIG.nomeRecebedor : 'Nome do recebedor';
$('recipientType').textContent = `${CONFIG.instituicao} · ${CONFIG.tipoChave}`;
$('avatar').textContent = recebedorConfigurado ? CONFIG.nomeRecebedor.trim().charAt(0).toUpperCase() : 'R';
$('pixKey').value = chaveConfigurada ? CONFIG.chavePix : 'Configure sua chave Pix no arquivo checkout.js';
$('displayKey').textContent = $('pixKey').value;
$('copyButton').disabled = !pronto;
$('year').textContent = new Date().getFullYear();
if (plano) {
  $('planName').textContent = plano.nome;
  $('screenCount').textContent = `${plano.telas} · GOLDPLAY TV`;
  $('orderValue').textContent = moeda(valorExibido);
  $('totalValue').textContent = moeda(valorExibido);
  $('orderHelp').textContent = descontoPossivel
    ? 'Preço promocional informado no navegador. Confirme o desconto com o atendente antes de pagar.'
    : 'Confira este valor no aplicativo do banco antes de confirmar.';
} else {
  $('orderHelp').textContent = 'Nenhum plano selecionado. Volte à página inicial para escolher um plano.';
}
const mensagem = plano
  ? `Olá! Fiz o pagamento via Pix do ${plano.nome} (${plano.telas}), valor informado ${moeda(valorExibido)}. Segue o comprovante:`
  : 'Olá! Fiz um pagamento via Pix e gostaria de enviar meu comprovante.';
$('whatsappLink').href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensagem)}`;

async function copiar(texto) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(texto);
  } else {
    const input = $('pixKey');
    input.focus(); input.select();
    if (!document.execCommand('copy')) throw new Error('Cópia não suportada');
    input.setSelectionRange(0, 0);
  }
}
let toastTimer;
function showToast(message) {
  const toast = $('toast');
  toast.textContent = message;
  toast.classList.add('open');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('open'), 3200);
}
$('copyButton').addEventListener('click', async () => {
  if (!pronto) return;
  try {
    await copiar(CONFIG.chavePix);
    $('feedback').textContent = '✓ Chave copiada! Confira os dados no banco antes de pagar.';
    $('feedback').className = 'copy-note success';
    $('copyLabel').textContent = 'CHAVE COPIADA!';
    $('copyIcon').textContent = '✓';
    showToast('✓ Chave Pix copiada para a área de transferência');
    setTimeout(() => { $('copyLabel').textContent = 'COPIAR CHAVE PIX'; $('copyIcon').textContent = '▣'; }, 3000);
  } catch {
    $('feedback').textContent = 'Não foi possível copiar automaticamente. Selecione e copie a chave manualmente.';
    $('feedback').className = 'copy-note error';
    $('pixKey').style.position = 'static';
    $('pixKey').style.width = '100%';
    $('pixKey').style.height = 'auto';
    $('pixKey').style.marginTop = '10px';
    $('pixKey').focus(); $('pixKey').select();
  }
});
