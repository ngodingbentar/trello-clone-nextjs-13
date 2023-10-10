import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn'
import { Board, Column, TypedColumn } from '@/typings'
import { create } from 'zustand'

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>()
  },
  getBoard: async() => {
    console.log('function useBoardStore')
    const board = await getTodosGroupedByColumn()
    set({board})
  },
  setBoardState: (board) => set({ board }),
}))