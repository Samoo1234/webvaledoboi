import { usePayables } from '../hooks/usePayables'
import { useReceivables } from '../hooks/useReceivables'
import { formatCurrency, formatDate, getMonthRange } from '../lib/utils'
import { StatusBadge } from '../components/StatusBadge'
import { ArrowDownCircle, ArrowUpCircle, TrendingUp, AlertTriangle } from 'lucide-react'

export function Dashboard() {
    const { start, end } = getMonthRange()
    const { data: payables = [] } = usePayables({ startDate: start, endDate: end })
    const { data: receivables = [] } = useReceivables({ startDate: start, endDate: end })

    const totalPayable = payables
        .filter((p) => p.status === 'pending' || p.status === 'overdue')
        .reduce((sum, p) => sum + Number(p.amount), 0)

    const totalReceivable = receivables
        .filter((r) => r.status === 'pending' || r.status === 'overdue')
        .reduce((sum, r) => sum + Number(r.amount), 0)

    const paidThisMonth = payables
        .filter((p) => p.status === 'paid')
        .reduce((sum, p) => sum + Number(p.amount), 0)

    const receivedThisMonth = receivables
        .filter((r) => r.status === 'received')
        .reduce((sum, r) => sum + Number(r.amount), 0)

    const overduePayables = payables.filter((p) => p.status === 'overdue')
    const overdueReceivables = receivables.filter((r) => r.status === 'overdue')
    const overdueCount = overduePayables.length + overdueReceivables.length

    const balance = totalReceivable - totalPayable

    const upcoming = [
        ...payables
            .filter((p) => p.status === 'pending')
            .map((p) => ({ ...p, type: 'payable' as const })),
        ...receivables
            .filter((r) => r.status === 'pending')
            .map((r) => ({ ...r, type: 'receivable' as const })),
    ]
        .sort((a, b) => a.due_date.localeCompare(b.due_date))
        .slice(0, 8)

    const now = new Date()
    const monthName = now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })

    return (
        <>
            <div className="page-header">
                <div>
                    <h2 className="page-title">Dashboard</h2>
                    <p className="page-subtitle">Resumo financeiro — {monthName}</p>
                </div>
            </div>

            <div className="page-body">
                <div className="summary-grid">
                    <div className="summary-card summary-card--danger">
                        <div className="summary-card-header">
                            <span className="summary-card-label">A Pagar</span>
                            <div className="summary-card-icon">
                                <ArrowDownCircle />
                            </div>
                        </div>
                        <span className="summary-card-value">{formatCurrency(totalPayable)}</span>
                    </div>

                    <div className="summary-card summary-card--success">
                        <div className="summary-card-header">
                            <span className="summary-card-label">A Receber</span>
                            <div className="summary-card-icon">
                                <ArrowUpCircle />
                            </div>
                        </div>
                        <span className="summary-card-value">{formatCurrency(totalReceivable)}</span>
                    </div>

                    <div className={`summary-card ${balance >= 0 ? 'summary-card--info' : 'summary-card--danger'}`}>
                        <div className="summary-card-header">
                            <span className="summary-card-label">Saldo Previsto</span>
                            <div className="summary-card-icon">
                                <TrendingUp />
                            </div>
                        </div>
                        <span className="summary-card-value">{formatCurrency(balance)}</span>
                    </div>

                    <div className={`summary-card ${overdueCount > 0 ? 'summary-card--warning' : 'summary-card--success'}`}>
                        <div className="summary-card-header">
                            <span className="summary-card-label">Vencidas</span>
                            <div className="summary-card-icon">
                                <AlertTriangle />
                            </div>
                        </div>
                        <span className="summary-card-value">{overdueCount}</span>
                    </div>
                </div>

                <div className="summary-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <div className="summary-card">
                        <span className="summary-card-label">Pago este mês</span>
                        <span className="summary-card-value" style={{ color: 'var(--color-danger)', fontSize: 'var(--font-size-lg)' }}>
                            {formatCurrency(paidThisMonth)}
                        </span>
                    </div>
                    <div className="summary-card">
                        <span className="summary-card-label">Recebido este mês</span>
                        <span className="summary-card-value" style={{ color: 'var(--color-success)', fontSize: 'var(--font-size-lg)' }}>
                            {formatCurrency(receivedThisMonth)}
                        </span>
                    </div>
                </div>

                <div className="card" style={{ marginTop: 'var(--space-2)' }}>
                    <div className="card-body">
                        <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                            Próximas Contas
                        </h3>

                        {upcoming.length === 0 ? (
                            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                                Nenhuma conta pendente neste mês.
                            </p>
                        ) : (
                            <div className="table-container">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Tipo</th>
                                            <th>Descrição</th>
                                            <th>Vencimento</th>
                                            <th>Valor</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {upcoming.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <span style={{
                                                        color: item.type === 'payable' ? 'var(--color-danger)' : 'var(--color-success)',
                                                        fontWeight: 600,
                                                        fontSize: 'var(--font-size-xs)',
                                                    }}>
                                                        {item.type === 'payable' ? '↓ PAGAR' : '↑ RECEBER'}
                                                    </span>
                                                </td>
                                                <td>{item.description}</td>
                                                <td>{formatDate(item.due_date)}</td>
                                                <td className="amount">{formatCurrency(Number(item.amount))}</td>
                                                <td><StatusBadge status={item.status} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
