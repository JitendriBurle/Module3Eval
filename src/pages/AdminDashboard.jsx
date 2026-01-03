import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RestaurantCard from "../components/RestaurantCard";

const AdminDashboard = () => {
    const [data, setData] = useState([]);
    const [form, setForm] = use({
        restaurantName: "",
        address: "",
        type: "",
        parkingLot: "",
        image: "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766-eca8da47c2f1/2izhqnTaNLdenHYF.jpeg"
    });

    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [parkin, setParking] = useState("");

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("evalData")) || [];
        setData(stored);
    }, []);

    const handleAdd = () => {
        if(Object.values(form).some((v) => v === "")) {
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
    };

    const handleDelete = (id) => {
        if(!confirm("Are you sure you want to delete?")) return;
        const updated = data.filter((r) => r.restaurantID !== id);
        localStorage.setItem("evalData", JSON.stringify(updated));
        setData(updated);
        alert("Delete successfully");
    };

    const filtered = data.filter((r) => {
        return (
            (r.restaurantName.toLowerCase().includes(search.toLocaleLowerCase()) ||
            r.address.toLocaleLowerCase().includes(search.toLowerCase())) &&
            (type ? r.type === type : true) &&
            (parking ? r.parking.toString() === parking: true)
        );
    });

    return (
        <>
        <Navbar setSearch={setSearch} setType={setType} setParking={setParking} />
        <div style={{display: "flex"}} >
        <div style={{width: "30%", padding: "10px"}} >
        <input placeholder="Name"onChange={(e) => setForm({ ...form, restuarantName: e.target.value})} />
        <input placeholder="Address"onChange={(e) => setForm({ ...form, address: e.target.value})} />
        <select onChange={(e) => setForm({...form, type: e.target.value})}>
             <option value=''>All Types</option>
                <option value='Rajasthani'>Rajasthani</option>
                <option value='Gujarati'>Gujarati</option>
                <option value='Mughlai'>Mughlai</option>
                <option value='Jain'>Jain</option>
                <option value='Thai'>Thai</option>
                <option value='North Indian'>North Indian</option>
                <option value='South Indian'>South Indian</option>
        </select>
        <select onChange={(e) => setForm({...form, parkingLot: e.target.value})}>
                <option value="">Parking</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
        </select>
        <button onClick={handleAdd}>Add Restaurant</button>
        </div>
        <div>
            {filtered.map((r) => (
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