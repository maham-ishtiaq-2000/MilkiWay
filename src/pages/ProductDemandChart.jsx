import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Sidebar from '../Layouts/SideBar';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductDemandChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Sales (in units)',
        data: [],
        backgroundColor: 'pink',
        borderColor: 'red',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders/sales-data');
        const data = await response.json();

        const labels = data.map(item => item.productName);
        const quantities = data.map(item => item.totalQuantity);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Sales (in units)',
              data: quantities,
              backgroundColor: 'pink',
              borderColor: 'red',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Dairy Products Sales Data',
      },
    },
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen bg-white">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center" style={{ marginLeft: '105px' }}>
          <div className="container mx-auto p-4 h-5/6 w-4/5 md:w-3/5 bg-white shadow-md rounded-lg">
            <h2 className="text-center text-2xl font-bold mb-4">Dairy Products Sales</h2>
            <Bar data={chartData} options={options} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDemandChart;
