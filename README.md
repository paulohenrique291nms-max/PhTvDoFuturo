# GOLDPLAY TV — Checkout Pix Premium

Site estático compatível com GitHub Pages. Inclui página inicial com 8 planos, botão **Pagar com Pix** para cada plano e nova página de checkout responsiva.

## Publicação
1. Extraia os arquivos da pasta `goldplay-pix` para a **raiz** do seu repositório GitHub (de modo que `index.html` fique na raiz).
2. Em Settings > Pages, escolha Deploy from a branch, branch `main`, pasta `/ (root)`.
3. Abra o endereço fornecido pelo GitHub Pages e teste os planos, o botão de copiar a chave e o WhatsApp.

## Dados Pix
Edite o objeto `CONFIG` no começo do arquivo `checkout.js` para alterar chave, recebedor, banco ou WhatsApp.

## Pagamentos e limites
- A página disponibiliza **chave Pix aleatória copiável** (não é um código Pix Copia e Cola EMV, nem gera QR Code bancário).
- O valor do plano é mostrado para referência: o comprador deve digitá-lo no banco e conferir o titular.
- Pagamentos **não são confirmados automaticamente**. O comprovante enviado pelo WhatsApp deve ser verificado no extrato.
- Cupons e preços no navegador/GitHub Pages não têm validação segura no servidor: confira preços promocionais com o atendimento antes da cobrança.
- Não inclua senhas, segredos ou tokens em arquivos públicos.

## Ordem do checkout

Na página `checkout.html`, as ações de pagamento são apresentadas na sequência: **1. Copiar a chave Pix**, **2. Informações do recebedor**, **3. Enviar o comprovante por WhatsApp**. A confirmação do pagamento é manual.

## Layout atualizado
O resumo do pedido aparece antes de “01 FINALIZE SEU PEDIDO”. O checkout inicia diretamente em “1. COPIE SUA CHAVE PIX”, sem o antigo bloco “Pix, sem complicação” e sem valor duplicado.
