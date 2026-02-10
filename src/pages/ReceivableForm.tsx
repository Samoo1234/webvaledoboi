import { useState, useEffect, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useReceivable, useCreateReceivable, useUpdateReceivable } from '../hooks/useReceivables'
import { useCategoriesByType } from '../hooks/useCategories'
import { parseCurrencyInput, formatCurrencyInput } from '../lib/utils'
import { ArrowLeft, Save } from 'lucide-react'

export function ReceivableForm() {
    const { id } = useParams()
    const isEdit = !!id
    const navigate = useNavigate()

    const { data: existing } = useReceivable(id)
    const { data: categories = [] } = useCategoriesByType('receivable')
    const createMutation = useCreateReceivable()
    const updateMutation = useUpdateReceivable()

    const [description, setDescription] = useState('')
    const [amountStr, setAmountStr] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [notes, setNotes] = useState('')
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (existing) {
            setDescription(existing.description)
            setAmountStr(formatCurrencyInput(Number(existing.amount)))
            setDueDate(existing.due_date)
            setCategoryId(existing.category_id ?? '')
            setCustomerName(existing.customer_name ?? '')
            setNotes(existing.notes ?? '')
        }
    }, [existing])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)

        const amount = parseCurrencyInput(amountStr)
        if (amount <= 0) {
            setError('Informe um valor válido.')
            return
        }

        const payload = {
            description,
            amount,
            due_date: dueDate,
            category_id: categoryId || null,
            customer_name: customerName || null,
            notes: notes || null,
            status: 'pending' as const,
        }

        try {
            if (isEdit) {
                await updateMutation.mutateAsync({ id, ...payload })
            } else {
                await createMutation.mutateAsync(payload)
            }
            navigate('/app/receivables')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao salvar.')
        }
    }

    const saving = createMutation.isPending || updateMutation.isPending

    return (
        <>
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <button className="btn btn-ghost btn-icon" onClick={() => navigate('/app/receivables')}>
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <h2 className="page-title">{isEdit ? 'Editar Conta a Receber' : 'Nova Conta a Receber'}</h2>
                    </div>
                </div>
            </div>

            <div className="page-body">
                <div className="card">
                    <div className="card-body">
                        {error && <div className="login-error" style={{ marginBottom: 'var(--space-4)' }}>{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                                <label className="form-label" htmlFor="description">Descrição *</label>
                                <input
                                    id="description"
                                    className="form-input"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Ex: Venda para Cliente X"
                                    required
                                    autoFocus
                                />
                            </div>

                            <div className="form-row" style={{ marginBottom: 'var(--space-4)' }}>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="amount">Valor (R$) *</label>
                                    <input
                                        id="amount"
                                        className="form-input"
                                        value={amountStr}
                                        onChange={(e) => setAmountStr(e.target.value)}
                                        placeholder="0,00"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="dueDate">Vencimento *</label>
                                    <input
                                        id="dueDate"
                                        className="form-input"
                                        type="date"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row" style={{ marginBottom: 'var(--space-4)' }}>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="category">Categoria</label>
                                    <select
                                        id="category"
                                        className="form-select"
                                        value={categoryId}
                                        onChange={(e) => setCategoryId(e.target.value)}
                                    >
                                        <option value="">Sem categoria</option>
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="customerName">Cliente</label>
                                    <input
                                        id="customerName"
                                        className="form-input"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        placeholder="Nome do cliente (opcional)"
                                    />
                                </div>
                            </div>

                            <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                                <label className="form-label" htmlFor="notes">Observações</label>
                                <textarea
                                    id="notes"
                                    className="form-textarea"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Observações opcionais..."
                                />
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => navigate('/app/receivables')}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={saving}>
                                    <Save size={16} /> {saving ? 'Salvando...' : 'Salvar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
