import React, { FunctionComponent } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { ItemProp } from "../../types";
import Button from "@material-ui/core/Button";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const FilterForm: FunctionComponent<ItemProp> = ({
  items,
  itemName,
  handleItemsChange,
  selectAllItems
}) => {
  const classes = useStyles();

  function toNormalCase(str: string) {
    return str
      .toLowerCase()
      .split("_")
      .map(function(word) {
        return word[0].toUpperCase() + word.substr(1);
      })
      .join(" ");
  }
  console.log(items);
  if (!items || !Object.keys(items).length) {
    return <></>;
  }

  return (
    <Box p={2} m={0} bgcolor="grey.100">
      <Box component="span">Select {itemName}</Box>
      <Button
        variant="contained"
        size="small"
        className={classes.margin}
        onClick={selectAllItems(true)}
      >
        All
      </Button>
      <Button
        variant="contained"
        size="small"
        className={classes.margin}
        onClick={selectAllItems(false)}
      >
        None
      </Button>
      <FormGroup row>
        {Object.keys(items).map(name => {
          return (
            <FormControlLabel
              key={`${name}`}
              control={
                <Checkbox
                  style={{ width: 18, height: 18 }}
                  icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 20 }} />}
                  checkedIcon={<CheckBoxIcon style={{ fontSize: 20 }} />}
                  checked={items[name]}
                  onChange={handleItemsChange(name)}
                  color="primary"
                />
              }
              label={
                <Typography className={classes.formControlLabel}>
                  {toNormalCase(name)}
                </Typography>
              }
            />
          );
        })}
      </FormGroup>
    </Box>
  );
};

export default FilterForm;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControlLabel: { fontSize: "0.8rem", color: "#37474f" },
    margin: {
      margin: theme.spacing(1)
    }
  })
);
