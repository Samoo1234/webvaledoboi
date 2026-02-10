import { supabase } from './supabase'

export const BUCKET_NAME = 'site-media'

export async function uploadFile(file: File, path: string) {
    const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(`${path}/${Date.now()}-${file.name}`, file, {
            cacheControl: '3600',
            upsert: false,
        })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(data.path)

    return publicUrl
}

export async function deleteFile(filePath: string) {
    const rawPath = filePath.split(`${BUCKET_NAME}/`)[1]
    if (!rawPath) return

    const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([rawPath])

    if (error) throw error
}
