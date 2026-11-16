/** ₦2,500 style formatting. Done by hand so server and browser output always match. */
export function formatNaira(amount: number): string {
  return `₦${Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
