import React, { useState, useEffect } from 'react';
import { getRevenues } from '../../utils/data/orderData';
import RevenueCard from '../../components/RevenueCard';

function RevenuePage() {
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    getRevenues()
      .then((data) => setRevenueData(Array.isArray(data) ? data : []))
      .catch((error) => console.error('Error fetching revenue data:', error));
  }, []);

  const { totalRevenue, totalTips } = revenueData.reduce(
    (acc, revenue) => {
      const orderAmount = parseFloat(revenue.total_order_amount || 0);
      const tipAmount = parseFloat(revenue.tip_amount || 0);

      return {
        totalRevenue: acc.totalRevenue + orderAmount + tipAmount,
        totalTips: acc.totalTips + tipAmount,
      };
    },
    { totalRevenue: 0, totalTips: 0 },
  );

  return (
    <div>
      <RevenueCard totalRevenue={totalRevenue} totalTips={totalTips} />
    </div>
  );
}

export default RevenuePage;
