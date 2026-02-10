import { useState, useEffect } from 'react'
import { AboutContent } from '../../types/content'

interface AboutFormProps {
    initialContent: AboutContent
    onSave: (content: AboutContent) => void
}

export function AboutForm({ initialContent, onSave }: AboutFormProps) {
    const [content, setContent] = useState<AboutContent>(initialContent)

    useEffect(() => {
        setContent(initialContent)
    }, [initialContent])

    const handleParagraphChange = (index: number, value: string) => {
        const newParagraphs = [...(content.paragraphs || [])]
        newParagraphs[index] = value
        setContent(prev => ({ ...prev, paragraphs: newParagraphs }))
    }

    const addParagraph = () => {
        setContent(prev => ({
            ...prev,
            paragraphs: [...(prev.paragraphs || []), '']
        }))
    }

    const removeParagraph = (index: number) => {
        const newParagraphs = content.paragraphs.filter((_, i) => i !== index)
        setContent(prev => ({ ...prev, paragraphs: newParagraphs }))
    }

    return (
        <div className="cms-form">
            <div className="form-group">
                <label className="form-label">Título da Seção</label>
                <input
                    type="text"
                    name="title"
                    value={content.title || ''}
                    onChange={(e) => setContent(prev => ({ ...prev, title: e.target.value }))}
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label className="form-label">Parágrafos</label>
                {content.paragraphs?.map((p, index) => (
                    <div key={index} className="paragraph-editor" style={{ marginBottom: 'var(--space-2)' }}>
                        <textarea
                            value={p}
                            onChange={(e) => handleParagraphChange(index, e.target.value)}
                            className="form-input"
                            rows={3}
                        />
                        <button
                            type="button"
                            className="btn-danger-text"
                            onClick={() => removeParagraph(index)}
                            style={{ fontSize: 'var(--font-size-xs)', marginTop: '4px' }}
                        >
                            Remover parágrafo
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    className="btn-secondary"
                    onClick={addParagraph}
                    style={{ marginTop: 'var(--space-2)' }}
                >
                    + Adicionar Parágrafo
                </button>
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
