import { CompanyPage } from './CompanyPage'
import { Store, Beef, ChefHat, Star, ShoppingBag, Heart } from 'lucide-react'

export function Acougue() {
    return (
        <CompanyPage
            slug="acougue"
            name="Vale do Boi Açougue"
            tagline="Açougue — Cortes selecionados com qualidade premium"
            about="O Vale do Boi Açougue é o ponto de venda direto ao consumidor do nosso grupo. Aqui você encontra os melhores cortes bovinos, selecionados diariamente com frescor e qualidade garantidos. Nossos açougueiros são profissionais experientes que preparam cada corte com cuidado e atenção para oferecer a melhor experiência ao cliente."
            services={[
                {
                    icon: <Beef size={24} />,
                    title: 'Cortes Especiais',
                    description: 'Picanha, costela, filé mignon, alcatra e muito mais. Cortes nobres preparados sob medida para sua necessidade.',
                },
                {
                    icon: <ChefHat size={24} />,
                    title: 'Preparo Personalizado',
                    description: 'Cortes sob medida para churrascos, eventos e refeições do dia a dia. Peça do jeito que você preferir.',
                },
                {
                    icon: <Star size={24} />,
                    title: 'Carnes Premium',
                    description: 'Seleção especial de carnes maturadas e de raças nobres. Qualidade superior para momentos especiais.',
                },
                {
                    icon: <ShoppingBag size={24} />,
                    title: 'Kits Prontos',
                    description: 'Kits de churrasco, kits para família e combos especiais. Praticidade e economia para sua compra.',
                },
                {
                    icon: <Heart size={24} />,
                    title: 'Frescor Diário',
                    description: 'Carnes frescas todos os dias, direto da nossa distribuidora. Garantia de qualidade e procedência.',
                },
                {
                    icon: <Store size={24} />,
                    title: 'Atendimento no Balcão',
                    description: 'Atendimento personalizado por açougueiros experientes. Dicas de preparo e orientação sobre os melhores cortes.',
                },
            ]}
            contact={{
                phone: '(00) 00000-0000',
                email: 'acougue@valedoboi.com.br',
                address: 'Endereço do Açougue — Cidade, Estado',
                hours: 'Segunda a Sábado: 6h às 20h | Domingo: 6h às 13h',
            }}
            whatsapp="5500000000000"
        />
    )
}
