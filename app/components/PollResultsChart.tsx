'use client';

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type PollResultsChartProps = {
  labels: string[];
  data: number[];
};

export default function PollResultsChart({
  labels,
  data,
}: PollResultsChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Votes',
        data,
        backgroundColor: 'rgba(104, 255, 255, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        color: 'white',
      },
    ],
  };

  console.log('Chart Labels:', labels);
  console.log('Chart Data:', data);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Poll Results',
        color: 'white',
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
}
