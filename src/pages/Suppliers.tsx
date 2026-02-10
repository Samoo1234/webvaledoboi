import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSuppliers, useDeleteSupplier } from '../hooks/useSuppliers'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { EmptyState } from '../components/EmptyState'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export function Suppliers() {
    const { data: suppliers = [], isLoading } = useSuppliers()
    const deleteMutation = useDeleteSupplier()
    const navigate = useNavigate()
    const [deleteId, setDeleteId] = useState<string | null>(null)

    return (
        <>
            <div className="page-header">
                <div>
                    <h2 className="page-title">Fornecedores</h2>
                    <p className="page-subtitle">{suppliers.length} fornecedores cadastrados</p>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/app/suppliers/new')}>
                    <Plus size={16} /> Novo Fornecedor
                </button>
            </div>

            <div className="page-body">
                {isLoading ? (
                    <div className="loading-container"><div className="spinner" /></div>
                ) : suppliers.length === 0 ? (
                    <EmptyState
                        message="Nenhum fornecedor cadastrado."
                        action={
                            <button className="btn btn-primary" onClick={() => navigate('/app/suppliers/new')}>
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
                                        <th>Nome</th>
                                        <th>CNPJ</th>
                                        <th>Telefone</th>
                                        <th>E-mail</th>
                                        <th>Cidade/UF</th>
                                        <th>Status</th>
                                        <th style={{ textAlign: 'right' }}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {suppliers.map((s) => (
                                        <tr key={s.id}>
                                            <td style={{ fontWeight: 500 }}>{s.name}</td>
                                            <td style={{ color: 'var(--color-text-secondary)' }}>{s.cnpj ?? '—'}</td>
                                            <td style={{ color: 'var(--color-text-secondary)' }}>{s.phone ?? '—'}</td>
                                            <td style={{ color: 'var(--color-text-secondary)' }}>{s.email ?? '—'}</td>
                                            <td style={{ color: 'var(--color-text-secondary)' }}>
                                                {s.city && s.state ? `${s.city}/${s.state}` : '—'}
                                            </td>
                                            <td>
                                                <span className={`badge ${s.active ? 'badge--paid' : 'badge--cancelled'}`}>
                                                    <span className="badge-dot" />
                                                    {s.active ? 'Ativo' : 'Inativo'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="table-actions">
                                                    <button
                                                        className="btn btn-ghost btn-icon"
                                                        title="Editar"
                                                        onClick={() => navigate(`/suppliers/${s.id}`)}
                                                    >
                                                        <Pencil size={16} />
                                                    </button>
                                                    <button
                                                        className="btn btn-ghost btn-icon"
                                                        title="Excluir"
                                                        onClick={() => setDeleteId(s.id)}
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
                title="Excluir fornecedor"
                message="Tem certeza que deseja excluir este fornecedor?"
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
