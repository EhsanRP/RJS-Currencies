import React, {useEffect, useState} from 'react';
import CoinTable from "../Modules/CoinTable.jsx";
import {getCoinList} from "../../Services/CryproAPI.js";
import Pagination from "../Modules/Pagination.jsx";
import Search from "../Modules/Search.jsx";

function HomePage(props) {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page , setPage] = useState(1);
    const [currencies, setCurrencies] = useState('USD');

    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            try {
                const res = await fetch(getCoinList(page,currencies));
                const json = await res.json();
                setCoins(json);
                setLoading(false);
            }
            catch (error) {
                alert(error.message);
            }
        }
        getData()
    }, [page,currencies])

    return (
        <>
            <Search currencies={currencies} setCurrencies={setCurrencies}  />
            <CoinTable coins={coins} isLoading={loading}/>
            <Pagination page={page} setPage={setPage}/>
        </>
    );
}


export default HomePage;