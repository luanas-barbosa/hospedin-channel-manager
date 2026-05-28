# Hospedin Channel Manager — Protótipo

Protótipo navegável da área de administração do Channel Manager nativo do PMS Hospedin.

## Desenvolvimento local

```bash
npm install
npm run dev
```

Acesse: http://localhost:5173

## Deploy no Vercel

### Opção A — Via CLI (mais rápido)
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Opção B — Via GitHub
1. Push do projeto para um repositório GitHub
2. Acesse vercel.com → "Add New Project" → importe o repositório
3. Vercel detecta Vite automaticamente — clique em "Deploy"
4. URL pública gerada em ~60 segundos

## Rotas disponíveis

| Rota | Descrição |
|------|-----------|
| `/canais` | Lista de canais com cards de status |
| `/canais/booking` | Painel Booking.com (Visão geral, Mapeamento, Logs, Configurações) |
| `/canais/booking/conectar` | Wizard de conexão (4 passos) |
| `/canais/airbnb` | Painel Airbnb |
| `/canais/reservas` | Central de reservas |
| `/canais/dashboard` | Dashboard do hoteleiro |

## Stack

- React 18 + Vite
- React Router v6
- Lucide React (ícones)
- Tailwind CSS via CDN
- Google Fonts: Montserrat + Open Sans
- Dados 100% mockados (sem API)
