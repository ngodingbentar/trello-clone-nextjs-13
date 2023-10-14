import { databases } from "@/appwrite"
import { Board, Column, TypedColumn } from "@/typings"

export const getTodosGroupedByColumn = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!
  )

  const todos = data.documents
  console.log('todos', todos)

  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: []
      })
    }

    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      // get the image if it exists on the todo
      ...(todo.image && { image: JSON.parse(todo.image) })
    })
    return acc
  }, new Map<TypedColumn, Column>)
  
  console.log('columns', columns)

  // if colims doesn;t have inprogress, todo and done, add them with empty todos

  const columnTypes: TypedColumn[] = ['todo', 'inprogress', 'done']

  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      })
    }
  }

  console.log('columns 2', columns)

  // sort columns by columnType
  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  )

  const board: Board = {
    columns: sortedColumns
  }

  console.log('board 1', board)

  return board

}