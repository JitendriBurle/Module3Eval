import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateRestaurant = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState(null);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("evalData")) || [];
        const restaurant = data.find((r) => r.restaurantID === Number(id));
        setForm(restaurant);
    }, [id]);

    const handleUpdate = () => {
        if(!confirm("Are you sure you want to updat")) return;

        const data = JSON.parse(localStorage.getItem("evalData")) || [];
        const updated = data.map((r) =>
            r.restaurantID === Number(id) ? form : r 
        );;
        localStorage.setItem("evalData", JSON.stringify(updated));
        alert("Update successfully");
        navigate("/admin/dashboard");
    };

    if(!form) return null;

    return (
        <div>
            <input value={form.restaurantName} onChange={(e) => setForm({...form, restaurantName: e.target.value})} />
            <input value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} />
            <button onClick={handleUpdate}>Update Restaurant</button>
        </div>
    );
};

export default UpdateRestaurant;