import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { AccountPayable, FilterState } from '../types'
import { isOverdue } from '../lib/utils'

const QUERY_KEY = 'payables'

export function usePayables(filters?: Partial<FilterState>) {
    return useQuery({
        queryKey: [QUERY_KEY, filters],
        queryFn: async (): Promise<AccountPayable[]> => {
            let query = supabase
                .from('accounts_payable')
                .select('*, category:financial_categories(*), supplier:suppliers(*)')
                .order('due_date', { ascending: true })

            if (filters?.startDate) {
                query = query.gte('due_date', filters.startDate)
            }
            if (filters?.endDate) {
                query = query.lte('due_date', filters.endDate)
            }
            if (filters?.status && filters.status !== 'all') {
                query = query.eq('status', filters.status)
            }
            if (filters?.categoryId && filters.categoryId !== 'all') {
                query = query.eq('category_id', filters.categoryId)
            }
            if (filters?.search) {
                query = query.ilike('description', `%${filters.search}%`)
            }

            const { data, error } = await query
            if (error) throw error

            return (data as AccountPayable[]).map((item) => ({
                ...item,
                status: isOverdue(item.due_date, item.status) ? 'overdue' as const : item.status,
            }))
        },
    })
}

export function usePayable(id: string | undefined) {
    return useQuery({
        queryKey: [QUERY_KEY, id],
        queryFn: async (): Promise<AccountPayable> => {
            const { data, error } = await supabase
                .from('accounts_payable')
                .select('*, category:financial_categories(*), supplier:suppliers(*)')
                .eq('id', id!)
                .single()
            if (error) throw error
            return data as AccountPayable
        },
        enabled: !!id,
    })
}

export function useCreatePayable() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: async (payable: Partial<AccountPayable>) => {
            const { category, supplier, ...rest } = payable
            void category
            void supplier
            const { data, error } = await supabase
                .from('accounts_payable')
                .insert(rest)
                .select()
                .single()
            if (error) throw error
            return data
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
    })
}

export function useUpdatePayable() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: async ({ id, ...updates }: Partial<AccountPayable> & { id: string }) => {
            const { category, supplier, ...rest } = updates
            void category
            void supplier
            const { data, error } = await supabase
                .from('accounts_payable')
                .update({ ...rest, updated_at: new Date().toISOString() })
                .eq('id', id)
                .select()
                .single()
            if (error) throw error
            return data
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
    })
}

export function useMarkAsPaid() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('accounts_payable')
                .update({
                    status: 'paid',
                    payment_date: new Date().toISOString().split('T')[0],
                    updated_at: new Date().toISOString(),
                })
                .eq('id', id)
            if (error) throw error
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
    })
}

export function useDeletePayable() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('accounts_payable')
                .delete()
                .eq('id', id)
            if (error) throw error
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
    })
}
