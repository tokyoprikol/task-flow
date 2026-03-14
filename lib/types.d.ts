export interface Board {
  id: string;
  title: string;
  columns: Column[];
}
export interface Column {
  id: string;
  title: string;
  order: number;
  boardId: string;
  color: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  columnId: string;
  title: string;
  description: string;
  priority: string;
  position: string;
}
