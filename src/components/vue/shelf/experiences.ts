import type { Experience } from "../../../types/index.ts";
import { toPlainText } from "./records";

export interface ExperienceRecord {
  key: string;
  index: string;
  role: string;
  company: string;
  period: string;
  year: string;
  current: boolean;
  description: string;
  tags: string[];
}

const MONTHS = 12;

/** "2022-03" → "Mar 2022"; an absent end date means still there. */
function label(iso: string | null | undefined): string {
  if (!iso) return "Present";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

function months(start: string, end: string | null | undefined): number {
  const a = new Date(start);
  const b = end ? new Date(end) : new Date();
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return 0;
  return (b.getFullYear() - a.getFullYear()) * MONTHS + (b.getMonth() - a.getMonth());
}

function labels(tags: Experience["tags"]): string[] {
  return (tags ?? [])
    .map((tag) => (typeof tag === "string" ? tag : tag?.label))
    .filter((value): value is string => Boolean(value));
}

export function toExperienceRecord(item: Experience, i: number): ExperienceRecord {
  const span = months(item.startDate, item.endDate);

  return {
    key: item.id ?? item.slug ?? String(i),
    index: String(i + 1).padStart(2, "0"),
    role: item.title,
    company: item.company,
    period: `${label(item.startDate)} — ${label(item.endDate)}`,
    year: String(new Date(item.startDate).getFullYear() || ""),
    current: !item.endDate,
    description: toPlainText(item.description, 320),
    tags: labels(item.tags),
  };
}

/** Newest first — a CV reads backwards. */
export function sortExperiences(items: Experience[]): Experience[] {
  return [...items].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );
}
