import { useState, useEffect } from 'react'
import { HeroContent } from '../../types/content'
import { MediaUpload } from '../MediaUpload'

interface HeroFormProps {
    initialContent: HeroContent
    onSave: (content: HeroContent) => void
    pageSlug: string
}

export function HeroForm({ initialContent, onSave, pageSlug }: HeroFormProps) {
    const [content, setContent] = useState<HeroContent>(initialContent)

    useEffect(() => {
        setContent(initialContent)
    }, [initialContent])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setContent(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="cms-form">
            <div className="form-group">
                <label className="form-label">Título</label>
                <input
                    type="text"
                    name="title"
                    value={content.title || ''}
                    onChange={handleChange}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Subtítulo</label>
                <input
                    type="text"
                    name="subtitle"
                    value={content.subtitle || ''}
                    onChange={handleChange}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Frase de Efeito (Tagline)</label>
                <textarea
                    name="tagline"
                    value={content.tagline || ''}
                    onChange={handleChange}
                    className="form-input"
                    rows={3}
                />
            </div>

            <div className="form-row">
                <MediaUpload
                    label="Vídeo de Fundo (MP4)"
                    accept="video/mp4"
                    path={`${pageSlug}/hero`}
                    onUploadComplete={(url) => setContent(prev => ({ ...prev, video_url: url }))}
                />
                <MediaUpload
                    label="Imagem de Fallback"
                    accept="image/*"
                    path={`${pageSlug}/hero`}
                    onUploadComplete={(url) => setContent(prev => ({ ...prev, fallback_image: url }))}
                />
            </div>

            <button
                type="button"
                className="btn-primary"
                onClick={() => onSave(content)}
                style={{ marginTop: 'var(--space-6)' }}
            >
                Salvar Alterações
            </button>
        </div>
    )
}
