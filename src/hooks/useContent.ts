import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { SiteContent } from '../types/content'

export function useContent(pageSlug: string) {
    return useQuery({
        queryKey: ['content', pageSlug],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('site_content')
                .select('*')
                .eq('page_slug', pageSlug)
                .eq('is_active', true)

            if (error) throw error

            // Transform array into a keyed object for easier access
            return (data as SiteContent[]).reduce((acc, item) => {
                acc[item.section_key] = item.content
                return acc
            }, {} as Record<string, any>)
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}
