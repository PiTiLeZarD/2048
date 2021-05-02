import { withStyles, Button } from "@material-ui/core";
import useStore from "./store";

const styles = (theme) => ({
    container: {
        marginBottom: "2em",
    },
});

const Header = (props) => {
    const { classes } = props;
    const { reset } = useStore();
    return (
        <div className={classes.container}>
            <Button variant="contained" onClick={(ev) => reset()}>
                New Game
            </Button>
        </div>
    );
};

export default withStyles(styles)(Header);
