# PH TV DO FUTURO — Site com checkout Pix

Site estático para GitHub Pages, com planos exclusivos de **1 tela**. Sem cupons de desconto e sem links de Instagram ou TikTok.

## Planos
- Mensal: R$ 25
- Trimestral: R$ 65
- Semestral + 1 mês: R$ 125
- Anual + 2 meses: R$ 250

## Publicação no GitHub Pages
Envie `index.html`, `style.css`, `checkout.html`, `checkout.css` e `checkout.js` para a raiz do repositório. Ative GitHub Pages em **Settings > Pages > Deploy from a branch > main > / (root)**.

## Personalização
No começo de `checkout.js`, configure os dados de Pix e o número do WhatsApp. Atualize também a constante `WHATSAPP` no script do `index.html` para manter os contatos iguais. Os dados atuais foram preservados do projeto enviado.

## Pagamentos
O botão copia uma **chave Pix**, não gera cobrança automática nem QR Code bancário. O comprador informa o valor no aplicativo bancário e envia o comprovante via WhatsApp. Confira o recebimento no extrato antes de liberar o serviço.

O vídeo explicativo original foi mantido. Caso mostre a marca anterior, substitua o URL do iframe no `index.html`.

## Paleta oficial PH TV DO FUTURO
Azul principal `#1769E8`, branco `#FFFFFF`, fundo claro `#F4F8FF`, texto azul-escuro `#172C49` e borda `#D6E4F5`. Aplicada nas páginas inicial e de checkout.
