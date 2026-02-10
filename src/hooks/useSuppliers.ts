import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { Supplier } from '../types'

const QUERY_KEY = 'suppliers'

export function useSuppliers() {
    return useQuery({
        queryKey: [QUERY_KEY],
        queryFn: async (): Promise<Supplier[]> => {
            const { data, error } = await supabase
                .from('suppliers')
                .select('*')
                .order('name')
            if (error) throw error
            return data
        },
    })
}

export function useActiveSuppliers() {
    return useQuery({
        queryKey: [QUERY_KEY, 'active'],
        queryFn: async (): Promise<Supplier[]> => {
            const { data, error } = await supabase
                .from('suppliers')
                .select('*')
                .eq('active', true)
                .order('name')
            if (error) throw error
            return data
        },
    })
}

export function useSupplier(id: string | undefined) {
    return useQuery({
        queryKey: [QUERY_KEY, id],
        queryFn: async (): Promise<Supplier> => {
            const { data, error } = await supabase
                .from('suppliers')
                .select('*')
                .eq('id', id!)
                .single()
            if (error) throw error
            return data
        },
        enabled: !!id,
    })
}

export function useCreateSupplier() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: async (supplier: Partial<Supplier>) => {
            const { data, error } = await supabase
                .from('suppliers')
                .insert(supplier)
                .select()
                .single()
            if (error) throw error
            return data
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
    })
}

export function useUpdateSupplier() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: async ({ id, ...updates }: Partial<Supplier> & { id: string }) => {
            const { data, error } = await supabase
                .from('suppliers')
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

export function useDeleteSupplier() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('suppliers')
                .delete()
                .eq('id', id)
            if (error) throw error
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
    })
}
