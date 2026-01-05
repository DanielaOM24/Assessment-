import type { Character, ApiResponse } from "@/types/character/character";

export async function getCharacters(): Promise<Character[]> {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    const data: ApiResponse = await res.json();
    return data.results ?? [];
}
