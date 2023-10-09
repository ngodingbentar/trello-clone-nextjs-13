'use client'
import { useBoardStore } from '@/store/BoardStore';
import React, { useState } from 'react';
import { useEffect } from 'react'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from './Column';
import initialData from '@/app/api/initial-data';
import { IData } from '@/typings';
import Kolom from './Kolom';

function Board() {
  const [board, getBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard
  ])

  useEffect(() => {
    getBoard()
  }, [getBoard])

  const handleOnDragEnd = (result: DropResult) => {

  }

  const [state, setState] = useState<IData>(initialData);

	const onDragEnd = (result: DropResult) => {
		document.body.style.color = "inherit";
		const { destination, source, draggableId, type } = result;

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		if (type === "column") {
			const newColumnOrder = Array.from(state.columnOrder);
			newColumnOrder.splice(source.index, 1);
			newColumnOrder.splice(destination.index, 0, draggableId);
			const newState = {
				...state,
				columnOrder: newColumnOrder,
			};
			setState(newState);
			return;
		}

		const startColumn = state.columns[source.droppableId];
		const finishColumn = state.columns[destination.droppableId];

		if (startColumn === finishColumn) {
			const newTaskIds = Array.from(startColumn.taskIds);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...startColumn,
				taskIds: newTaskIds,
			};

			const newState = {
				...state,
				columns: {
					...state.columns,
					[newColumn.id]: newColumn,
				},
			};

			setState(newState);
			return;
		}
		const newStartTaskIds = Array.from(startColumn.taskIds);
		newStartTaskIds.splice(source.index, 1);
		const newStartColumn = {
			...startColumn,
			taskIds: newStartTaskIds,
		};

		const newFinishTaskIds = Array.from(finishColumn.taskIds);
		newFinishTaskIds.splice(destination.index, 0, draggableId);
		const newFinishColumn = {
			...finishColumn,
			taskIds: newFinishTaskIds,
		};
		const newState = {
			...state,
			columns: {
				...state.columns,
				[newStartColumn.id]: newStartColumn,
				[newFinishColumn.id]: newFinishColumn,
			},
		};

		setState(newState);
	};

  return (
    <>
      {/* <DragDropContext onDragEnd={handleOnDragEnd}>
        <React.StrictMode>
          <Droppable droppableId="droppable" direction='horizontal' type='column'>
            {(provided) => (
              <div
                className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                { Array.from(board.columns.entries()).map(([id, column], index) => (
                  <Column key={id} id={id} todos={column.todos} index={index} />
                ))}
              </div>
            )}
          </Droppable>
        </React.StrictMode>
      </DragDropContext> */}
      <DragDropContext onDragEnd={onDragEnd}>
			<React.StrictMode>
				<Droppable
					droppableId="all-columns"
					direction="horizontal"
					type="column"
				>
					{(droppableProvided) => (
						<div
							ref={droppableProvided.innerRef}
							{...droppableProvided.droppableProps}
							className="flex"
						>
							{state.columnOrder.map((columnId, index) => {
								const column = state.columns[columnId];
								const tasks = column.taskIds.map(
									(taskId) => state.tasks[taskId]
								);

								return (
									<Kolom
										key={column.id}
										column={column}
										tasks={tasks}
										index={index}
									/>
								);
							})}
							{droppableProvided.placeholder}
						</div>
					)}
				</Droppable>
			</React.StrictMode>
		</DragDropContext>
    </>
  )
}

export default Board