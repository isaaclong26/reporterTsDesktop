import React,{useEffect,useState} from "react"
import { Container, Row } from "react-bootstrap"
import ChartComp from "./chart";
import Heading from "./heading";
import PieChart from "./pieChart"
import {Col} from "react-bootstrap"

const PDF = (props:{
entries:any;
chartData:any;
})=>{
    console.log(props.chartData)
   let chart1 = props.chartData.week4.Yorn1*100
   let chart2 = props.chartData.week4.Yorn2*100
   let chart3 = props.chartData.week4.Yorn3*100

    return(
        <Container fluid>
            <Row>
             <ChartComp entries={props.entries} data={props.chartData}/>
            </Row>
            <Row>

                 <Col lg={4}> <PieChart yes={chart1} no={100-chart1} title="Is Solar Innovations® a brand that you trust?"></PieChart></Col>

                <Col lg={4}><PieChart yes={chart2} no={100-chart2} title='Would you buy a Solar Innovations® product again?'></PieChart></Col>

                <Col lg={4}><PieChart yes={chart3} no={100-chart3} title="Would you recommend Solar Innovations® to others?"></PieChart></Col>


            </Row>

        </Container>
    )
}


export default PDF;