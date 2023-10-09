interface Board {
  columns: Map<TypedColumn, Column>
}

type TypedColumn = "todo" | "inprogress" | "done"

interface Column {
  id: TypedColumn
  todos: Todo[]
}

interface Todo {
  $id: string
  $createdAt: string
  title: string
  status: string
  image?: Image
}

interface Image {
  bucketId: string
  fileId: string
}

export interface ITask {
	id: string;
	content: string;
}
export interface ITasks {
	[taskName: string]: ITask;
}
export interface IColumn {
	id: string;
	title: string;
	taskIds: string[];
}
export interface IColumns {
	[columnName: string]: IColumn;
}
export interface IData {
	tasks: ITasks;
	columns: IColumns;
	columnOrder: string[];
}
