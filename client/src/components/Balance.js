import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles({
  root: {
    minWidth: 350,
  },
});

function Balance(props) {
  const classes = useStyles();
  const [topupValue, setTopupValue] = React.useState("");

  return (
    <Card className={classes.root}>
      <CardHeader title="Balance" />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <CardContent>
          <Box display="flex" flexDirection="row" mt={-1}>
            <Box px={2}>
              <MonetizationOnIcon />
            </Box>
            <Typography display="inline">
              Rp.&nbsp;
              <Box display="inline" id="balance">
                {props.balance
                  ? props.balance
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  : "-"}
              </Box>
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Box px={3} mb={2} display="flex" alignItems="center">
            <TextField
              value={topupValue}
              onChange={(e) => setTopupValue(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rp.</InputAdornment>
                ),
              }}
            />
            <Box pl={2}>
              <Button
                onClick={() => {
                  props.handleTopup(topupValue);
                  setTopupValue("");
                }}
              >
                Top up
              </Button>
            </Box>
          </Box>
        </CardActions>
      </Box>
    </Card>
  );
}

export default Balance;
