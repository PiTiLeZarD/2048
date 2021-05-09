import { withStyles, Button, Slider } from "@material-ui/core";
import useStore from "./store";

const styles = (theme) => ({
    container: {
        marginBottom: "2em",
    },
});

const Header = (props) => {
    const { classes } = props;
    const { reset, w, h, setSize, score } = useStore();
    return (
        <div className={classes.container}>
            Width:
            <Slider
                defaultValue={w}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={2}
                max={8}
                onChange={(ev, newW) => {
                    if (newW != w) setSize(newW, h);
                }}
            />
            Height:
            <Slider
                defaultValue={h}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={2}
                max={8}
                onChange={(ev, newH) => {
                    if (newH != h) setSize(w, newH);
                }}
            />
            <Button variant="contained" onClick={(ev) => reset()}>
                New Game
            </Button>
            Score {score}
        </div>
    );
};

export default withStyles(styles)(Header);
