interface DashboardHeaderProps {
    title: string;
    subtitle?: string;
}

export default function DashboardHeader({
    title,
    subtitle,
}: DashboardHeaderProps) {
    return (
        <header className="mb-4">
            <h1 className="h2 fw-bold mb-2">{title}</h1>
            {subtitle && (
                <p className="text-muted">{subtitle}</p>
            )}
        </header>
    );
}
