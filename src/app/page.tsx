'use client'
import { getCharacters } from "@/services/api"
import { useEffect, useState } from "react"
import CharacterCard from "@/components/CharacterCard";
import type { Character } from "@/types/character/character"
import Navbar from "@/components/Navbar"


export default function Home() {
    const [characters, setCharacters] = useState<Character[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await getCharacters()
                setCharacters(data)
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'Error inesperado')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) return <p>Cargando...</p>

    if (error) return <p>Error: {error}</p>

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h1 className="mb-4">Personajes de Rick and Morty</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    {characters.map((char) => (
                        <CharacterCard
                            key={char.id}
                            character={char}
                            onClick={() => console.log('Clicked', char.name)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
