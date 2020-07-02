import React, { FunctionComponent } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { AccountProp } from "../../types";
import Button from "@material-ui/core/Button";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";

const AccountFilterForm: FunctionComponent<AccountProp> = ({
  accounts,
  handleAccountChange,
  selectAllAccounts
}) => {
  const classes = useStyles();

  function toNormalCase(str: string) {
    return str
      .toLowerCase()
      .split(" ")
      .map(function(word) {
        return word[0].toUpperCase() + word.substr(1);
      })
      .join(" ");
  }

  if (!Object.keys(accounts).length) {
    return <Alert severity="info">You don't have any accounts</Alert>;
  }

  return (
    <>
      <Box component="span">Select Accounts</Box>
      <Button
        variant="contained"
        size="small"
        className={classes.margin}
        onClick={selectAllAccounts(true)}
      >
        All
      </Button>
      <Button
        variant="contained"
        size="small"
        className={classes.margin}
        onClick={selectAllAccounts(false)}
      >
        None
      </Button>
      <FormGroup row>
        {accounts.map(account => (
          <FormControlLabel
            key={`${account.accountId}`}
            control={
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 20 }} />}
                checkedIcon={<CheckBoxIcon style={{ fontSize: 20 }} />}
                checked={account.isSelected}
                onChange={handleAccountChange(account.accountId)}
                color="primary"
              />
            }
            label={
              <Typography className={classes.formControlLabel}>
                {toNormalCase(account.accountName)}
              </Typography>
            }
          />
        ))}
      </FormGroup>
    </>
  );
};

export default AccountFilterForm;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1)
    },
    formControlLabel: { fontSize: "0.8rem", color: "#37474f" }
  })
);
