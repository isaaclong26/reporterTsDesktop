import React,{useState,useEffect} from "react"
import Chart from "react-apexcharts";



const PieChart = (
yes, no,title
)=>{
console.log(yes.title)
const options = {
  legend: {
    show: false,
  },
  title: {
    text: yes.title,
    align: "Center",
    margin: 10,
    offsetX: 0,
    offsetY: 0,
    floating: false,
    style: {
      fontSize: "20px",
      fontWeight: "bold",

      color: "#263238",
    },
  },
  colors:["#439639","#912F40"],
  labels:["Yes", "No"]

}

    let series = [yes.yes,yes.no]

    return(
        <div className="mixed-chart ">
        <Chart
          options={options}
          series={series}
          labels={["Yes", "No"]}
          type="pie"
          height="400"
        />
      </div>
    )
}


export default PieChart