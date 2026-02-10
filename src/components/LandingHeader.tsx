import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Lock } from 'lucide-react'

const navLinks = [
    { to: '/transportadora', label: 'Transportadora' },
    { to: '/distribuidora', label: 'Distribuidora' },
    { to: '/acougue', label: 'Açougue' },
]

export function LandingHeader() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <>
            <header className={`landing-header ${scrolled ? 'scrolled' : ''}`}>
                <div className="landing-header-inner">
                    <Link to="/" className="landing-logo">
                        <div className="landing-logo-placeholder">VB</div>
                        Vale do Boi
                    </Link>

                    <nav className="landing-nav">
                        {navLinks.map((link) => (
                            <Link key={link.to} to={link.to}>
                                {link.label}
                            </Link>
                        ))}
                        <Link to="/login" className="landing-admin-icon" title="Acesso restrito">
                            <Lock size={16} />
                        </Link>
                    </nav>

                    <button
                        className="landing-mobile-toggle"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Menu"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            <nav className={`landing-mobile-nav ${mobileOpen ? 'open' : ''}`}>
                {navLinks.map((link) => (
                    <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}>
                        {link.label}
                    </Link>
                ))}
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                    Acesso ao Sistema
                </Link>
            </nav>
        </>
    )
}
