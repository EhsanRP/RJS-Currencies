import React, {useEffect, useState} from 'react';
import {searchCoin} from "../../Services/CryproAPI.js";

function Search({currencies, setCurrencies}) {

    const [text, setText] = useState('');
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        const controller = new AbortController()
        setCoins([])
        if (!text) return;
        const search = async () => {
            try {
                const res = await fetch(searchCoin(text), {signal: controller.signal});
                const json = await res.json();
                if (json.coins)
                    setCoins(json);
                else
                    alert(json.status.error_message);
            } catch (error) {
                if (error.name !== 'AbortError')
                    alert(error.message);
            }
        }
        search()
        console.log(coins)
        return () => controller.abort()
    }, [text])

    return (
        <div>
            <input type="text" placeholder="Search..." value={text} onChange={(e) => setText(e.target.value)}/>
            <select value={currencies} onChange={e => setCurrencies(e.target.value)}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="jpy">JPY</option>
            </select>
            <div>
                <ul>
                    {coins.length > 0 ?
                        coins.map((coin) => ((<li key={coin.id}>
                            <img src={coin.thumb} alt={coin.name}/>
                            <p>{coin.name}</p>
                        </li>)))
                        : null}
                </ul>
            </div>
        </div>
    );
}

export default Search;