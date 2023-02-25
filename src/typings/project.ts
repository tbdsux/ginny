export interface ProjectProps {
  key: string; // auto set by Deta Base
  tasks: Record<string, { id: string; content: string }>;
  columns: Record<string, { id: string; title: string; taskIds: string[] }>;
  columnOrder: string[];
  name: string;
  created_at: number;
  description?: string;
}
