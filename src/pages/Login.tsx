import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { DollarSign } from 'lucide-react'

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const { signIn } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        const { error: signInError } = await signIn(email, password)
        if (signInError) {
            setError(signInError)
            setLoading(false)
        } else {
            navigate('/app')
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                    <div className="logo-icon" style={{ width: 48, height: 48 }}>
                        <DollarSign size={24} />
                    </div>
                </div>
                <h1>Financeiro</h1>
                <p className="login-subtitle">Contas a Pagar e Receber</p>

                {error && <div className="login-error">{error}</div>}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            className="form-input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            required
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Senha</label>
                        <input
                            id="password"
                            className="form-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                    </div>

                    <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', marginTop: 'var(--space-2)' }}>
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    )
}
