import { useState } from 'react'
import { useContent } from '../hooks/useContent'
import { supabase } from '../lib/supabase'
import { useQueryClient } from '@tanstack/react-query'
import { HeroForm } from '../components/cms/HeroForm'
import { AboutForm } from '../components/cms/AboutForm'
import { Settings, ExternalLink } from 'lucide-react'

const PAGES = [
    { value: 'landing', label: 'Landing Page' },
    { value: 'transportadora', label: 'Transportadora' },
    { value: 'distribuidora', label: 'Distribuidora' },
    { value: 'acougue', label: 'Açougue' },
]

export function ContentManagement() {
    const [selectedPage, setSelectedPage] = useState('landing')
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: '' })

    const { data: content, isLoading } = useContent(selectedPage)
    const queryClient = useQueryClient()

    const handleSave = async (sectionKey: string, newContent: any) => {
        try {
            const { error } = await supabase
                .from('site_content')
                .upsert({
                    page_slug: selectedPage,
                    section_key: sectionKey,
                    content: newContent,
                    updated_at: new Date().toISOString()
                }, {
                    onConflict: 'page_slug, section_key'
                })

            if (error) throw error

            setStatus({ type: 'success', msg: 'Conteúdo atualizado com sucesso!' })
            queryClient.invalidateQueries({ queryKey: ['content', selectedPage] })

            setTimeout(() => setStatus({ type: null, msg: '' }), 3000)
        } catch (err: any) {
            console.error('Error saving content:', err)
            setStatus({ type: 'error', msg: 'Erro ao salvar: ' + err.message })
        }
    }

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="spinner" />
            </div>
        )
    }

    return (
        <div className="cms-page">
            <div className="page-header">
                <div className="page-header-title">
                    <Settings className="text-accent" />
                    <h1>Gerenciar Site</h1>
                </div>
                <div className="page-header-actions">
                    <a href="/" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                        <ExternalLink size={16} />
                        Ver Site Público
                    </a>
                </div>
            </div>

            <div className="cms-controls card">
                <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Selecione a Página para Editar</label>
                    <select
                        className="form-input"
                        value={selectedPage}
                        onChange={(e) => setSelectedPage(e.target.value)}
                    >
                        {PAGES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                    </select>
                </div>
            </div>

            {status.type && (
                <div className={`alert alert-${status.type}`} style={{ marginTop: 'var(--space-4)' }}>
                    {status.msg}
                </div>
            )}

            <div className="cms-sections" style={{ marginTop: 'var(--space-6)' }}>
                <div className="card">
                    <h2 className="card-title">Seção: Hero (Início)</h2>
                    <HeroForm
                        pageSlug={selectedPage}
                        initialContent={content?.hero || {}}
                        onSave={(data) => handleSave('hero', data)}
                    />
                </div>

                <div className="card" style={{ marginTop: 'var(--space-6)' }}>
                    <h2 className="card-title">Seção: Sobre</h2>
                    <AboutForm
                        initialContent={content?.about || {}}
                        onSave={(data) => handleSave('about', data)}
                    />
                </div>
            </div>
        </div>
    )
}
