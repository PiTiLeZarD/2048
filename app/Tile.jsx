import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
    tile: {
        width: "150px",
        height: "150px",
        lineHeight: "150px",
        fontSize: "50px",
        color: "#f9f6f2",
        textAlign: "center",
        borderRadius: "5px",
        backgroundColor: "#c2b3a6",
    },
    s2: {
        backgroundColor: "#eee4da",
        color: "#776e65",
    },
    s4: {
        backgroundColor: "#eee1c9",
        color: "#776e65",
    },
    s8: {
        backgroundColor: "#f3b27a",
    },
    s16: {
        backgroundColor: "#f69664",
    },
    s32: {
        backgroundColor: "#f77c5f",
    },
    s64: {
        backgroundColor: "#f75f3b",
    },
    s128: {
        backgroundColor: "#edd073",
    },
    s256: {
        backgroundColor: "#edcc62",
    },
    s512: {
        backgroundColor: "#edc950",
    },
    s1024: {
        backgroundColor: "#edc53f",
    },
    s2048: {
        backgroundColor: "#edc22e",
    },
});

const Tile = (props) => {
    const { classes, score } = props;

    return <div className={`${classes.tile} ${classes["s" + score]}`}>{score}</div>;
};

export default withStyles(styles)(Tile);
