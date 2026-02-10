import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePayables, useDeletePayable, useMarkAsPaid } from '../hooks/usePayables'
import { useCategoriesByType } from '../hooks/useCategories'
import { StatusBadge } from '../components/StatusBadge'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { EmptyState } from '../components/EmptyState'
import { formatCurrency, formatDate, getMonthRange } from '../lib/utils'
import type { FilterState } from '../types'
import { Plus, Pencil, Trash2, CheckCircle, Search, X } from 'lucide-react'

export function Payables() {
    const { start, end } = getMonthRange()
    const [filters, setFilters] = useState<Partial<FilterState>>({
        startDate: start,
        endDate: end,
        status: 'all',
        categoryId: 'all',
        search: '',
    })
    const { data: payables = [], isLoading } = usePayables(filters)
    const { data: categories = [] } = useCategoriesByType('payable')
    const deleteMutation = useDeletePayable()
    const markAsPaidMutation = useMarkAsPaid()
    const navigate = useNavigate()

    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [payId, setPayId] = useState<string | null>(null)

    const total = payables.reduce((sum, p) => sum + Number(p.amount), 0)

    const clearFilters = () => {
        setFilters({ startDate: start, endDate: end, status: 'all', categoryId: 'all', search: '' })
    }

    return (
        <>
            <div className="page-header">
                <div>
                    <h2 className="page-title">Contas a Pagar</h2>
                    <p className="page-subtitle">Total: {formatCurrency(total)} ({payables.length} registros)</p>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/app/payables/new')}>
                    <Plus size={16} /> Nova Conta
                </button>
            </div>

            <div className="page-body">
                <div className="filter-bar">
                    <div className="form-group">
                        <label className="form-label">De</label>
                        <input
                            className="form-input"
                            type="date"
                            value={filters.startDate ?? ''}
                            onChange={(e) => setFilters((f) => ({ ...f, startDate: e.target.value }))}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Até</label>
                        <input
                            className="form-input"
                            type="date"
                            value={filters.endDate ?? ''}
                            onChange={(e) => setFilters((f) => ({ ...f, endDate: e.target.value }))}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Status</label>
                        <select
                            className="form-select"
                            value={filters.status ?? 'all'}
                            onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
                        >
                            <option value="all">Todos</option>
                            <option value="pending">Pendente</option>
                            <option value="paid">Pago</option>
                            <option value="overdue">Vencido</option>
                            <option value="cancelled">Cancelado</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Categoria</label>
                        <select
                            className="form-select"
                            value={filters.categoryId ?? 'all'}
                            onChange={(e) => setFilters((f) => ({ ...f, categoryId: e.target.value }))}
                        >
                            <option value="all">Todas</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Buscar</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                className="form-input"
                                type="text"
                                placeholder="Descrição..."
                                value={filters.search ?? ''}
                                onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                            />
                            <Search size={14} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                        </div>
                    </div>
                    <div className="filter-actions">
                        <button className="btn btn-ghost btn-sm" onClick={clearFilters}>
                            <X size={14} /> Limpar
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="loading-container"><div className="spinner" /></div>
                ) : payables.length === 0 ? (
                    <EmptyState
                        message="Nenhuma conta a pagar encontrada."
                        action={
                            <button className="btn btn-primary" onClick={() => navigate('/app/payables/new')}>
                                <Plus size={16} /> Adicionar
                            </button>
                        }
                    />
                ) : (
                    <div className="card">
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Descrição</th>
                                        <th>Fornecedor</th>
                                        <th>Categoria</th>
                                        <th>Vencimento</th>
                                        <th>Valor</th>
                                        <th>Status</th>
                                        <th style={{ textAlign: 'right' }}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payables.map((p) => (
                                        <tr key={p.id}>
                                            <td>{p.description}</td>
                                            <td style={{ color: p.supplier?.name ? 'var(--color-text)' : 'var(--color-text-muted)' }}>
                                                {p.supplier?.name ?? 'Avulsa'}
                                            </td>
                                            <td>
                                                {p.category && (
                                                    <>
                                                        <span className="color-dot" style={{ backgroundColor: p.category.color }} />
                                                        {p.category.name}
                                                    </>
                                                )}
                                            </td>
                                            <td>{formatDate(p.due_date)}</td>
                                            <td className="amount">{formatCurrency(Number(p.amount))}</td>
                                            <td><StatusBadge status={p.status} /></td>
                                            <td>
                                                <div className="table-actions">
                                                    {p.status !== 'paid' && p.status !== 'cancelled' && (
                                                        <button
                                                            className="btn btn-ghost btn-icon"
                                                            title="Dar Baixa"
                                                            onClick={() => setPayId(p.id)}
                                                        >
                                                            <CheckCircle size={16} style={{ color: 'var(--color-success)' }} />
                                                        </button>
                                                    )}
                                                    <button
                                                        className="btn btn-ghost btn-icon"
                                                        title="Editar"
                                                        onClick={() => navigate(`/app/payables/${p.id}`)}
                                                    >
                                                        <Pencil size={16} />
                                                    </button>
                                                    <button
                                                        className="btn btn-ghost btn-icon"
                                                        title="Excluir"
                                                        onClick={() => setDeleteId(p.id)}
                                                    >
                                                        <Trash2 size={16} style={{ color: 'var(--color-danger)' }} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            <ConfirmDialog
                open={!!deleteId}
                title="Excluir conta"
                message="Tem certeza que deseja excluir esta conta a pagar? Esta ação não pode ser desfeita."
                confirmLabel="Excluir"
                onConfirm={() => {
                    if (deleteId) deleteMutation.mutate(deleteId)
                    setDeleteId(null)
                }}
                onCancel={() => setDeleteId(null)}
            />

            <ConfirmDialog
                open={!!payId}
                title="Dar Baixa"
                message="Marcar esta conta como paga? A data de pagamento será registrada como hoje."
                confirmLabel="Confirmar Pagamento"
                variant="primary"
                onConfirm={() => {
                    if (payId) markAsPaidMutation.mutate(payId)
                    setPayId(null)
                }}
                onCancel={() => setPayId(null)}
            />
        </>
    )
}
