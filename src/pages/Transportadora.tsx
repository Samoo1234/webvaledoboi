import { CompanyPage } from './CompanyPage'
import { Truck, Shield, MapPin, Clock, Thermometer, FileCheck } from 'lucide-react'

export function Transportadora() {
    return (
        <CompanyPage
            slug="transportadora"
            name="TRValedoboi"
            tagline="Transportadora de Bovinos — Segurança e pontualidade no transporte animal"
            about="A TRValedoboi é especializada no transporte de bovinos vivos com os mais altos padrões de segurança e bem-estar animal. Nossa frota moderna conta com veículos adaptados e climatizados, garantindo que os animais cheguem ao destino com saúde e qualidade. Operamos em todo o território nacional com rastreamento em tempo real."
            services={[
                {
                    icon: <Truck size={24} />,
                    title: 'Transporte de Bovinos',
                    description: 'Transporte especializado com veículos adaptados para garantir o conforto e segurança dos animais durante todo o percurso.',
                },
                {
                    icon: <Shield size={24} />,
                    title: 'Segurança e Bem-Estar',
                    description: 'Protocolos rigorosos de bem-estar animal seguindo as normas do MAPA e certificações internacionais.',
                },
                {
                    icon: <MapPin size={24} />,
                    title: 'Rastreamento em Tempo Real',
                    description: 'Acompanhe sua carga em tempo real com nosso sistema GPS integrado. Transparência e confiança em cada viagem.',
                },
                {
                    icon: <Clock size={24} />,
                    title: 'Logística Integrada',
                    description: 'Planejamento logístico completo, desde a coleta até a entrega, com otimização de rotas e prazos garantidos.',
                },
                {
                    icon: <Thermometer size={24} />,
                    title: 'Veículos Climatizados',
                    description: 'Frota com controle de temperatura e ventilação para garantir as condições ideais durante o transporte.',
                },
                {
                    icon: <FileCheck size={24} />,
                    title: 'Documentação Completa',
                    description: 'Gestão completa de GTA, CTe e demais documentos exigidos para o transporte legal de animais vivos.',
                },
            ]}
            contact={{
                phone: '(00) 00000-0000',
                email: 'transporte@valedoboi.com.br',
                address: 'Endereço da Transportadora — Cidade, Estado',
                hours: 'Segunda a Sábado: 6h às 18h',
            }}
            whatsapp="5500000000000"
        />
    )
}
