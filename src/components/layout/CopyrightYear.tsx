/**
 * The year the site was built. Worked out once when the module loads (not during render), so every
 * page stays fully static in both the server build and the static export. Rebuild each January.
 */
const YEAR = new Date().getFullYear();

export function CopyrightYear() {
  return <>{YEAR}</>;
}
