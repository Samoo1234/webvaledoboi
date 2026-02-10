export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value)
}

export function formatDate(dateStr: string): string {
    const date = new Date(dateStr + 'T00:00:00')
    return new Intl.DateTimeFormat('pt-BR').format(date)
}

export function parseCurrencyInput(value: string): number {
    const cleaned = value.replace(/[^\d,]/g, '').replace(',', '.')
    const parsed = parseFloat(cleaned)
    return isNaN(parsed) ? 0 : parsed
}

export function formatCurrencyInput(value: number): string {
    if (value === 0) return ''
    return value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}

export function getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
        pending: 'Pendente',
        paid: 'Pago',
        received: 'Recebido',
        overdue: 'Vencido',
        cancelled: 'Cancelado',
    }
    return labels[status] ?? status
}

export function getStatusColor(status: string): string {
    const colors: Record<string, string> = {
        pending: 'var(--color-warning)',
        paid: 'var(--color-success)',
        received: 'var(--color-success)',
        overdue: 'var(--color-danger)',
        cancelled: 'var(--color-muted)',
    }
    return colors[status] ?? 'var(--color-muted)'
}

export function getMonthRange(date: Date = new Date()): { start: string; end: string } {
    const year = date.getFullYear()
    const month = date.getMonth()
    const start = new Date(year, month, 1).toISOString().split('T')[0]!
    const end = new Date(year, month + 1, 0).toISOString().split('T')[0]!
    return { start, end }
}

export function isOverdue(dueDate: string, status: string): boolean {
    if (status === 'paid' || status === 'received' || status === 'cancelled') return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const due = new Date(dueDate + 'T00:00:00')
    return due < today
}

export function cn(...classes: (string | undefined | false)[]): string {
    return classes.filter(Boolean).join(' ')
}
