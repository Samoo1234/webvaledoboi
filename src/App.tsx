import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Layout } from './components/Layout'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Payables } from './pages/Payables'
import { PayableForm } from './pages/PayableForm'
import { Receivables } from './pages/Receivables'
import { ReceivableForm } from './pages/ReceivableForm'
import { Categories } from './pages/Categories'
import { Suppliers } from './pages/Suppliers'
import { SupplierForm } from './pages/SupplierForm'
import { Landing } from './pages/Landing'
import { Transportadora } from './pages/Transportadora'
import { Distribuidora } from './pages/Distribuidora'
import { Acougue } from './pages/Acougue'
import { ContentManagement } from './pages/ContentManagement'
import './landing.css'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 2,
            retry: 1,
        },
    },
})

function LoginGuard() {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner" />
            </div>
        )
    }

    if (user) return <Navigate to="/app" replace />
    return <Login />
}

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        {/* Public landing routes */}
                        <Route path="/" element={<Landing />} />
                        <Route path="/transportadora" element={<Transportadora />} />
                        <Route path="/distribuidora" element={<Distribuidora />} />
                        <Route path="/acougue" element={<Acougue />} />
                        <Route path="/login" element={<LoginGuard />} />

                        {/* Protected financial system routes */}
                        <Route
                            path="/app"
                            element={
                                <ProtectedRoute>
                                    <Layout />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Dashboard />} />
                            <Route path="payables" element={<Payables />} />
                            <Route path="payables/new" element={<PayableForm />} />
                            <Route path="payables/:id" element={<PayableForm />} />
                            <Route path="receivables" element={<Receivables />} />
                            <Route path="receivables/new" element={<ReceivableForm />} />
                            <Route path="receivables/:id" element={<ReceivableForm />} />
                            <Route path="categories" element={<Categories />} />
                            <Route path="suppliers" element={<Suppliers />} />
                            <Route path="suppliers/new" element={<SupplierForm />} />
                            <Route path="suppliers/:id" element={<SupplierForm />} />
                            <Route path="cms" element={<ContentManagement />} />
                        </Route>

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>
    )
}
