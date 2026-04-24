import { useLocation } from 'react-router-dom';


export default function PageNotFound() {
    const location = useLocation();
    const pageName = location.pathname.substring(1);
    
    return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#faf8f5' }}>
            <div className="max-w-md w-full">
                <div className="text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-7xl font-light" style={{ color: '#d1d5db' }}>404</h1>
                        <div className="h-0.5 w-16 mx-auto" style={{ background: '#e8e0d8' }}></div>
                    </div>
                    
                    <div className="space-y-3">
                        <h2 className="text-2xl font-medium" style={{ color: '#1a1a1a', fontFamily: "'Bebas Neue', sans-serif" }}>
                            Page Not Found
                        </h2>
                        <p style={{ color: '#6b7280' }}>
                            The page <span className="font-medium" style={{ color: '#1a1a1a' }}>"{pageName}"</span> could not be found.
                        </p>
                    </div>
                    
                    <div className="pt-6">
                        <button 
                            onClick={() => window.location.href = '/'} 
                            className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200"
                            style={{ background: '#0d9488', color: '#fff' }}
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}