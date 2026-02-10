import { Inbox } from 'lucide-react'

interface EmptyStateProps {
    message?: string
    action?: React.ReactNode
}

export function EmptyState({ message = 'Nenhum registro encontrado.', action }: EmptyStateProps) {
    return (
        <div className="empty-state">
            <Inbox />
            <p>{message}</p>
            {action}
        </div>
    )
}
