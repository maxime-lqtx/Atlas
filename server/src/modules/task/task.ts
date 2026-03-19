export type ITask = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  project_id: number;
  created_by: number;
  assigned_to: number;
  category_id: number;
  created_at: Date;
};
