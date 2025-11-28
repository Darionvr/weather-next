'use client'

import { useActionState, useState, useEffect } from "react";
import { Places } from "../lib/definitions";
import { getWeather, searchPlacesAction } from "../lib/actions";
import { SearchError } from "./search-error";
import { WeatherData } from "../lib/definitions";
import styles from '@/app/ui/styles/searchbar.module.css';
import SkeletonDropdown from "./skeleton";
import ResultsList from "./result-list";
import { useDebouncedCallback } from 'use-debounce';
import { startTransition } from "react";

type SearchBarProps = {
    onPlaceSelected: (place: Places, data: WeatherData) => void;
};

const initialState: { results: Places[]; error?: string } = { results: [] };

const SearchBar = ({ onPlaceSelected }: SearchBarProps) => {

    const [showResults, setShowResults] = useState(true);
    const [formState, formAction, isPending] = useActionState(searchPlacesAction, initialState);
    const [query, setQuery] = useState(""); // para guardar el texto del input y controlar los resultados

    const handleSelectPlace = async (place: Places) => {
        const data = await getWeather(place.latitude, place.longitude);
        onPlaceSelected(place, data); // enviamos al padre
        setShowResults(false);  // Oculta el dropdown con los resultados
    };

    const debouncedSearch = useDebouncedCallback((q: string) => {
        const fd = new FormData();
        fd.append("query", q);
        startTransition(() => {
            formAction(fd);
        });
    }, 300);


    useEffect(() => {
        if (query.length === 0) {
            setShowResults(false); // oculta si está vacío
            formState.results = [];
        } else if (isPending) {
            setShowResults(true); // reactiva si hay resultados
        }
    }, [query, isPending]);

    useEffect(() => {
        if (query.length > 0) {
            debouncedSearch(query);
        }
    }, [query]);

    return (

        <section className={styles.section}>
            <form className={styles.form} action={formAction} >
                <div>
                    <input
                        type="text"
                        name="query"
                        placeholder='Ingresa un lugar'
                        defaultValue={formState.results[0]?.name ?? ''}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {showResults && formState.results.length > 0 && (
                        <ResultsList results={formState.results} onSelect={handleSelectPlace} />
                    )}
                </div>
                <button> Buscar</button>
            </form>

            {isPending && <SkeletonDropdown />}

            <SearchError error={formState.error ? [formState.error] : undefined} />
        </section>
    )
}

export default SearchBar