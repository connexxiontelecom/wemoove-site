import type { PolicyBlock } from "@/content/privacyPolicy";

/** Renders one block (paragraph, subheading or list) of the privacy policy. */
export function PolicyBlockView({ block }: { block: PolicyBlock }) {
  if (block.type === "p") return <p className="mb-4">{block.text}</p>;
  if (block.type === "subheading") return <h3 className="mb-2 mt-6 font-bold text-ink">{block.text}</h3>;
  return (
    <ul className="mb-4 list-disc space-y-2 pl-6">
      {block.items.map((item) =>
        typeof item === "string" ? (
          <li key={item}>{item}</li>
        ) : (
          <li key={item.lead}>
            <strong className="text-ink">{item.lead}</strong> {item.text}
          </li>
        ),
      )}
    </ul>
  );
}
