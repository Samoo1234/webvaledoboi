import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import {
    LayoutDashboard,
    ArrowDownCircle,
    ArrowUpCircle,
    Tags,
    Truck,
    LogOut,
    DollarSign,
    Menu,
    X,
} from 'lucide-react'

const navItems = [
    { to: '/app', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/app/payables', label: 'Contas a Pagar', icon: ArrowDownCircle },
    { to: '/app/receivables', label: 'Contas a Receber', icon: ArrowUpCircle },
    { to: '/app/categories', label: 'Categorias', icon: Tags },
    { to: '/app/suppliers', label: 'Fornecedores', icon: Truck },
]

export function Layout() {
    const { user, signOut } = useAuth()
    const navigate = useNavigate()
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleSignOut = async () => {
        await signOut()
        navigate('/')
    }

    const userInitial = user?.email?.charAt(0).toUpperCase() ?? 'U'

    return (
        <div className="app-layout">
            <button
                className="mobile-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
            >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
                <div className="sidebar-logo">
                    <div className="logo-icon">
                        <DollarSign size={16} />
                    </div>
                    <h1>Financeiro</h1>
                </div>

                <nav className="sidebar-nav">
                    <div className="sidebar-section-title">Menu</div>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === '/app'}
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? 'active' : ''}`
                            }
                            onClick={() => setMobileOpen(false)}
                        >
                            <item.icon />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="sidebar-user">
                        <div className="sidebar-user-avatar">{userInitial}</div>
                        <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                            {user?.email}
                        </span>
                        <button
                            className="btn-logout"
                            onClick={handleSignOut}
                            title="Sair"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    )
}
