'use client'
import { useBoardStore } from '@/store/BoardStore';
import React, { useState } from 'react';
import { useEffect } from 'react'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from './Column';

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

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <React.StrictMode>
          <Droppable droppableId="droppable" direction='horizontal' type='column'>
            {(provided) => (
              <div
                className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                { Array.from(board.columns.entries()).map(([id, column], index) => {
									return (
										<Column
											id={id}
											todos={column.todos}
											index={index}
											key={id} />
									);
								})}
              </div>
            )}
          </Droppable>
        </React.StrictMode>
      </DragDropContext>
    </>
  )
}

export default Board