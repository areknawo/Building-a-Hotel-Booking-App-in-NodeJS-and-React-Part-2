import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { confirmOffer, makeBooking } from "./api";

const BookingDialog = ({ offerId, setOfferId }) => {
  const [available, setAvailable] = useState(null);
  const handleClose = () => setOfferId(null);
  const handleBooking = async () => {
    const response = await makeBooking(offerId);

    if (response) {
      console.log(response);
      handleClose();
    }
  };

  useEffect(() => {
    if (offerId) {
      confirmOffer(offerId)
        .then((response) => {
          if (response) {
            const [offer] = response.offers;

            setAvailable(offer && offer.id === offerId);
          } else {
            setAvailable(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setAvailable(null);
    }
  }, [offerId]);

  return (
    <Dialog
      open={Boolean(offerId)}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="simple-dialog-title">BOOK THE OFFER</DialogTitle>
      <DialogContent>
        <DialogContentText>
          OFFER: {offerId} {available === false && " is not available"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          disabled={typeof available !== "boolean"}
        >
          CANCEL
        </Button>
        <Button
          color="primary"
          variant="contained"
          autoFocus
          disabled={!available}
          onClick={handleBooking}
        >
          CONTINUE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { BookingDialog };
