export const contactTopics = [
  { value: "general", label: "Not sure yet" },
  { value: "website", label: "A website" },
  { value: "payroll", label: "Payroll or business tools" },
  { value: "custom", label: "Custom software or integrations" },
  { value: "idea", label: "Help shaping an idea" },
  { value: "maintenance", label: "Help with existing software" },
  { value: "bai", label: "BAI Desk" },
  { value: "connectionloop", label: "ConnectionLoop" },
  { value: "other", label: "Something else" },
] as const;

export type ProjectType = (typeof contactTopics)[number]["value"];

export function isProjectType(value: string | null): value is ProjectType {
  return contactTopics.some((topic) => topic.value === value);
}

export function contactHref(projectType?: ProjectType) {
  return projectType ? `/contact/?projectType=${projectType}` : "/contact/";
}
