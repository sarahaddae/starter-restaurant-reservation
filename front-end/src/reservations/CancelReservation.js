import { useHistory } from "react-router-dom";
import { updateReservationStatus } from "../utils/api";

// Updates the `status` of a reservation to "cancelled"

function CancelReservation({ reservation }) {
  const history = useHistory()
  const { reservation_id, reservation_date } = reservation
  
  async function cancelClickHandler() {
    const abortController = new AbortController();
    const cancelReservation = window.confirm(
      "\nDo you want to cancel this reservation? This cannot be undone."
    );

    if (!cancelReservation)
      return history.push(`/dashboard?date=${reservation_date}`);

    const updatedReservation = {
      reservation_id,
      status: "cancelled",
    };
    try {
      await updateReservationStatus(updatedReservation, abortController.signal);
    } catch (error) {
      console.log(error.message);
    }

    window.location.reload();

    return () => abortController.abort();
  }

  return (
    <button
      type="button"
      className="btn btn-sm btn-dark btn-block "
      data-reservation-id-cancel={reservation_id}
      onClick={() => cancelClickHandler()}
    >
      Cancel
    </button>
  );
}

export default CancelReservation;