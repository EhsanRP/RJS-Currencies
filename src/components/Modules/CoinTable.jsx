import React from 'react';
import chartUp from '../../assets/chart-up.svg'
import chartDown from '../../assets/chart-down.svg'
import {RotatingLines} from "react-loader-spinner";
import styles from './CoinTable.module.css'

{/* eslint-disable react/prop-types */
}

function CoinTable({coins, isLoading}) {
    return (

        <div className={styles.container}>
            {isLoading ?
                (<RotatingLines
                    visible={true}
                    height="96"
                    width="96"
                    color="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                />)
                :
                (
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>Coin</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>24h</th>
                            <th>Total Volume</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {coins.map((coin) => <TableRow coin={coin} key={coin.id}/>)}
                        </tbody>
                    </table>
                )
            }
        </div>
    );
}


export default CoinTable;

const TableRow = ({
                      coin: {
                          image,
                          symbol,
                          name,
                          current_price,
                          price_change_percentage_24h: price_change,
                          total_volume
                      }
                  }) => {
    return (
        <tr>
            <td>
                <div className={styles.symbol}>
                    <img src={image} alt=""/>
                    <span>{symbol.toUpperCase()}</span>
                </div>
            </td>
            <td>{name}</td>
            <td>${current_price.toLocaleString()}</td>
            <td className={price_change > 0 ? styles.success : styles.error}>{price_change.toFixed(2)}</td>
            <td>${total_volume.toLocaleString()}</td>
            <td>
                <img src={price_change > 0 ? chartUp : chartDown} alt=""/>
            </td>
        </tr>
    )
}