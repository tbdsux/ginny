export interface ProjectProps extends IProjectProps {
  key: string; // auto set by Deta Base
}

export interface IProjectProps {
  tasks: Record<string, { id: string; content: string }>;
  columns: Record<string, { id: string; title: string; taskIds: string[] }>;
  columnOrder: string[];
  name: string;
  created_at: number;
  description?: string;
}
