import { withStyles, Grid } from "@material-ui/core";
import Tile from "./Tile";

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

const getScore = () => Math.pow(2, Math.floor(Math.random() * 11 + 1));

const Board = (props) => {
    const { classes } = props;
    return (
        <div className={classes.container}>
            <style type="text/css">{`
                body, html {
                    background-color: #f8f7eb;
                }
            `}</style>
            {new Array(4).fill().map((_, row) => (
                <Grid container key={row}>
                    {new Array(4).fill().map((__, col) => (
                        <Grid item xs={3} key={`${row}_${col}`} className={classes.case}>
                            <Tile score={getScore()} />
                        </Grid>
                    ))}
                </Grid>
            ))}
        </div>
    );
};

export default withStyles(styles)(Board);
