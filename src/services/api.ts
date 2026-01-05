import type { Character } from "@/types/character/character";

export async function getCharacters(): Promise<Character[]> {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return (data.results ?? []) as Character[];
}
