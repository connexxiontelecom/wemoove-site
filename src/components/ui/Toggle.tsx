"use client";

import { LayoutGroup, m } from "framer-motion";

type ToggleOption<T extends string> = { value: T; label: string };

type ToggleProps<T extends string> = {
  /** Unique id, scopes the sliding background animation. */
  id: string;
  /** Accessible name for the group, e.g. "Ride type". */
  label: string;
  options: readonly ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
};

/** Pill toggle made of real buttons with aria-pressed and a sliding background. */
export function Toggle<T extends string>({ id, label, options, value, onChange, disabled = false }: ToggleProps<T>) {
  return (
    <LayoutGroup id={id}>
      <div
        role="group"
        aria-label={label}
        className={`grid grid-cols-2 rounded-full bg-paper p-1 ring-1 ring-line ${disabled ? "opacity-50" : ""}`}
      >
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              disabled={disabled}
              onClick={() => onChange(option.value)}
              className="relative min-h-11 rounded-full px-4 font-bold text-ink disabled:cursor-not-allowed"
            >
              {active && !disabled && (
                <m.span
                  layoutId="toggle-indicator"
                  className="absolute inset-0 rounded-full bg-brand shadow-sm"
                  transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  aria-hidden="true"
                />
              )}
              <span className="relative">{option.label}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
