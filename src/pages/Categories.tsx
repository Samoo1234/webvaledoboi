import { useState } from 'react'
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '../hooks/useCategories'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { EmptyState } from '../components/EmptyState'
import type { CategoryType } from '../types'
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react'

const TYPE_LABELS: Record<CategoryType, string> = {
    payable: 'Pagar',
    receivable: 'Receber',
    both: 'Ambos',
}

const PRESET_COLORS = ['#10b981', '#f59e0b', '#f43f5e', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16']

export function Categories() {
    const { data: categories = [], isLoading } = useCategories()
    const createMutation = useCreateCategory()
    const updateMutation = useUpdateCategory()
    const deleteMutation = useDeleteCategory()

    const [editingId, setEditingId] = useState<string | null>(null)
    const [showForm, setShowForm] = useState(false)
    const [deleteId, setDeleteId] = useState<string | null>(null)

    const [name, setName] = useState('')
    const [type, setType] = useState<CategoryType>('both')
    const [description, setDescription] = useState('')
    const [color, setColor] = useState(PRESET_COLORS[0]!)

    const resetForm = () => {
        setName('')
        setType('both')
        setDescription('')
        setColor(PRESET_COLORS[0]!)
        setEditingId(null)
        setShowForm(false)
    }

    const startEdit = (cat: { id: string; name: string; type: CategoryType; description: string | null; color: string }) => {
        setEditingId(cat.id)
        setName(cat.name)
        setType(cat.type)
        setDescription(cat.description ?? '')
        setColor(cat.color)
        setShowForm(true)
    }

    const handleSave = async () => {
        if (!name.trim()) return

        const payload = { name: name.trim(), type, description: description || null, color, active: true }

        if (editingId) {
            await updateMutation.mutateAsync({ id: editingId, ...payload })
        } else {
            await createMutation.mutateAsync(payload)
        }
        resetForm()
    }

    const saving = createMutation.isPending || updateMutation.isPending

    return (
        <>
            <div className="page-header">
                <div>
                    <h2 className="page-title">Categorias</h2>
                    <p className="page-subtitle">{categories.length} categorias cadastradas</p>
                </div>
                {!showForm && (
                    <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                        <Plus size={16} /> Nova Categoria
                    </button>
                )}
            </div>

            <div className="page-body">
                {showForm && (
                    <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
                        <div className="card-body">
                            <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                                {editingId ? 'Editar Categoria' : 'Nova Categoria'}
                            </h3>
                            <div className="form-row" style={{ marginBottom: 'var(--space-4)' }}>
                                <div className="form-group">
                                    <label className="form-label">Nome *</label>
                                    <input
                                        className="form-input"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Ex: Aluguel"
                                        autoFocus
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Tipo *</label>
                                    <select className="form-select" value={type} onChange={(e) => setType(e.target.value as CategoryType)}>
                                        <option value="both">Ambos (Pagar e Receber)</option>
                                        <option value="payable">Apenas Pagar</option>
                                        <option value="receivable">Apenas Receber</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                                <label className="form-label">Descrição</label>
                                <input
                                    className="form-input"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Descrição opcional..."
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                                <label className="form-label">Cor</label>
                                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                                    {PRESET_COLORS.map((c) => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => setColor(c)}
                                            style={{
                                                width: 28,
                                                height: 28,
                                                borderRadius: '50%',
                                                background: c,
                                                border: color === c ? '2px solid var(--color-text)' : '2px solid transparent',
                                                cursor: 'pointer',
                                                transition: 'border-color var(--transition-fast)',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="form-actions" style={{ marginTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)' }}>
                                <button className="btn btn-secondary" onClick={resetForm}>
                                    <X size={16} /> Cancelar
                                </button>
                                <button className="btn btn-primary" onClick={handleSave} disabled={saving || !name.trim()}>
                                    <Save size={16} /> {saving ? 'Salvando...' : 'Salvar'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {isLoading ? (
                    <div className="loading-container"><div className="spinner" /></div>
                ) : categories.length === 0 && !showForm ? (
                    <EmptyState message="Nenhuma categoria cadastrada." />
                ) : (
                    <div className="card">
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Cor</th>
                                        <th>Nome</th>
                                        <th>Tipo</th>
                                        <th>Descrição</th>
                                        <th>Status</th>
                                        <th style={{ textAlign: 'right' }}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((cat) => (
                                        <tr key={cat.id}>
                                            <td><span className="color-dot" style={{ backgroundColor: cat.color }} /></td>
                                            <td style={{ fontWeight: 500 }}>{cat.name}</td>
                                            <td>{TYPE_LABELS[cat.type]}</td>
                                            <td style={{ color: 'var(--color-text-secondary)' }}>{cat.description ?? '—'}</td>
                                            <td>
                                                <span className={`badge ${cat.active ? 'badge--paid' : 'badge--cancelled'}`}>
                                                    <span className="badge-dot" />
                                                    {cat.active ? 'Ativa' : 'Inativa'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="table-actions">
                                                    <button className="btn btn-ghost btn-icon" title="Editar" onClick={() => startEdit(cat)}>
                                                        <Pencil size={16} />
                                                    </button>
                                                    <button className="btn btn-ghost btn-icon" title="Excluir" onClick={() => setDeleteId(cat.id)}>
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
                title="Excluir categoria"
                message="Tem certeza? Contas vinculadas a esta categoria ficarão sem categoria."
                confirmLabel="Excluir"
                onConfirm={() => {
                    if (deleteId) deleteMutation.mutate(deleteId)
                    setDeleteId(null)
                }}
                onCancel={() => setDeleteId(null)}
            />
        </>
    )
}
