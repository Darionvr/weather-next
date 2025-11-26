import style from '@/app/ui/styles/skeleton.module.css'

// components/SkeletonDropdown.tsx
export default function SkeletonDropdown() {
  return (
    <ul className={style.dropdown}>
      <li ></li>
      <li ></li>
      <li ></li>
    </ul>
  );
}
