'use client'
import Column from '@/components/Column';
import { useBoardStore } from '@/store/BoardStore';
import React from 'react';
import { useEffect } from 'react'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

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
      {/* <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='droppable' direction='horizontal' type='column'>
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
      </DragDropContext> */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {/* {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))} */}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default Board