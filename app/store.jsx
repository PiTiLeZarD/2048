import create from "zustand";

const DEFAULT_WIDTH = 4;
const DEFAULT_HEIGHT = 4;

const rand = (precision) => Math.floor(Math.random() * precision);
const getRandomScore = () => (rand(100) > 75 ? 4 : 2);
const flatten = (arrays) => [].concat.apply([], arrays);

const emptyBoard = (w, h) => new Array(h).fill().map((_w, iw) => new Array(w).fill());
const boardSize = (board) => ({ w: board[0].length, h: board.length });
const getEmptyTilesPositions = (board) =>
    flatten(
        board.map((row, y) =>
            row.map((col, x) => {
                return col == undefined ? { x, y } : null;
            })
        )
    ).filter(Boolean);
const getRandomEmptyTile = (board) => {
    const emptyTiles = getEmptyTilesPositions(board);
    return emptyTiles[rand(emptyTiles.length)];
};
const addTile = (board) => {
    const position = getRandomEmptyTile(board);
    if (position) {
        (({ x, y }) => (board[y][x] = getRandomScore()))(position);
    }
    return board;
};
const newBoard = (w, h) => addTile(addTile(emptyBoard(w, h)));

const applyRowVectors = (row, vectors) => {
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

        updatedRow = applyRowVectors([...row], vectors);
    }
    return vectors;
};
const boardVectors = (board) => board.map((row, y) => rowVectors(row));
const applyBoardVectors = (board, vectors) => board.map((row, y) => applyRowVectors(row, vectors[y]));

const transpose = (board) => {
    const { w, h } = boardSize(board);
    const newBoard = emptyBoard(h, w);

    for (let row = 0; row < h; row++) {
        for (let col = 0; col < w; col++) {
            newBoard[col][row] = board[row][col];
        }
    }

    return newBoard;
};
const flipBoard = (board) =>
    board.map((row, y) => {
        row.reverse();
        return row;
    });

const moveBoard = (board, direction) => {
    if (direction == "left") return applyBoardVectors(board, boardVectors(board));
    if (direction == "right") return flipBoard(moveBoard(flipBoard(board), "left"));
    return transpose(moveBoard(transpose(board), { down: "right", up: "left" }[direction]));
};

const useStore = create((set) => ({
    w: DEFAULT_WIDTH,
    h: DEFAULT_HEIGHT,
    board: newBoard(DEFAULT_WIDTH, DEFAULT_HEIGHT),
    setSize: (w, h) => set((state) => ({ w, h, board: newBoard(w, h) })),
    reset: () => set(({ w, h, setSize }) => setSize(w, h)),
    move: (direction) => set(({ board }) => ({ board: addTile(moveBoard(board, direction)) })),
}));

export default useStore;
