export type AccountStatus = 'pending' | 'paid' | 'overdue' | 'cancelled'
export type ReceivableStatus = 'pending' | 'received' | 'overdue' | 'cancelled'
export type CategoryType = 'payable' | 'receivable' | 'both'

export interface FinancialCategory {
    id: string
    name: string
    type: CategoryType
    description: string | null
    color: string
    active: boolean
    created_at: string
    updated_at: string
}

export interface Supplier {
    id: string
    name: string
    cnpj: string | null
    phone: string | null
    email: string | null
    address: string | null
    city: string | null
    state: string | null
    notes: string | null
    active: boolean
    created_at: string
    updated_at: string
}

export interface AccountPayable {
    id: string
    description: string
    amount: number
    due_date: string
    payment_date: string | null
    status: AccountStatus
    category_id: string | null
    supplier_id: string | null
    notes: string | null
    created_at: string
    updated_at: string
    category?: FinancialCategory
    supplier?: Supplier
}

export interface AccountReceivable {
    id: string
    description: string
    amount: number
    due_date: string
    receipt_date: string | null
    status: ReceivableStatus
    category_id: string | null
    customer_name: string | null
    notes: string | null
    created_at: string
    updated_at: string
    category?: FinancialCategory
}

export interface DashboardSummary {
    totalPayable: number
    totalReceivable: number
    balance: number
    overduePayable: number
    overdueReceivable: number
    paidThisMonth: number
    receivedThisMonth: number
}

export interface FilterState {
    startDate: string
    endDate: string
    status: string
    categoryId: string
    search: string
}
