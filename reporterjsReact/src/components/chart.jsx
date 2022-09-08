import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Heading from "./heading";
const ChartComp = ({ data, entries }) => {
  const [currentWeek, setCurrentWeek] = useState([]);
  const [month, setMonth] = useState([]);
  useEffect(() => {
    let month = data.month;
    let week = data.week4;
    setMonth([
      month.projectCost,
      month.conditionOfProduct,
      month.performance,
      month.leadTimes,
      month.response,
      month.completionDate,
      month.install,
      month.accountant,
    ]);
    setCurrentWeek([
      week.projectCost,
      week.conditionOfProduct,
      week.performance,
      week.leadTimes,
      week.response,
      week.completionDate,
      week.install,
      week.accountant,
    ]);
  }, [data]);

  const options = {
    chart: {
      type: "bar",
      height: 430,
    },
    annotations: {
      yaxis: [
        {
          y: 8,
          borderColor: "#439639",
          label: {
            borderColor: "#439639",
            style: {
              color: "#fff",
              background: "#439639",
            },
          },
        },
      ],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: "top",
        },
      },
    },
    //   stroke: {
    //     show: true,
    //     width: 1,
    //     colors: ['#fff']
    //   },
    //   tooltip: {
    //     shared: true,
    //     intersect: false
    //   },
    xaxis: {
      categories: [
        "Project Cost",
        "Condition of Product",
        "Performance",
        "Lead Times",
        "Responsiveness",
        "Completion Date",
        "Shipment/Delivery",
        "Installation",
        "Accountant",
      ],
    },
    yaxis: {
      max: 10,
    },
    colors: [
      function ({ value, seriesIndex, w }) {
        if (value >= 8) {
          return "#439639";
        } else {
          return "#912F40";
        }
      },
    ],

    title: {
      text: `Customer Voice`,
      align: "Center",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "30px",
        fontWeight: "bold",

        color: "#263238",
      },
    },
    legend: {
      show: false,
    },
  };
  let series = [
    { name: "Month", data: month },
    { name: "Week", data: currentWeek },
  ];

  return (
    <Container fluid>
      <Col
        className="mx-auto"
        lg={9}
        style={{ maxWidth: "65vw", margin: "auto", height: "auto" }}
      >
        <div className="mixed-chart ">
          <Chart options={options} series={series} type="bar" />
        </div>
      </Col>
    </Container>
  );
};

export default ChartComp;
