import create from "zustand";

const DEFAULT_WIDTH = 4;
const DEFAULT_HEIGHT = 4;

const getScore = () => Math.pow(2, Math.floor(Math.random() * 11 + 1));
const boardTiles = (w, h) => new Array(h).fill().map((_w, iw) => new Array(w).fill());
const fillBoard = (board) => {
    new Array(5).fill().map((_, i) => {
        const x = Math.floor(Math.random() * board[0].length);
        const y = Math.floor(Math.random() * board.length);
        board[y][x] = getScore();
    });
    return board;
};
const emptyBoard = (w, h) => fillBoard(boardTiles(w, h));

const useStore = create((set) => ({
    w: DEFAULT_WIDTH,
    h: DEFAULT_HEIGHT,
    board: emptyBoard(DEFAULT_WIDTH, DEFAULT_HEIGHT),
    setSize: (w, h) => set((state) => ({ w, h, board: emptyBoard(w, h) })),
    reset: () => set(({ w, h, setSize }) => setSize(w, h)),
}));

export default useStore;
