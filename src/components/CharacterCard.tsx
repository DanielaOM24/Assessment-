import type { Character } from "@/types/character/character";

interface CharacterCardProps {
    character: Character;
    onClick?: () => void;
}

export default function CharacterCard({ character, onClick }: CharacterCardProps) {
    return (
        <div className="card h-100 shadow-sm rounded-3 overflow-hidden bg-white" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
            <img
                src={character.image}
                alt={character.name}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body d-flex flex-column justify-content-between p-4">
                <div>
                    <h5 className="card-title fw-bold text-dark mb-3" style={{ fontSize: '1.25rem' }}>{character.name}</h5>
                    <p className="card-text mb-2">
                        <span
                            className={`badge fs-6 px-3 py-2 ${character.status === 'Alive'
                                ? 'bg-success text-white'
                                : character.status === 'Dead'
                                    ? 'bg-danger text-white'
                                    : 'bg-secondary text-white'
                                }`}
                            style={{ borderRadius: '20px' }}
                        >
                            {character.status}
                        </span>
                    </p>
                </div>
                <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                    <strong>Especie:</strong> {character.species}
                </p>
            </div>
        </div>
    );
}
