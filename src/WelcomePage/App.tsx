import React from "react";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const App = ()=> {
  const classes = useStyles();

  return (
    <div>
      <span className={classes.imageBackground} />
      <div className={classes.welcomeBox}>
        <Box borderColor="grey.500" border={3} className={classes.box}>
          <Button size="large" className={classes.textHead} disabled>
            Welcome!
          </Button>
          <ButtonGroup
            className={classes.backgroundColor}
            orientation="vertical"
            color="inherit"
            aria-label="vertical contained primary button group"
            variant="text"
          >
            <Button className={classes.text}>
              <Link href="/TransactionsPage" color="inherit">
                Check Your Transactions
              </Link>
            </Button>
            <Button className={classes.text}>
              <Link href="/AccountsPage" color="inherit">
                Check Your Accounts
              </Link>
            </Button>
          </ButtonGroup>
        </Box>
      </div>
    </div>
  );
}

export default App;

const imageUrl =
  "https://media.istockphoto.com/vectors/online-banking-seamless-pattern-with-thin-line-icons-deposit-app-vector-id1044846904";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      fontSize: "11pt",
      fontWeight: "bold",
      display: "block",
      color: theme.palette.common.black
    },
    textHead: {
      fontSize: "15pt",
      fontWeight: "bold",
      display: "block",
      alignItems: "center"
    },
    welcomeBox: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.common.white
    },
    box: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.common.white
    },
    backgroundColor: {
      padding: 30
    },
    imageBackground: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      // backgroundColor: theme.palette.common.black,
      backgroundImage: `url(${imageUrl})`,
      opacity: 0.5,
      transition: theme.transitions.create("opacity")
    }
  })
);
