import React, { FunctionComponent, useEffect, useCallback } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Paper from "@material-ui/core/Paper";
import { createStyles } from "@material-ui/core";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import styled from "styled-components";
import { setFavouriteItems } from "../API/API";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';

import {
  Recommendation,
  EventListProps,
  Items,
  Transaction,
  Account
} from "../types";

//login logout

const EventsList: FunctionComponent<EventListProps> = ({
  events,
  statuses,
  categories,
  startDate,
  endDate,
  startDistance,
  endDistance,
  handleAddFavorite,
  setLogoutState,
  isLoggedIn
}) => {
  const [distanceSorting, setDistanceSorting] = React.useState("asc");
  const [dateSorting, setDateSorting] = React.useState("asc");
  const [filteredEvents, setFilteredEvents] = React.useState<Recommendation[]>(
    []
  );
  const [totalAmount, setTotalBalance] = React.useState("");
  const [favouriteItemError, setFavouriteItemError] = React.useState("");

  const classes = useStyles();
  const getFilteredEvents = useCallback(
    (
      statuses: Items,
      categories: Items,
      startDate: string,
      endDate: string,
      startDistance: number,
      endDistance: number
    ) => {
      let newFilteredEvents = [];
      for (let index = 0; index < events.length; index++) {
        let event = events[index];
        if (
          includeSelectedCategory(event, categories) &&
          statuses[event.status] &&
          isInRange(
            event.localDate.toString(),
            startDate.toString(),
            endDate.toString()
          ) &&
          isInRange(event.distance, startDistance, endDistance)
        ) {
          newFilteredEvents.push(event);
        }
      }
      sortDistance("asc", newFilteredEvents);
    },
    [events]
  );

  useEffect(() => {
    getFilteredEvents(
      statuses,
      categories,
      startDate,
      endDate,
      startDistance,
      endDistance
    );
  }, [statuses, categories, startDate, endDate, startDistance, endDistance]);

  // distance, date: use the same method
  const handleDistanceSorting = () => (event: React.MouseEvent<unknown>) => {
    let sortingMethod = distanceSorting === "asc" ? "desc" : "asc";
    sortDistance(sortingMethod, events);
    setDistanceSorting(sortingMethod);
  };

  function sortDistance(sortingMethod: string, events: Recommendation[]) {
    events.sort(function(t1, t2) {
      if (t1.distance > t2.distance) {
        return sortingMethod === "asc" ? 1 : -1;
      }
      if (t2.distance > t1.distance) {
        return sortingMethod === "asc" ? -1 : 1;
      }
      return 0;
    });
    setFilteredEvents(events);
  }

  const handleDateSorting = () => (event: React.MouseEvent<unknown>) => {
    let sortingMethod = dateSorting === "asc" ? "desc" : "asc";

    sortDate(sortingMethod, events);
    setDateSorting(sortingMethod);
  };

  function sortDate(sortingMethod: string, events: Recommendation[]) {
    events.sort(function(t1, t2) {
      if (t1.localDate > t2.localDate) {
        return sortingMethod === "asc" ? 1 : -1;
      }
      if (t2.localDate > t1.localDate) {
        return sortingMethod === "asc" ? -1 : 1;
      }
      return 0;
    });
    setFilteredEvents(events);
  }

  function includeSelectedCategory(event: Recommendation, categories: Items) {
    return event.categories.reduce(
      (acc, category) => acc || categories[category.categoryType],
      false
    );
  }

  function isInRange(target: any, start: any, end: any) {
    let afterStart = start == null || target >= start;
    let beforeEnd = end == null || target <= end;
    return afterStart && beforeEnd;
  }

  const changeFavoriteState = (item: Recommendation) => (
    event: React.MouseEvent<unknown>
  ) => {
    setFavouriteItems(!item.favorite, item.itemId)
      .then(response => {
        if (response.statusCode == 403) setLogoutState();
        if (response.statusCode == 200)
        handleAddFavorite(item.itemId, !item.favorite);
      })
      .catch(error => setFavouriteItemError(error));
  };

  return (
    <EventList>
      <ThemeProvider theme={theme}>
        <>
          Sort by distance
          <TableSortLabel
            active={true}
            direction={distanceSorting === "asc" ? "asc" : "desc"}
            onClick={handleDistanceSorting()}
          ></TableSortLabel>
        </>

        <>
          Sort by date
          <TableSortLabel
            active={true}
            direction={dateSorting === "asc" ? "asc" : "desc"}
            onClick={handleDateSorting()}
          ></TableSortLabel>
        </>

        {filteredEvents.map(event => (
          <EventItem key={event.itemId}>
            <EventDescription>
              <Image alt="item image" src={event.imageUrl} />
              <div>
                <Link href={event.url}>{event.name}</Link>
                <p>{event.categories.reduce((acc, category) => {
      acc.push(category.categoryType);
      return acc;
    }, []).join(", ")}</p>
                {/* <Ratings>
              <p>Rating</p>
              {Array(event.rating).map((e, i) => (
                <StarRoundedIcon color="secondary" key={i} />
              ))}
              <StarRoundedIcon color="secondary" key={0} />
            </Ratings> */}

                <Address>
                  {event.address}
                  {"  "}
                  {"(" + event.distance + " miles)"}
                </Address>
                <p>
                  {event.localDate} {event.time}
                </p>
              </div>
            </EventDescription>
            <Favourite>
              <Tooltip disableFocusListener title={!isLoggedIn&&"Please login"}>
                <Button
                  // variant="contained"
                  // color="secondary"
                  className={classes.button}
                  startIcon={
                    event.favorite ? (
                      <FavoriteIcon color="secondary" />
                    ) : (
                      <FavoriteBorderIcon />
                    )
                  }
                  onClick={changeFavoriteState(event)}
                />
              </Tooltip>
            </Favourite>
          </EventItem>
        ))}
      </ThemeProvider>
    </EventList>
  );
};

export default EventsList;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableHead: {
      fontSize: "10pt",
      fontWeight: "bold"
    },
    tableCell: {
      fontSize: "10pt"
    },
    button: {
      margin: theme.spacing(1)
    }
  })
);

const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: 12
    },
    body1: {
      fontWeight: 500
    },
    button: {
      fontStyle: "italic"
    }
  }
});
//https://material-ui.com/zh/customization/typography/

const EventList = styled.div`
  background: #f2ebd9;
  color: #624630;
  list-style: none;
  // margin-left: 180px;
  min-height: 250px;
  padding: 10px;
`;

const EventItem = styled.div`
  align-items: center;
  border-bottom: 1px solid #ffffff;
  display: flex;
  margin: 10px;
  padding: 15px;
  transition: background-color 100ms linear;
  justify-content: space-between;
`;

const EventDescription = styled.div`
  align-items: center;
  display: flex;
`;

const Image = styled.img`
  margin-right: 20px;
  border: 1px solid #ffffff;
  height: 80px;
  width: 130px;
`;

const Link = styled.a`
  border: 1px solid #ffffff;
  height: 80px;
  width: 80px;
  &:hover {
    text-decoration: underline;
  }
`;

const Address = styled.p`
  // // line-height: 20px;
  // padding-right: 20px;
  // text-align: right;
`;

const Favourite = styled.div`
  border-left: 1px solid #ffffff;
  cursor: pointer;
  line-height: 60px;
  text-align: center;
  float:right；
  width: 60px;
  &:hover {
    color: #f13f3f;
  }
`;

const Ratings = styled.div`
  align-items: center;
  display: flex;
  padding-top: 10px;
`;
