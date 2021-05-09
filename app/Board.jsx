import { useEffect } from "react";
import { withStyles, Grid } from "@material-ui/core";
import Tile from "./Tile";
import useStore from "./store";

const styles = (theme) => ({
    container: {
        border: "2px solid #ad9d8f",
        backgroundColor: "#bbada0",
        borderRadius: "5px",
        padding: "0.5em",
    },
    case: {
        padding: "0.5em",
        backgroundColor: "transparent",
    },
});

const Board = (props) => {
    const { classes } = props;

    const { board, w, move } = useStore();

    useEffect(() => {
        const mappings = {
            w: (ev) => move("up"),
            a: (ev) => move("left"),
            s: (ev) => move("down"),
            d: (ev) => move("right"),
            ArrowUp: (ev) => move("up"),
            ArrowLeft: (ev) => move("left"),
            ArrowDown: (ev) => move("down"),
            ArrowRight: (ev) => move("right"),
        };

        document.addEventListener("keydown", (ev) => (mappings[ev.key] || ((ev) => {}))(ev));
    }, []);

    return (
        <div className={classes.container}>
            <style type="text/css">{`
                body, html {
                    background-color: #f8f7eb;
                }
            `}</style>

            {board.map((row, i) => (
                <Grid container key={i}>
                    {row.map((score, j) => (
                        <Grid item xs={12 / w} key={`${i}_${j}`} className={classes.case}>
                            <Tile score={score} />
                        </Grid>
                    ))}
                </Grid>
            ))}
        </div>
    );
};

export default withStyles(styles)(Board);
