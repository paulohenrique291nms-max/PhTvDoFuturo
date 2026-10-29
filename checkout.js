/* ===========================================================
   CONFIGURE AQUI ANTES DE PUBLICAR NO GITHUB PAGES.
   Substitua os valores abaixo pelos dados REAIS de quem recebe.
   Nunca coloque senhas, tokens ou dados bancários sigilosos.
   =========================================================== */
const CONFIG = {
  chavePix: 'e3965777-b906-4c6a-8d9c-3f9f9113def7',
  nomeRecebedor: 'Paulo Henrique C Alvarenga',
  tipoChave: 'Chave aleatória',
  instituicao: 'Itaú Unibanco S.A',
  whatsapp: '5562999288729'
};

const PLANOS = [
  { nome:'Mensal', telas:'1 Tela', valor:35 },
  { nome:'Bimestral', telas:'1 Tela', valor:60 },
  { nome:'Trimestral', telas:'1 Tela', valor:85 },
  { nome:'Semestral', telas:'1 Tela', valor:170 },
  { nome:'Anual', telas:'1 Tela', valor:300 }
];
const moeda = valor => Number(valor).toLocaleString('pt-BR', {style:'currency',currency:'BRL'});
const $ = id => document.getElementById(id);
const parametros = new URLSearchParams(location.search);
const plano = PLANOS.find(item => item.nome === parametros.get('plano') && item.telas === '1 Tela' && (!parametros.has('telas') || parametros.get('telas') === '1 Tela'));

const valorExibido = plano ? plano.valor : null;

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
  $('screenCount').textContent = `${plano.telas} · PH TV DO FUTURO`;
  $('orderValue').textContent = moeda(valorExibido);
  $('totalValue').textContent = moeda(valorExibido);
  $('orderHelp').textContent = 'Confira este valor no aplicativo do banco antes de confirmar.';
} else {
  $('orderHelp').textContent = 'Nenhum plano selecionado. Volte à página inicial para escolher um plano.';
}
const mensagem = plano
  ? `Olá! Fiz o pagamento via Pix do plano ${plano.nome} (${plano.telas}), valor informado ${moeda(valorExibido)}. Segue o comprovante:`
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
