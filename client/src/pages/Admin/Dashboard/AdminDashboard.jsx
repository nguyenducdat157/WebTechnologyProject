import React, { useEffect } from 'react';
import Chart from "react-google-charts";
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import "./AdminDashboard.css";

export default function Admindashboard(){
    const dailyOrders1 = [
        {_id: '23-11-2021', orders: 200, sales:50000},
        {_id: '24-11-2021', orders: 300, sales:60000},
        {_id: '24-11-2021', orders: 400, sales:70000},
        {_id: '24-11-2021', orders: 500, sales:80000},
        {_id: '24-11-2021', orders: 600, sales:90000},
        {_id: '24-11-2021', orders: 700, sales:100000},
        {_id: '24-11-2021', orders: 800, sales:110000},
    ];
    const dailyOrders = [
        ['23-11-2021','24-11-2021','25-11-2021'], [200,300,400], [50000,60000,70000]
    ];
    const productCategories1 = [
        {_id: "Áo khoác",count: 5,},
        {_id: "Áo thi đấu",count: 50,},
        {_id: "Giày",count: 100,},
        {_id: "Tất",count: 20,},
    ];
    const productCategories =["Áo khoác", 50];
    const loading = 0, error = 0;
    return (
        <div>
            <div className="row">
                <h1>Dashboard</h1>
            </div>
            {loading ? (
                <LoadingBox/>
            ) : error?(
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
                <ul className="dashboard-row dashboard-summary">
                    <li>
                        <div className="dashboard-summary-title color1">
                            <span>
                                <i className="fa fa-users" /> Users
                            </span>
                        </div>
                        <div className="dashboard-summary-body">100</div>
                    </li>
                        
                    <li>
                        <div className="dashboard-summary-title color2">
                            <span>
                                <i className="fa fa-shopping-cart" /> Orders
                            </span>
                        </div>
                        <div className="dashboard-summary-body">
                                30
                        </div>
                    </li>

                    <li>
                        <div className="dashboard-summary-title color3">
                            <span>
                                <i className="fa fa-money" /> Sales
                            </span>
                        </div>
                        <div className="dashboard-summary-body">
                            $1000
                        </div>
                    </li>
                </ul>

                <div>
                    <div>
                        <h2>Sales</h2>
                        <Chart
                            width="100%"
                            height="400px"
                            chartType="AreaChart"
                            loader = {<div>Loading Chart</div>}
                            data={[
                                ["Date","Sales","Orders"],
                                dailyOrders.map((x)=>[
                                    x._id,
                                    x.sales,
                                    x.orders,
                                ]),
                            ]}
                        ></Chart>
                    </div>
                </div>
                <div>
                    <h2>Categories</h2>
                    <Chart
                        width="100%"
                        height="400px"
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ["Category", "Products"],
                            productCategories.map((x) => [x._id, x.count]),
                        ]}
                    ></Chart>
                </div>
            </>
            )}
        </div>
    )
}
