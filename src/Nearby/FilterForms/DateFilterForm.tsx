import React, { FunctionComponent } from "react";
import { DateProp } from "../../types";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const DateFilterForm: FunctionComponent<DateProp> = ({
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
  clearDate
}) => {
  const classes = useStyles();

  return (
    <Grid container>
      <form className={classes.container} noValidate>
        <TextField
          id="StartDate"
          label="Start Date"
          type="date"
          value={startDate}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          onChange={handleStartDateChange}
        />
        <Button
          variant="contained"
          size="small"
          className={classes.margin}
          onClick={clearDate(true)}
        >
          Clear
        </Button>
      </form>
      <form className={classes.container} noValidate>
        <TextField
          id="EndDate"
          label="End Date"
          type="date"
          value={endDate}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          onChange={handleEndDateChange}
        />
        <Button
          variant="contained"
          size="small"
          className={classes.margin}
          onClick={clearDate(false)}
        >
          Clear
        </Button>
      </form>
    </Grid>
  );
};

export default DateFilterForm;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 150
    },
    margin: {
      margin: theme.spacing(1)
    }
  })
);
