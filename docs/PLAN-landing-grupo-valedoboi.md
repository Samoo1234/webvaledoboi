# PLAN: Landing Page — Grupo Vale do Boi

## Visão Geral

Landing page institucional pública para o **Grupo Vale do Boi**, apresentando as 3 empresas do grupo. Um ícone discreto dá acesso ao sistema financeiro interno (já existente).

---

## Estrutura do Grupo

| Empresa | Segmento |
|---------|----------|
| **TRValedoboi** | Transportadora de Bovinos |
| **Vale do Boi Distribuidora** | Distribuidora de Carnes |
| **Vale do Boi Açougue** | Açougue |

---

## Arquitetura de Rotas

```
/                → Landing Page (Hero + Empresas + Footer)
/transportadora  → Página completa TRValedoboi
/distribuidora   → Página completa Distribuidora
/acougue         → Página completa Açougue
/login           → Login do sistema financeiro (já existe)
/                → Dashboard financeiro (após login, rota protegida)
```

> **Decisão**: A rota `/` muda de comportamento. Hoje vai direto ao Dashboard (se logado). 
> Nova lógica: `/` = Landing sempre. Dashboard move para `/app`.

### Mapeamento de Rotas (antes → depois)

| Antes | Depois |
|-------|--------|
| `/` (Dashboard) | `/app` (Dashboard) |
| `/payables` | `/app/payables` |
| `/receivables` | `/app/receivables` |
| `/categories` | `/app/categories` |
| `/suppliers` | `/app/suppliers` |
| `/login` | `/login` (sem mudança) |
| — | `/` (Landing - NOVA) |
| — | `/transportadora` (NOVA) |
| — | `/distribuidora` (NOVA) |
| — | `/acougue` (NOVA) |

---

## Design & Identidade Visual

- **Cores**: Vermelho sangue (#8B0000) + Branco (#FFFFFF) — mesmo do sistema
- **Logos**: Placeholder (espaço reservado) — usuário insere depois
- **Ícone de acesso**: Ícone discreto (ex: `Lock` ou `Settings`) no canto do footer ou header, leva ao `/login`
- **Fotos**: Placeholder com `generate_image` ou imagens genéricas

---

## Páginas

### 1. Landing Page (`/`)

| Seção | Conteúdo |
|-------|----------|
| **Header** | Logo Grupo Vale do Boi + menu (Transportadora, Distribuidora, Açougue) + ícone discreto login |
| **Hero** | Banner grande, nome do grupo, tagline, fundo vermelho sangue |
| **Empresas** | 3 cards grandes com foto, nome, descrição curta, botão "Saiba mais" → página da empresa |
| **Sobre** | Breve história do grupo |
| **Footer** | Contato geral, endereço, redes sociais, ícone discreto de acesso ao sistema |

### 2. Página de Empresa (`/transportadora`, `/distribuidora`, `/acougue`)

Cada página segue o mesmo template:

| Seção | Conteúdo |
|-------|----------|
| **Hero** | Banner com nome da empresa + logo placeholder |
| **Sobre** | Descrição da empresa |
| **Serviços** | Lista/grid dos serviços oferecidos |
| **Galeria** | Fotos (placeholders) |
| **Contato** | Telefone, email, endereço, mapa (embed Google Maps placeholder) |
| **CTA** | Botão de contato (WhatsApp ou formulário) |

---

## Arquivos a Criar

### Novos Componentes
- `src/components/LandingHeader.tsx` — Header público com nav
- `src/components/LandingFooter.tsx` — Footer público com ícone de acesso

### Novas Páginas
- `src/pages/Landing.tsx` — Página principal do grupo
- `src/pages/Transportadora.tsx` — Página TRValedoboi
- `src/pages/Distribuidora.tsx` — Página Distribuidora de Carnes
- `src/pages/Acougue.tsx` — Página Açougue

### Estilos
- `src/landing.css` — Estilos específicos da landing (separado do sistema)

### Modificados
- `src/App.tsx` — Reorganizar rotas (landing pública + `/app/*` protegido)

---

## Task Breakdown

### Fase 1: Reestruturação de Rotas
- [ ] Mover rotas do sistema financeiro para `/app/*`
- [ ] Criar rota `/` para Landing
- [ ] Criar rotas `/transportadora`, `/distribuidora`, `/acougue`
- [ ] Ajustar `ProtectedRoute` e `Layout` para funcionar sob `/app`

### Fase 2: Landing Page
- [ ] Criar `landing.css` (estilos landing-specific)
- [ ] Criar `LandingHeader.tsx` (nav + ícone discreto login)
- [ ] Criar `LandingFooter.tsx`
- [ ] Criar `Landing.tsx` (Hero, Cards das empresas, Sobre, Footer)

### Fase 3: Páginas das Empresas
- [ ] Criar template reutilizável `CompanyPage` (Hero, Sobre, Serviços, Galeria, Contato)
- [ ] Criar `Transportadora.tsx` com dados da TRValedoboi
- [ ] Criar `Distribuidora.tsx` com dados da Distribuidora
- [ ] Criar `Acougue.tsx` com dados do Açougue

### Fase 4: Polish
- [ ] Animações de scroll (fade-in)
- [ ] Responsividade mobile
- [ ] Gerar imagens placeholder com AI
- [ ] Testar fluxo completo: Landing → Empresa → Login → Dashboard

---

## Verificação

- [ ] `/` abre a landing page pública
- [ ] Navegação entre empresas funciona
- [ ] Ícone discreto leva ao `/login`
- [ ] Após login, dashboard abre em `/app`
- [ ] Todas as rotas do sistema financeiro funcionam sob `/app/*`
- [ ] Responsivo em mobile
- [ ] Logo placeholders visíveis e fáceis de substituir
