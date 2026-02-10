-- ============================================
-- SCHEMA: Contas a Pagar e Receber
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- 1. Habilitar extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tabela: Categorias Financeiras
CREATE TABLE financial_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('payable', 'receivable', 'both')),
  description TEXT,
  color VARCHAR(7) NOT NULL DEFAULT '#6b7280',
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabela: Fornecedores
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  cnpj VARCHAR(20),
  phone VARCHAR(20),
  email VARCHAR(150),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(2),
  notes TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabela: Contas a Pagar
CREATE TABLE accounts_payable (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  description VARCHAR(300) NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  due_date DATE NOT NULL,
  payment_date DATE,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
  category_id UUID REFERENCES financial_categories(id) ON DELETE SET NULL,
  supplier_id UUID REFERENCES suppliers(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Tabela: Contas a Receber
CREATE TABLE accounts_receivable (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  description VARCHAR(300) NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  due_date DATE NOT NULL,
  receipt_date DATE,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'received', 'overdue', 'cancelled')),
  category_id UUID REFERENCES financial_categories(id) ON DELETE SET NULL,
  customer_name VARCHAR(200),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Índices
CREATE INDEX idx_payable_due_date ON accounts_payable(due_date);
CREATE INDEX idx_payable_status ON accounts_payable(status);
CREATE INDEX idx_receivable_due_date ON accounts_receivable(due_date);
CREATE INDEX idx_receivable_status ON accounts_receivable(status);

-- 7. Row Level Security (RLS)
-- Habilitar RLS em todas as tabelas
ALTER TABLE financial_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts_payable ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts_receivable ENABLE ROW LEVEL SECURITY;

-- Políticas: qualquer usuário autenticado pode fazer tudo (admin-only app)
CREATE POLICY "Authenticated users full access" ON financial_categories
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access" ON suppliers
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access" ON accounts_payable
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access" ON accounts_receivable
  FOR ALL USING (auth.role() = 'authenticated');

-- 8. Categorias iniciais (opcional)
INSERT INTO financial_categories (name, type, color, description) VALUES
  ('Aluguel', 'payable', '#f43f5e', 'Aluguel de imóveis e espaços'),
  ('Combustível', 'payable', '#f97316', 'Gastos com combustível'),
  ('Manutenção', 'payable', '#f59e0b', 'Manutenção de veículos e equipamentos'),
  ('Fornecedores', 'payable', '#8b5cf6', 'Compras de mercadorias'),
  ('Salários', 'payable', '#ec4899', 'Folha de pagamento'),
  ('Vendas', 'receivable', '#10b981', 'Receita de vendas'),
  ('Serviços', 'receivable', '#3b82f6', 'Receita de prestação de serviços'),
  ('Frete', 'both', '#14b8a6', 'Custos ou receitas de frete'),
  ('Outros', 'both', '#6b7280', 'Outras categorias');
