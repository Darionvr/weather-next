// components/ResultsList.tsx
import { Places } from "../lib/definitions";
import styles from '@/app/ui/styles/results.module.css'

type Props = {
  results: Places[];
  onSelect: (place: Places) => void;
};

export default function ResultsList({ results, onSelect }: Props) {
  return (
    <ul className={styles.results}>
      {results.map((place, index) => (
        <li key={index} onClick={() => onSelect(place)}>
          {place.name} {place.country && `(${place.country})`}{" "}
          {place.admin1 && `- ${place.admin1}`}
        </li>
      ))}
    </ul>
  );
}
