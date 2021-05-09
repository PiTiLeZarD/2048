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
    if (!emptyTiles.length) return null;
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
    const newRow = [...row];
    let scoreIncrease = 0;
    vectors.map(([from, to]) => {
        newRow[to] = (newRow[from] || 0) + (newRow[to] || 0);
        scoreIncrease += newRow[to] - newRow[from];
        newRow[from] = undefined;
    });
    return [newRow, scoreIncrease];
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

        [updatedRow, _] = applyRowVectors([...row], vectors);
    }
    return vectors;
};

const boardVectors = (board) => board.map((row, y) => rowVectors(row));
const applyBoardVectors = (board, vectors) => board.map((row, y) => applyRowVectors(row, vectors[y])[0]);
const getScoreIncrease = (board, vectors) =>
    board.reduce((score, row, i) => score + applyRowVectors(row, vectors[i])[1], 0);

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
    if (direction == "left") {
        const vectors = boardVectors(board);
        const scoreIncrease = getScoreIncrease(board, vectors);
        return [applyBoardVectors(board, vectors), scoreIncrease];
    }
    if (direction == "right") {
        return (([board, scoreIncrease]) => [flipBoard(board), scoreIncrease])(moveBoard(flipBoard(board), "left"));
    }

    return (([board, scoreIncrease]) => [transpose(board), scoreIncrease])(
        moveBoard(transpose(board), { down: "right", up: "left" }[direction])
    );
};

const useStore = create((set) => ({
    w: DEFAULT_WIDTH,
    h: DEFAULT_HEIGHT,
    board: newBoard(DEFAULT_WIDTH, DEFAULT_HEIGHT),
    score: 0,
    setSize: (w, h) => set(() => ({ w, h, board: newBoard(w, h) })),
    addScore: (scoreIncrease) => set(({ score }) => ({ score: score + scoreIncrease })),
    reset: () =>
        set(({ w, h, setSize }) => {
            setSize(w, h);
            return { score: 0 };
        }),
    move: (direction) =>
        set(({ board, addScore }) => ({
            board: (([board, scoreIncrease]) => {
                addScore(scoreIncrease);
                return addTile(board);
            })(moveBoard(board, direction)),
        })),
}));

export default useStore;
