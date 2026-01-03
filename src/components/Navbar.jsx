import { use, useEffect, useRef} from 'react';

const Navbar = ({ setSearch, setType, setParking }) => {
    const searchRef = useRef();

    useEffect(() => {
        searchRef.current.focus();
    }, []);

    return (
        <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
            <input
                ref={searchRef}
                placeholder='Search'
                onChange={(e) => setSearch(e.target.value)}
            />
            <select onChange={(e) => setType(e.target.value)}>
                <option value=''>All Types</option>
                <option value='Rajasthani'>Rajasthani</option>
                <option value='Gujarati'>Gujarati</option>
                <option value='Mughlai'>Mughlai</option>
                <option value='Jain'>Jain</option>
                <option value='Thai'>Thai</option>
                <option value='North Indian'>North Indian</option>
                <option value='South Indian'>South Indian</option>
            </select>
        </div>
    );
};

export default Navbar;