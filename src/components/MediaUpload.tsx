import React, { useState } from 'react'
import { Upload, CheckCircle, AlertCircle } from 'lucide-react'
import { uploadFile } from '../lib/storage'

interface MediaUploadProps {
    onUploadComplete: (url: string) => void
    path: string
    accept?: string
    label?: string
}

export function MediaUpload({ onUploadComplete, path, accept, label }: MediaUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMsg, setErrorMsg] = useState('')

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        setStatus('idle')
        setErrorMsg('')

        try {
            const url = await uploadFile(file, path)
            onUploadComplete(url)
            setStatus('success')
        } catch (err: any) {
            console.error('Upload error:', err)
            setStatus('error')
            setErrorMsg(err.message || 'Erro ao fazer upload do arquivo.')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="media-upload-container">
            {label && <label className="form-label">{label}</label>}
            <div className={`upload-box ${uploading ? 'uploading' : ''} ${status}`}>
                <input
                    type="file"
                    onChange={handleUpload}
                    accept={accept}
                    disabled={uploading}
                    id={`file-upload-${path}`}
                    className="hidden-input"
                />
                <label htmlFor={`file-upload-${path}`} className="upload-label">
                    {uploading ? (
                        <>
                            <div className="spinner-small" />
                            <span>Enviando...</span>
                        </>
                    ) : status === 'success' ? (
                        <>
                            <CheckCircle size={20} className="text-success" />
                            <span>Upload concluído!</span>
                        </>
                    ) : (
                        <>
                            <Upload size={20} />
                            <span>Clique ou arraste para enviar</span>
                        </>
                    )}
                </label>
            </div>
            {status === 'error' && (
                <div className="upload-error">
                    <AlertCircle size={14} />
                    <span>{errorMsg}</span>
                </div>
            )}
        </div>
    )
}
