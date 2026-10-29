# PH TV DO FUTURO — Checkout Pix Premium

Site estático compatível com GitHub Pages. Inclui página inicial com **5 planos de 1 tela**, botão **Pagar com Pix** para cada plano e página de checkout responsiva.

## Planos atuais
- Mensal — R$ 35,00
- Bimestral — R$ 60,00 (economia de R$ 10,00)
- Trimestral — R$ 85,00 (economia de R$ 20,00)
- Semestral — R$ 170,00 (economia de R$ 40,00)
- Anual — R$ 300,00 (economia de R$ 120,00)

## Publicação
1. Extraia os arquivos da pasta para a **raiz** do seu repositório GitHub (de modo que `index.html` fique na raiz).
2. Em Settings > Pages, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. Abra o endereço fornecido pelo GitHub Pages e teste os planos, o botão de copiar a chave e o WhatsApp.

## Dados Pix
Edite o objeto `CONFIG` no começo do arquivo `checkout.js` para alterar chave, recebedor, banco ou WhatsApp.

## Pagamentos e limites
- A página disponibiliza **chave Pix aleatória copiável**.
- O valor do plano é mostrado para referência: o comprador deve digitá-lo no banco e conferir o titular.
- Pagamentos **não são confirmados automaticamente**. O comprovante enviado pelo WhatsApp deve ser verificado no extrato.
- Não inclua senhas, segredos ou tokens em arquivos públicos.
