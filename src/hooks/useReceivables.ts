import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { AccountReceivable, FilterState } from '../types'
import { isOverdue } from '../lib/utils'

const QUERY_KEY = 'receivables'

export function useReceivables(filters?: Partial<FilterState>) {
    return useQuery({
        queryKey: [QUERY_KEY, filters],
        queryFn: async (): Promise<AccountReceivable[]> => {
            let query = supabase
                .from('accounts_receivable')
                .select('*, category:financial_categories(*)')
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

            return (data as AccountReceivable[]).map((item) => ({
                ...item,
                status: isOverdue(item.due_date, item.status) ? 'overdue' as const : item.status,
            }))
        },
    })
}

export function useReceivable(id: string | undefined) {
    return useQuery({
        queryKey: [QUERY_KEY, id],
        queryFn: async (): Promise<AccountReceivable> => {
            const { data, error } = await supabase
                .from('accounts_receivable')
                .select('*, category:financial_categories(*)')
                .eq('id', id!)
                .single()
            if (error) throw error
            return data as AccountReceivable
        },
        enabled: !!id,
    })
}

export function useCreateReceivable() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: async (receivable: Partial<AccountReceivable>) => {
            const { category, ...rest } = receivable
            void category
            const { data, error } = await supabase
                .from('accounts_receivable')
                .insert(rest)
                .select()
                .single()
            if (error) throw error
            return data
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
    })
}

export function useUpdateReceivable() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: async ({ id, ...updates }: Partial<AccountReceivable> & { id: string }) => {
            const { category, ...rest } = updates
            void category
            const { data, error } = await supabase
                .from('accounts_receivable')
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

export function useMarkAsReceived() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('accounts_receivable')
                .update({
                    status: 'received',
                    receipt_date: new Date().toISOString().split('T')[0],
                    updated_at: new Date().toISOString(),
                })
                .eq('id', id)
            if (error) throw error
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
    })
}

export function useDeleteReceivable() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('accounts_receivable')
                .delete()
                .eq('id', id)
            if (error) throw error
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
    })
}
