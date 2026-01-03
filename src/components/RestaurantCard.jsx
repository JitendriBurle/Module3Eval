import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ data, isAdmin, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <div style={{ border: "1px solid gray", padding: "20px" }}>
        <img src={data.image} width="200" />
        <h3>{data.restaurantName}</h3>
        <p>{data.address} </p>
        <p>{data.type}</p>
        <p>{data.parkingLot ? "Parking Available" : "No Parking"}</p>

        {isAdmin && (
            <>
            <button onClick={() => navigate(`/admin/restaurants/update/${data.restaurantID}`)}>Update</button>
            <button onClick={() => handleDelete(data.restaurantID)}>Delete</button>
            </>
        )}
        </div>
     );
};