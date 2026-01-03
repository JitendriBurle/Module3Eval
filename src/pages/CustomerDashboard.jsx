import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RestaurantCard from "../components/RestaurantCard";

const CustomerDashboard = () => {
    const [data, setData] = useState([]);
    const [search,setSearch] = useState("");
    const [type, setType] = useState("");
    const [parking, setParking] = useState("");

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("evalData")) || [];
        setData(stored);
    }, []);

    const filtered = data.filter((r) => {
        return (
            (r.restaurantName.toLowerCase().includes(search.toLocaleLowerCase()) ||
            r.address.toLocaleLowerCase().includes(search.toLowerCase())) &&
            (type ? r.type === type :true) &&
            (parking ? r.parking.toString() === parking : true)
        );
    });

    return (
        <>
        <Navbar setSearch={setSearch} setType={setType} setParking={setParking} />
        {filtered.map((r) => (
            <RestaurantCard key = {r.restaurantID} data={r} />
        ))}
        </>
    );
};

export default CustomerDashboard;