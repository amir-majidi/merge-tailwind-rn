import GROUPS from "./groups";

function findGroup(className: string): string {
  for (const [group, patterns] of Object.entries(GROUPS)) {
    if (patterns.some((p) => p.test(className))) return group;
  }
  return `custom:${className}`;
}

export default function mergeTailwindRN(
  ...inputs: (string | undefined)[]
): string {
  const seen: Record<string, string> = {};

  for (const input of inputs) {
    if (!input) continue;
    const classes = input.split(/\s+/).filter(Boolean);

    for (const cls of classes) {
      const group = findGroup(cls);
      seen[group] = cls;
    }
  }

  return Object.values(seen).join(" ");
}
