import { Grid } from "@material-ui/core";
import Board from "./Board";

const App = (props) => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh" }}
        >
            <Grid item xs={12}>
                <Board />
            </Grid>
        </Grid>
    );
};
export default App;
