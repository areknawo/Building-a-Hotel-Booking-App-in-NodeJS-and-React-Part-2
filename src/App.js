import React, { useState } from "react";
import { Container, makeStyles } from "@material-ui/core";
import { Search } from "./Search";
import { DateFilters } from "./DateFilters";
import { Hotels } from "./Hotels";
import { BookingDialog } from "./BookingDialog";
import dayjs from "dayjs";

const useStyles = makeStyles({
  container: {
    padding: "1rem",
  },
  results: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "1rem",
    width: "100%",
  },
});
const App = () => {
  const classes = useStyles();
  const [cityCode, setCityCode] = useState(null);
  const [offerId, setOfferId] = useState(null);
  const [checkInDate, setCheckInDate] = useState(dayjs());
  const [checkOutDate, setCheckOutDate] = useState(dayjs().add(1, "day"));

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Search setCityCode={setCityCode} />
      <DateFilters
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        setCheckInDate={setCheckInDate}
        setCheckOutDate={setCheckOutDate}
      />
      <div className={classes.results}>
        <Hotels
          cityCode={cityCode}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          setOfferId={setOfferId}
        />
      </div>
      <BookingDialog offerId={offerId} setOfferId={setOfferId} />
    </Container>
  );
};

export { App };
