'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Character, CharacterStats } from '@/types/character/character';
import { getCharacters } from '@/services/api';
import CharacterCard from '@/components/CharacterCard';
import DashboardHeader from '@/components/DashboardHeader';
import LoadingState from '@/components/LoadingState';
import StatsCard from '@/components/StatsCard';

export default function DashboardPage() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [stats, setStats] = useState<CharacterStats>({
        total: 0,
        alive: 0,
        dead: 0,
        unknown: 0,
    });

    useEffect(() => {
        fetchCharacters();
    }, []);

    const fetchCharacters = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getCharacters();
            setCharacters(data);
            setFilteredCharacters(data);
            calculateStats(data);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Error inesperado');
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (list: Character[]) => {
        const alive = list.filter(c => c.status === 'Alive').length;
        const dead = list.filter(c => c.status === 'Dead').length;
        const unknown = list.filter(c => c.status === 'unknown').length;

        setStats({
            total: list.length,
            alive,
            dead,
            unknown,
        });
    };

    useEffect(() => {
        let temp = [...characters];

        if (search) {
            temp = temp.filter(c =>
                c.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            temp = temp.filter(c => c.status === statusFilter);
        }

        setFilteredCharacters(temp);
    }, [search, statusFilter, characters]);


    const totalCharacters = useMemo(() => {
        return filteredCharacters.length;
    }, [filteredCharacters]);

    if (loading) {
        return <LoadingState />;
    }

    if (error) {
        return (
            <div className="alert alert-danger m-4">
                <strong>Error:</strong> {error}
            </div>
        );
    }

    return (
        <div className="container-fluid p-4 bg-light" style={{ minHeight: '100vh' }}>
            <DashboardHeader title="Dashboard de Personajes" subtitle="Explora los personajes de Rick and Morty" />

            {/* Estadísticas */}
            <div className="row mb-4 g-3">
                <div className="col-lg-3 col-md-6">
                    <StatsCard title="Total" value={stats.total} variant="default" />
                </div>
                <div className="col-lg-3 col-md-6">
                    <StatsCard title="Alive" value={stats.alive} variant="success" />
                </div>
                <div className="col-lg-3 col-md-6">
                    <StatsCard title="Dead" value={stats.dead} variant="danger" />
                </div>
                <div className="col-lg-3 col-md-6">
                    <StatsCard title="Unknown" value={stats.unknown} variant="warning" />
                </div>
            </div>

            {/* Filtros */}
            <div className="card p-3 mb-4 shadow-sm bg-white">
                <div className="row g-3 align-items-center">
                    <div className="col-lg-5">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar personaje..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="col-lg-4">
                        <select
                            className="form-select"
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                        >
                            <option value="all">Todos</option>
                            <option value="Alive">Alive</option>
                            <option value="Dead">Dead</option>
                            <option value="unknown">Unknown</option>
                        </select>
                    </div>
                    <div className="col-lg-3 text-center">
                        <span className="fw-bold">
                            Total visibles: {totalCharacters}
                        </span>
                    </div>
                </div>
            </div>

            {/* Lista */}
            <div className="row g-3">
                {filteredCharacters.map(character => (
                    <div key={character.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <CharacterCard character={character} />
                    </div>
                ))}
            </div>

            {filteredCharacters.length === 0 && (
                <div className="alert alert-info mt-4 text-center">
                    No se encontraron resultados.
                </div>
            )}
        </div>
    );
}
