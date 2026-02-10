import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReceivables, useDeleteReceivable, useMarkAsReceived } from '../hooks/useReceivables'
import { useCategoriesByType } from '../hooks/useCategories'
import { StatusBadge } from '../components/StatusBadge'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { EmptyState } from '../components/EmptyState'
import { formatCurrency, formatDate, getMonthRange } from '../lib/utils'
import type { FilterState } from '../types'
import { Plus, Pencil, Trash2, CheckCircle, Search, X } from 'lucide-react'

export function Receivables() {
    const { start, end } = getMonthRange()
    const [filters, setFilters] = useState<Partial<FilterState>>({
        startDate: start,
        endDate: end,
        status: 'all',
        categoryId: 'all',
        search: '',
    })
    const { data: receivables = [], isLoading } = useReceivables(filters)
    const { data: categories = [] } = useCategoriesByType('receivable')
    const deleteMutation = useDeleteReceivable()
    const markReceivedMutation = useMarkAsReceived()
    const navigate = useNavigate()

    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [receiveId, setReceiveId] = useState<string | null>(null)

    const total = receivables.reduce((sum, r) => sum + Number(r.amount), 0)

    const clearFilters = () => {
        setFilters({ startDate: start, endDate: end, status: 'all', categoryId: 'all', search: '' })
    }

    return (
        <>
            <div className="page-header">
                <div>
                    <h2 className="page-title">Contas a Receber</h2>
                    <p className="page-subtitle">Total: {formatCurrency(total)} ({receivables.length} registros)</p>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/app/receivables/new')}>
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
                            <option value="received">Recebido</option>
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
                ) : receivables.length === 0 ? (
                    <EmptyState
                        message="Nenhuma conta a receber encontrada."
                        action={
                            <button className="btn btn-primary" onClick={() => navigate('/app/receivables/new')}>
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
                                        <th>Cliente</th>
                                        <th>Categoria</th>
                                        <th>Vencimento</th>
                                        <th>Valor</th>
                                        <th>Status</th>
                                        <th style={{ textAlign: 'right' }}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {receivables.map((r) => (
                                        <tr key={r.id}>
                                            <td>{r.description}</td>
                                            <td style={{ color: r.customer_name ? 'var(--color-text)' : 'var(--color-text-muted)' }}>
                                                {r.customer_name ?? 'Avulsa'}
                                            </td>
                                            <td>
                                                {r.category && (
                                                    <>
                                                        <span className="color-dot" style={{ backgroundColor: r.category.color }} />
                                                        {r.category.name}
                                                    </>
                                                )}
                                            </td>
                                            <td>{formatDate(r.due_date)}</td>
                                            <td className="amount">{formatCurrency(Number(r.amount))}</td>
                                            <td><StatusBadge status={r.status} /></td>
                                            <td>
                                                <div className="table-actions">
                                                    {r.status !== 'received' && r.status !== 'cancelled' && (
                                                        <button
                                                            className="btn btn-ghost btn-icon"
                                                            title="Dar Baixa"
                                                            onClick={() => setReceiveId(r.id)}
                                                        >
                                                            <CheckCircle size={16} style={{ color: 'var(--color-success)' }} />
                                                        </button>
                                                    )}
                                                    <button
                                                        className="btn btn-ghost btn-icon"
                                                        title="Editar"
                                                        onClick={() => navigate(`/receivables/${r.id}`)}
                                                    >
                                                        <Pencil size={16} />
                                                    </button>
                                                    <button
                                                        className="btn btn-ghost btn-icon"
                                                        title="Excluir"
                                                        onClick={() => setDeleteId(r.id)}
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
                message="Tem certeza que deseja excluir esta conta a receber? Esta ação não pode ser desfeita."
                confirmLabel="Excluir"
                onConfirm={() => {
                    if (deleteId) deleteMutation.mutate(deleteId)
                    setDeleteId(null)
                }}
                onCancel={() => setDeleteId(null)}
            />

            <ConfirmDialog
                open={!!receiveId}
                title="Dar Baixa"
                message="Marcar esta conta como recebida? A data de recebimento será registrada como hoje."
                confirmLabel="Confirmar Recebimento"
                variant="primary"
                onConfirm={() => {
                    if (receiveId) markReceivedMutation.mutate(receiveId)
                    setReceiveId(null)
                }}
                onCancel={() => setReceiveId(null)}
            />
        </>
    )
}
