import React from "react";
// import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import RequestItem from "./RequestItem.js";

// import IngredientDetailItem from "./IngredientDetailItem.js";

const styles = (theme) => ({
  table: {
    minWidth: 350,
  },
});

class Requests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
    };
  }

  handleApprove = (i) => {
    fetch(
      "http://localhost:9000/request/deliver/" +
        this.state.requests[i].requestID,
      {
        method: "POST",
      }
    )
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        if (res.return) {
          var newRequest = this.state.requests;
          newRequest[i].status = "Delivered";
          this.setState({ requests: newRequest });
        }
      })
      .catch((err) => console.log(err));
  };

  updateRequests = () => {
    fetch("http://localhost:9000/request/")
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        this.setState({ requests: res.return });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    if (this.state.requests.length === 0) {
      this.updateRequests();
    }
  }

  render() {
    const classes = this.props;
    return (
      <Card className={classes.root}>
        <CardHeader title="Requests" />
        <CardContent>
          <TableContainer>
            <Table className={classes.table} aria-label="request table">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Request Date</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.requests.map((row, index) => (
                  <RequestItem
                    requestID={row.requestID}
                    amount={row.amount}
                    status={row.status}
                    requestDate={row.requestDate}
                    handleApprove={this.handleApprove}
                    index={index}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Requests);
