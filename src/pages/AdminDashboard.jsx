import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RestaurantCard from "../components/RestaurantCard";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [parking, setParking] = useState("");

  const [form, setForm] = useState({
    restaurantName: "",
    address: "",
    type: "",
    parkingLot: "",
    image:
      "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766-eca8da47c2f1/2izhqnTaNLdenHYF.jpeg",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("evalData")) || [];
    setData(stored);
  }, []);

  const handleAdd = () => {
    if (
      !form.restaurantName ||
      !form.address ||
      !form.type ||
      !form.parkingLot
    ) {
      alert("Fill all fields");
      return;
    }

    const newRestaurant = {
      ...form,
      restaurantID: Date.now(),
      parkingLot: form.parkingLot === "true",
    };

    const updated = [...data, newRestaurant];
    localStorage.setItem("evalData", JSON.stringify(updated));
    setData(updated);

    alert("Restaurant added");

    setForm({
      restaurantName: "",
      address: "",
      type: "",
      parkingLot: "",
      image: form.image,
    });
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete?")) return;

    const updated = data.filter((r) => r.restaurantID !== id);
    localStorage.setItem("evalData", JSON.stringify(updated));
    setData(updated);

    alert("Deleted successfully");
  };

  const filteredData = data.filter((r) => {
    return (
      (r.restaurantName.toLowerCase().includes(search.toLowerCase()) ||
        r.address.toLowerCase().includes(search.toLowerCase())) &&
      (type ? r.type === type : true) &&
      (parking ? r.parkingLot.toString() === parking : true)
    );
  });

  return (
    <>
      <Navbar setSearch={setSearch} setType={setType} setParking={setParking} />

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ width: "30%" }}>
          <h3>Add Restaurant</h3>

          <input
            placeholder="Name"
            value={form.restaurantName}
            onChange={(e) =>
              setForm({ ...form, restaurantName: e.target.value })
            }
          />

          <input
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="">Select Type</option>
            <option value="Rajasthani">Rajasthani</option>
            <option value="Gujarati">Gujarati</option>
            <option value="Mughlai">Mughlai</option>
            <option value="Jain">Jain</option>
            <option value="Thai">Thai</option>
            <option value="North Indian">North Indian</option>
            <option value="South Indian">South Indian</option>
          </select>

          <select
            value={form.parkingLot}
            onChange={(e) =>
              setForm({ ...form, parkingLot: e.target.value })
            }
          >
            <option value="">Parking</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          <button onClick={handleAdd}>Add</button>
        </div>

        <div>
          {filteredData.map((r) => (
            <RestaurantCard
              key={r.restaurantID}
              data={r}
              isAdmin={true}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
