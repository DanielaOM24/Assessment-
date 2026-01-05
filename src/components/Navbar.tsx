import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container-fluid px-4">
                <Link href="/" className="navbar-brand d-flex align-items-center" style={{ textDecoration: 'none' }}>
                    <div
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-2"
                        style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            fontSize: '1.25rem'
                        }}
                    >
                        R
                    </div>
                    <span className="fs-4 fw-bold">RickApp</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center gap-2">
                        <li className="nav-item">
                            <Link
                                href="/dashboard"
                                className="btn btn-primary px-4 py-2 rounded-pill"
                                style={{ textDecoration: 'none', fontWeight: '500' }}
                            >
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
