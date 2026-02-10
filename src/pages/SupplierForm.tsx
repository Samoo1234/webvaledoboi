import { useState, useEffect, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSupplier, useCreateSupplier, useUpdateSupplier } from '../hooks/useSuppliers'
import { ArrowLeft, Save } from 'lucide-react'

export function SupplierForm() {
    const { id } = useParams()
    const isEdit = !!id
    const navigate = useNavigate()

    const { data: existing } = useSupplier(id)
    const createMutation = useCreateSupplier()
    const updateMutation = useUpdateSupplier()

    const [name, setName] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [notes, setNotes] = useState('')
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (existing) {
            setName(existing.name)
            setCnpj(existing.cnpj ?? '')
            setPhone(existing.phone ?? '')
            setEmail(existing.email ?? '')
            setAddress(existing.address ?? '')
            setCity(existing.city ?? '')
            setState(existing.state ?? '')
            setNotes(existing.notes ?? '')
        }
    }, [existing])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)

        const payload = {
            name,
            cnpj: cnpj || null,
            phone: phone || null,
            email: email || null,
            address: address || null,
            city: city || null,
            state: state || null,
            notes: notes || null,
            active: true,
        }

        try {
            if (isEdit) {
                await updateMutation.mutateAsync({ id, ...payload })
            } else {
                await createMutation.mutateAsync(payload)
            }
            navigate('/app/suppliers')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao salvar.')
        }
    }

    const saving = createMutation.isPending || updateMutation.isPending

    return (
        <>
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <button className="btn btn-ghost btn-icon" onClick={() => navigate('/app/suppliers')}>
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <h2 className="page-title">{isEdit ? 'Editar Fornecedor' : 'Novo Fornecedor'}</h2>
                    </div>
                </div>
            </div>

            <div className="page-body">
                <div className="card">
                    <div className="card-body">
                        {error && <div className="login-error" style={{ marginBottom: 'var(--space-4)' }}>{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="form-row" style={{ marginBottom: 'var(--space-4)' }}>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="name">Nome *</label>
                                    <input
                                        id="name"
                                        className="form-input"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Nome do fornecedor"
                                        required
                                        autoFocus
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="cnpj">CNPJ</label>
                                    <input
                                        id="cnpj"
                                        className="form-input"
                                        value={cnpj}
                                        onChange={(e) => setCnpj(e.target.value)}
                                        placeholder="00.000.000/0000-00"
                                    />
                                </div>
                            </div>

                            <div className="form-row" style={{ marginBottom: 'var(--space-4)' }}>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="phone">Telefone</label>
                                    <input
                                        id="phone"
                                        className="form-input"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="(00) 00000-0000"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email">E-mail</label>
                                    <input
                                        id="email"
                                        className="form-input"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="contato@fornecedor.com"
                                    />
                                </div>
                            </div>

                            <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                                <label className="form-label" htmlFor="address">Endereço</label>
                                <input
                                    id="address"
                                    className="form-input"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Rua, número, bairro"
                                />
                            </div>

                            <div className="form-row" style={{ marginBottom: 'var(--space-4)' }}>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="city">Cidade</label>
                                    <input
                                        id="city"
                                        className="form-input"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder="Cidade"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="state">UF</label>
                                    <input
                                        id="state"
                                        className="form-input"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        placeholder="SP"
                                        maxLength={2}
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
                                <button type="button" className="btn btn-secondary" onClick={() => navigate('/app/suppliers')}>
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
