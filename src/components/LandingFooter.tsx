import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'

export function LandingFooter() {
    return (
        <footer className="landing-footer">
            <div className="landing-footer-inner">
                <div>
                    <h4>Grupo Vale do Boi</h4>
                    <p>
                        Excelência no transporte, distribuição e comercialização de bovinos e carnes.
                        Qualidade e confiança do campo à mesa.
                    </p>
                </div>

                <div>
                    <h4>Empresas</h4>
                    <div className="landing-footer-links">
                        <Link to="/transportadora">TRValedoboi</Link>
                        <Link to="/distribuidora">Distribuidora</Link>
                        <Link to="/acougue">Açougue</Link>
                    </div>
                </div>

                <div>
                    <h4>Contato</h4>
                    <div className="landing-footer-links">
                        <span>contato@valedoboi.com.br</span>
                        <span>(00) 00000-0000</span>
                    </div>
                </div>
            </div>

            <div className="landing-footer-bottom">
                <span>© {new Date().getFullYear()} Grupo Vale do Boi — Todos os direitos reservados</span>
                <Link to="/login" className="landing-admin-icon" title="Acesso ao sistema">
                    <Lock size={14} />
                </Link>
            </div>
        </footer>
    )
}
