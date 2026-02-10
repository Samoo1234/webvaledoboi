import { getStatusLabel } from '../lib/utils'

interface StatusBadgeProps {
    status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
    return (
        <span className={`badge badge--${status}`}>
            <span className="badge-dot" />
            {getStatusLabel(status)}
        </span>
    )
}
