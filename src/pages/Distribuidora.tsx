import { CompanyPage } from './CompanyPage'
import { Package, Snowflake, TruckIcon, Award, BarChart3, Users } from 'lucide-react'

export function Distribuidora() {
    return (
        <CompanyPage
            name="Vale do Boi Distribuidora"
            tagline="Distribuidora de Carnes — Qualidade do abate à entrega"
            about="A Vale do Boi Distribuidora é referência na distribuição de carnes bovinas de alta qualidade. Atendemos restaurantes, supermercados, açougues e estabelecimentos comerciais com uma logística eficiente e cadeia fria garantida. Nossos produtos passam por rigoroso controle de qualidade para chegar à sua mesa com frescor e sabor."
            services={[
                {
                    icon: <Package size={24} />,
                    title: 'Distribuição de Carnes',
                    description: 'Amplo portfólio de cortes bovinos, do picanha à costela. Embalagens a vácuo e porções personalizadas para cada cliente.',
                },
                {
                    icon: <Snowflake size={24} />,
                    title: 'Cadeia Fria Garantida',
                    description: 'Temperatura controlada desde o frigorífico até a entrega final. Câmaras frias e veículos refrigerados de última geração.',
                },
                {
                    icon: <TruckIcon size={24} />,
                    title: 'Entrega Programada',
                    description: 'Entregas regulares conforme a demanda do seu negócio. Flexibilidade e pontualidade para manter seu estoque sempre abastecido.',
                },
                {
                    icon: <Award size={24} />,
                    title: 'Controle de Qualidade',
                    description: 'Inspeção rigorosa em todas as etapas. Rastreabilidade completa da origem até o consumidor final.',
                },
                {
                    icon: <BarChart3 size={24} />,
                    title: 'Preços Competitivos',
                    description: 'Negociação direta com frigoríficos parceiros para oferecer os melhores preços do mercado sem abrir mão da qualidade.',
                },
                {
                    icon: <Users size={24} />,
                    title: 'Atendimento Especializado',
                    description: 'Equipe comercial dedicada para ajudar na escolha dos melhores cortes e volumes para o seu negócio.',
                },
            ]}
            contact={{
                phone: '(00) 00000-0000',
                email: 'distribuidora@valedoboi.com.br',
                address: 'Endereço da Distribuidora — Cidade, Estado',
                hours: 'Segunda a Sexta: 7h às 17h | Sábado: 7h às 12h',
            }}
            whatsapp="5500000000000"
        />
    )
}
