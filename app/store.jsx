import create from "zustand";

const DEFAULT_WIDTH = 4;
const DEFAULT_HEIGHT = 4;

const getScore = () => Math.pow(2, Math.floor(Math.random() * 3 + 1));
const boardTiles = (w, h) => new Array(h).fill().map((_w, iw) => new Array(w).fill());
const fillBoard = (board) => {
    new Array(8).fill().map((_, i) => {
        const x = Math.floor(Math.random() * board[0].length);
        const y = Math.floor(Math.random() * board.length);
        board[y][x] = getScore();
    });
    return board;
};
const emptyBoard = (w, h) => fillBoard(boardTiles(w, h));

const applyVectors = (row, vectors) => {
    vectors.map(([from, to]) => {
        row[to] = (row[from] || 0) + (row[to] || 0);
        row[from] = undefined;
    });
    return row;
};
const rowVectors = (row) => {
    let vectors = [];
    let pointer = 0;
    let updatedRow = [...row];

    for (let i = 1; i < row.length; i++) {
        if (updatedRow[i] == undefined) continue;
        if (updatedRow[pointer] != undefined && updatedRow[i] != updatedRow[pointer]) pointer += 1;
        if (i == pointer) continue;

        vectors = [...vectors, [i, pointer]];
        if (updatedRow[pointer] != undefined) pointer += 1;

        updatedRow = applyVectors([...row], vectors);
    }
    return vectors;
};

const moveBoard = (board) => board.map((row) => applyVectors(row, rowVectors(row)));

const useStore = create((set) => ({
    w: DEFAULT_WIDTH,
    h: DEFAULT_HEIGHT,
    board: emptyBoard(DEFAULT_WIDTH, DEFAULT_HEIGHT),
    setSize: (w, h) => set((state) => ({ w, h, board: emptyBoard(w, h) })),
    reset: () => set(({ w, h, setSize }) => setSize(w, h)),
    test: () => set(({ board }) => ({ board: moveBoard(board) })),
}));

export default useStore;
