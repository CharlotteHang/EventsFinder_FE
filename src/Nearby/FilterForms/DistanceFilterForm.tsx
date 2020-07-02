import React, { FunctionComponent } from "react";
import { createStyles, makeStyles, Theme  } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import VolumeUp from '@material-ui/icons/VolumeUp';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { DistanceProp } from "../../types";

const DistanceFilterForm: FunctionComponent<DistanceProp> = ({
    startDistance, 
    endDistance,
    handleDistanceChange,
    clearDistance
}) => {
  const classes = useStyles();
  function valuetext(value: number) {
    return `${value} CAD`;
  }
console.log(startDistance)
console.log(endDistance)

  return (
    <div className={classes.root}>
      {/* <Typography id="range-slider" gutterBottom>
        Distance Range
      </Typography> */}
      <Box component="span">Distance Range</Box>
      <Grid container spacing={2} alignItems="center">
        {/* <Grid item>
          <VolumeUp />
        </Grid> */}
        <Grid item xs>
          <Slider
            value={[startDistance, endDistance]}
            onChange={handleDistanceChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
          />
        </Grid>
        <Button
          variant="contained"
          size="small"
          className={classes.margin}
          onClick={clearDistance}
        >
          Clear
        </Button>
      </Grid>
    </div>
  );
}

export default DistanceFilterForm;

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
      width: 250,
    },
    input: {
      width: 42,
    },
    margin: {
      margin: theme.spacing(1)
    }
  }));