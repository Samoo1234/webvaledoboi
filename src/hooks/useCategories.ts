import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { FinancialCategory } from '../types'

const QUERY_KEY = 'categories'

export function useCategories() {
    return useQuery({
        queryKey: [QUERY_KEY],
        queryFn: async (): Promise<FinancialCategory[]> => {
            const { data, error } = await supabase
                .from('financial_categories')
                .select('*')
                .order('name')
            if (error) throw error
            return data
        },
    })
}

export function useCategoriesByType(type: 'payable' | 'receivable') {
    return useQuery({
        queryKey: [QUERY_KEY, type],
        queryFn: async (): Promise<FinancialCategory[]> => {
            const { data, error } = await supabase
                .from('financial_categories')
                .select('*')
                .or(`type.eq.${type},type.eq.both`)
                .eq('active', true)
                .order('name')
            if (error) throw error
            return data
        },
    })
}

export function useCreateCategory() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: async (cat: Partial<FinancialCategory>) => {
            const { data, error } = await supabase
                .from('financial_categories')
                .insert(cat)
                .select()
                .single()
            if (error) throw error
            return data
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
    })
}

export function useUpdateCategory() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: async ({ id, ...updates }: Partial<FinancialCategory> & { id: string }) => {
            const { data, error } = await supabase
                .from('financial_categories')
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq('id', id)
                .select()
                .single()
            if (error) throw error
            return data
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
    })
}

export function useDeleteCategory() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('financial_categories')
                .delete()
                .eq('id', id)
            if (error) throw error
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
    })
}
