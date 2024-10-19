// components/MonthlyPaymentsChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyPaymentsChartProps {
  labels: string[];
  monthlyPayments: number[];
}

const MonthlyPaymentsChart: React.FC<MonthlyPaymentsChartProps> = ({
  labels,
  monthlyPayments,
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Monthly Payments",
        data: monthlyPayments, // Use 'data' here
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default MonthlyPaymentsChart;
