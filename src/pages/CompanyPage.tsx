import { LandingHeader } from '../components/LandingHeader'
import { LandingFooter } from '../components/LandingFooter'
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'

interface Service {
    icon: ReactNode
    title: string
    description: string
}

interface CompanyPageProps {
    name: string
    tagline: string
    about: string
    services: Service[]
    contact: {
        phone: string
        email: string
        address: string
        hours: string
    }
    whatsapp?: string
}

export function CompanyPage({ name, tagline, about, services, contact, whatsapp }: CompanyPageProps) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible')
                })
            },
            { threshold: 0.1 }
        )

        const elements = ref.current?.querySelectorAll('.fade-in')
        elements?.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <div className="landing-page company-page" ref={ref}>
            <LandingHeader />

            {/* Hero */}
            <section className="company-hero">
                <div className="company-hero-logo">VB</div>
                <h1>{name}</h1>
                <p>{tagline}</p>
            </section>

            {/* Sobre */}
            <section className="company-section fade-in">
                <h2>Sobre</h2>
                <div className="company-section-divider" />
                <p>{about}</p>
            </section>

            {/* Serviços */}
            <section className="company-section fade-in">
                <h2>Nossos Serviços</h2>
                <div className="company-section-divider" />
                <div className="services-grid">
                    {services.map((service, i) => (
                        <div key={i} className="service-card">
                            <div className="service-card-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Galeria */}
            <section className="company-section fade-in">
                <h2>Galeria</h2>
                <div className="company-section-divider" />
                <div className="gallery-grid">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="gallery-item">
                            Foto {i}
                        </div>
                    ))}
                </div>
            </section>

            {/* Contato */}
            <section className="company-section fade-in">
                <h2>Contato</h2>
                <div className="company-section-divider" />
                <div className="contact-grid">
                    <div className="contact-info-list">
                        <div className="contact-info-item">
                            <Phone size={20} />
                            <div>
                                <strong>Telefone</strong>
                                <span>{contact.phone}</span>
                            </div>
                        </div>
                        <div className="contact-info-item">
                            <Mail size={20} />
                            <div>
                                <strong>E-mail</strong>
                                <span>{contact.email}</span>
                            </div>
                        </div>
                        <div className="contact-info-item">
                            <MapPin size={20} />
                            <div>
                                <strong>Endereço</strong>
                                <span>{contact.address}</span>
                            </div>
                        </div>
                        <div className="contact-info-item">
                            <Clock size={20} />
                            <div>
                                <strong>Horário</strong>
                                <span>{contact.hours}</span>
                            </div>
                        </div>
                    </div>
                    <div className="contact-map-placeholder">
                        Mapa — Inserir Google Maps embed
                    </div>
                </div>
            </section>

            {/* WhatsApp */}
            {whatsapp && (
                <section className="whatsapp-cta fade-in">
                    <a
                        href={`https://wa.me/${whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-btn"
                    >
                        Fale conosco pelo WhatsApp <ArrowRight size={18} />
                    </a>
                </section>
            )}

            <LandingFooter />
        </div>
    )
}
