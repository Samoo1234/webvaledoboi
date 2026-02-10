import { Link } from 'react-router-dom'
import { LandingHeader } from '../components/LandingHeader'
import { LandingFooter } from '../components/LandingFooter'
import { Truck, Package, Store, ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

const companies = [
    {
        to: '/transportadora',
        name: 'TRValedoboi',
        segment: 'Transportadora de Bovinos',
        description: 'Transporte especializado de bovinos com segurança, rastreabilidade e pontualidade. Frota moderna e equipe treinada para garantir o bem-estar animal.',
        icon: Truck,
    },
    {
        to: '/distribuidora',
        name: 'Vale do Boi Distribuidora',
        segment: 'Distribuidora de Carnes',
        description: 'Distribuição de carnes bovinas de alta qualidade para restaurantes, supermercados e estabelecimentos. Cadeia fria garantida do abate à entrega.',
        icon: Package,
    },
    {
        to: '/acougue',
        name: 'Vale do Boi Açougue',
        segment: 'Açougue',
        description: 'Cortes selecionados com qualidade premium. Atendimento personalizado e carnes frescas diariamente para sua família.',
        icon: Store,
    },
]

function useFadeIn() {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.1 }
        )

        const elements = ref.current?.querySelectorAll('.fade-in')
        elements?.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return ref
}

export function Landing() {
    const containerRef = useFadeIn()

    return (
        <div className="landing-page" ref={containerRef}>
            <LandingHeader />

            {/* Hero */}
            <section className="landing-hero">
                <div className="landing-hero-content">
                    <div className="landing-hero-logo">VB</div>
                    <h1>Vale do Boi</h1>
                    <h2>Grupo Empresarial</h2>
                    <p className="landing-hero-tagline">
                        Do campo à mesa com excelência. Transporte, distribuição e comercialização
                        de bovinos e carnes com a qualidade que você merece.
                    </p>
                </div>
            </section>

            {/* Empresas */}
            <section className="landing-section">
                <h2 className="landing-section-title fade-in">Nossas Empresas</h2>
                <div className="landing-section-divider fade-in" />
                <p className="landing-section-subtitle fade-in">
                    Três empresas unidas pelo compromisso com a qualidade e tradição no setor pecuário.
                </p>

                <div className="company-cards">
                    {companies.map((company) => (
                        <Link key={company.to} to={company.to} className="company-card fade-in">
                            <div className="company-card-image">
                                <div className="company-card-image-placeholder">
                                    <company.icon size={36} />
                                </div>
                            </div>
                            <div className="company-card-body">
                                <h3>{company.name}</h3>
                                <span className="company-card-segment">{company.segment}</span>
                                <p>{company.description}</p>
                                <span className="company-card-cta">
                                    Saiba mais <ArrowRight size={16} />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Sobre */}
            <section className="landing-about">
                <div className="landing-about-inner fade-in">
                    <h2 className="landing-section-title">Sobre o Grupo</h2>
                    <div className="landing-section-divider" />
                    <p>
                        O Grupo Vale do Boi nasceu da paixão pelo agronegócio e pelo compromisso com
                        a excelência em cada etapa da cadeia produtiva de bovinos. Com operações que vão
                        do transporte especializado à comercialização direta ao consumidor, garantimos
                        qualidade, rastreabilidade e respeito ao bem-estar animal.
                    </p>
                    <p>
                        Nossas três empresas — TRValedoboi, Vale do Boi Distribuidora e Vale do Boi Açougue —
                        trabalham de forma integrada para oferecer o melhor da carne bovina, do campo à sua mesa.
                    </p>
                </div>
            </section>

            <LandingFooter />
        </div>
    )
}
