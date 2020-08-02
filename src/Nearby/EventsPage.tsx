import React, { useEffect, useState } from "react";
import EventsList from "./EventsList";
import DistanceFilterForm from "./FilterForms/DistanceFilterForm";
import FilterForm from "./FilterForms/FilterForm";
import DateFilterForm from "./FilterForms/DateFilterForm";
import styled from "styled-components";
import {
  Items,
  Location,
  Recommendation,
  RecommendationResponse,
  Category
} from "../types";
import { logout, getLocation, getLoginState } from "../API/API";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";
import { NavigationBar } from "../NavigationBar/NavigationBar";

export const EventsPage = (
  method: any,
  isFavoritePage: boolean,
  isNearbyPage: boolean
) => {
  const [location, setLocation] = useState<string>(null);
  const [isLocationLoded, setIsLocationLoded] = useState(false);
  const [locationLoadingError, setLocationLoadingError] = useState("");

  const [events, setEvents] = useState<Recommendation[]>([]);
  const [areEventsLoaded, setAreEventsLoaded] = useState(false);
  const [eventsLoadingError, setEventsLoadingError] = useState("");

  const [categories, setCategories] = useState<Items>(null);
  const [statuses, setStatuses] = useState<Items>(null);

  const [earliestDate, setEarliestDate] = useState<string>(null);
  const [lateestDate, setLatestDate] = useState<string>(null);

  const [startDate, setStartDate] = useState<string>(null);
  const [endDate, setEndDate] = useState<string>(null);

  const [startDistance, setStartDistance] = useState<number>(0);
  const [endDistance, setEndDistance] = useState<number>(100);
  const [largestDistance, setLargestDistance] = useState<number>(null);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userName, setUserName] = React.useState("");

  useEffect(() => {
    if (!isFavoritePage) {
      getLocation()
        .then((result: Location) => {
          console.log(result);
          setIsLocationLoded(true);
          setLocation(result.loc);
        })
        .catch((error: string) => {
          setEventsLoadingError(error);
        });
    }
  }, []);

  useEffect(() => {
    getLoginState().then(response => {
      console.log(response);
      if (response.data.logined) {
        console.log(response.data.logined);
        setIsLoggedIn(true);
        setUserName(response.data.firstName);
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    });
  }, []);
  // for nearby and recommendtaion page
  useEffect(() => {
    if (location != null) {
      if (!isFavoritePage) {
        let loc = getLocationInfo(location);
        method(loc[0], loc[1], "")
          .then((result: RecommendationResponse) => {
            console.log("get nearby and recommended items");
            console.log(result);
            setEvents(result.data);
          })
          .then(() => setAreEventsLoaded(true))
          .catch((error: string) => setEventsLoadingError(error));
      }
    }
  }, [location, isLoggedIn]);
  // for favorite page
  useEffect(() => {
    if (isFavoritePage) {
      method()
        .then((result: RecommendationResponse) => {
          console.log(result);
          setEvents(result.data);
        })
        .then(() => setAreEventsLoaded(true))
        .catch((error: string) => setEventsLoadingError(error));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (events && events.length > 0) {
      setCategories(getCategoriesWithoutDuplicate());
      setStatuses(getStatusesWithoutDuplicate());
      let startAndEndDate = getStartAndEndDate();
      setStartDate(startAndEndDate.startDate);
      setEarliestDate(startAndEndDate.startDate);
      setEndDate(startAndEndDate.endDate);
      setLatestDate(startAndEndDate.endDate);

      setLargestDistance(100); //set customized value
    }
  }, [events]);

  const getLocationInfo = (loc: string) => loc.split(",");

  const getCategoriesWithoutDuplicate = () => {
    let categories = events.reduce((acc, event) => {
      acc.push(...event.categories);
      return acc;
    }, []);

    let categoiesWithoutDuplicate = categories.reduce(
      (acc, category: Category) => {
        acc[category.categoryType] = true;
        return acc;
      },
      {}
    );
    return categoiesWithoutDuplicate;
  };

  const getStatusesWithoutDuplicate = () => {
    let statuses = events.reduce((acc, event) => {
      acc[event.status] = true;
      return acc;
    }, {});
    return statuses;
  };

  const getStartAndEndDate = () => {
    let startAndEndDate = events.reduce(
      (acc, event) => {
        if (event.localDate < acc.startDate) {
          acc.startDate = event.localDate;
        }
        if (event.localDate > acc.endDate) {
          acc.endDate = event.localDate;
        }
        return acc;
      },
      { startDate: events[0].localDate, endDate: events[0].localDate }
    );
    return startAndEndDate;
  };

  const getLargestDistance = () => {
    let largestDistance = events.reduce((acc, event) => {
      if (event.distance > acc) {
        return event.distance;
      }
      return acc;
    }, 0);
    return largestDistance;
  };

  const handleCategoryChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategories({ ...categories, [name]: !categories[name] });
  };

  const handleStatusChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStatuses({ ...statuses, [name]: !statuses[name] });
  };

  const selectAllCategories = (selectAll: boolean) => (
    event: React.MouseEvent<unknown>
  ) => {
    var newCategories = {};
    for (var name in categories) {
      newCategories[name] = selectAll;
    }
    setCategories(newCategories);
  };

  const selectAllStatuses = (selectAll: boolean) => (
    event: React.MouseEvent<unknown>
  ) => {
    var newStatuses = {};
    for (var name in categories) {
      newStatuses[name] = selectAll;
    }
    setStatuses(newStatuses);
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setEndDate(event.target.value);
  };

  const clearDate = (isStartDate: boolean) => (
    event: React.MouseEvent<unknown>
  ) => {
    if (isStartDate) setStartDate(earliestDate);
    else setEndDate(lateestDate);
  };

  const handleDistanceChange = (event: any, newValue: number | number[]) => {
    console.log(event);
    setStartDistance(parseInt(newValue[0]));
    setEndDistance(parseInt(newValue[1]));
  };

  const handleAddFavorite = (id: string, addFavorite: boolean) => {
    let newEvents = events.reduce((acc, event) => {
      if (event.itemId === id) {
        event.favorite = addFavorite;
      }
      acc.push(event);
      return acc;
    }, []);
    setEvents(newEvents);
  };

  const setLogoutState = () => {
    setIsLoggedIn(false);
    setUserName("");
  };

  const handleLogout = () => {
    logout().then(response => {
      if (response.statusCode == 200) setLogoutState();
    });
  };

  const clearDistance = () => (event: React.MouseEvent<unknown>) => {
    setStartDistance(0);
    setEndDistance(100); // set customized
  };

  if (!(setAreEventsLoaded && setAreEventsLoaded))
    return (
      <div>
        <LinearProgress />
      </div>
    );
  else {
    let errorMessage = locationLoadingError + eventsLoadingError;
    if (errorMessage)
      return (
        <Alert severity="error">This is an error alert — {errorMessage}!</Alert>
      );
  }
  console.log(events);
  return (
    <Container>
      <NavigationBar
        loggedIn={isLoggedIn}
        name={userName}
        handleLogout={handleLogout}
      ></NavigationBar>
      <HeaderContainer>
        <Header>
          <span color="#FBAF41">Event</span> <br /> Recommendation
        </Header>
      </HeaderContainer>
      {/* isFavourite? */}
      {!isNearbyPage && !isLoggedIn ? (
        <Alert severity="error">
          Please login to view{" "}
          {isFavoritePage ? "your favorite" : "the recommended"} events!
        </Alert>
      ) : (
        <>
          <Box p={2} m={2}>
            <FilterForm
              items={statuses}
              itemName="Statuses"
              handleItemsChange={handleStatusChange}
              selectAllItems={selectAllStatuses}
            ></FilterForm>
            <FilterForm
              items={categories}
              itemName="Categories"
              handleItemsChange={handleCategoryChange}
              selectAllItems={selectAllCategories}
            ></FilterForm>
            <Box p={2} m={0} bgcolor="grey.100">
              <DateFilterForm
                startDate={startDate}
                endDate={endDate}
                handleStartDateChange={handleStartDateChange}
                handleEndDateChange={handleEndDateChange}
                clearDate={clearDate}
              ></DateFilterForm>
            </Box>
            <Box p={2} m={0} bgcolor="grey.100">
              <DistanceFilterForm
                startDistance={startDistance}
                endDistance={endDistance}
                handleDistanceChange={handleDistanceChange}
                clearDistance={clearDistance}
              ></DistanceFilterForm>
            </Box>
            <Box p={0} m={0}>
              <EventsList
                events={events}
                statuses={statuses}
                categories={categories}
                startDate={startDate}
                endDate={endDate}
                startDistance={startDistance}
                endDistance={endDistance}
                handleAddFavorite={handleAddFavorite}
                setLogoutState={setLogoutState}
                isLoggedIn={isLoggedIn}
              ></EventsList>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  min-width: 600px;
`;

const HeaderContainer = styled.div`
  align-items: center;
  background: url("https://www.jocooks.com/wp-content/uploads/2012/03/sex-in-a-pan-1-1.jpg")
    no-repeat 50% 50%;
  background-size: 100%;
  display: flex;
  height: 250px;
`;

const Header = styled.p`
  border-left: 1px solid #ffffff;
  font-weight: 400;
  font-size: 2em;
  line-height: 1em;
  margin-left: 220px;
  padding-left: 5px;
  color: white;
`;
