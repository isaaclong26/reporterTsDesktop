import React, { useState, useEffect } from "react";
import styled from "styled-components"
import Button, { buttonProps } from "./button";
import theme from "../theme";
import Heading from "./heading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import solarLogo from "../pics/solarLogo.jpg"
import mail from "../pics/mail.png"
import list from "../pics/list.png"
import plus from "../pics/plus.png"
import SplashScreen from "../splashScreen";
import chartLogo from "../pics/chart.png"
import getChartData from "../utils/chartlogic"
import ChartComp from "./chart";
import Entries from "./entries";
import Comments from "./comments";
import PDF from "./pdf";
const ButtonContainer = styled.div`
display: flex;
position: fixed;
left: 0;

@media only screen and (min-width: 768px) {
    flex-direction: column;
position: fixed;
left: 0;
top: 7vw;
}


@media only screen and (max-width: 768px) {
    flex-direction: row;
    margin-bottom: 10px;
}


`

const NB = styled.div`
max-height: 100%;

background-color: transparent;


@media only screen and (min-width: 768px) {
width: 2.5vw;  
height: 2.5vw;
margin: 1vw 1vw;
}

@media only screen and (min-width: 1300px) {
    width: 2vw;  
    height: 2vw;
    margin: 1vw 1.5vw;
    }



@media only screen and (max-width: 768px) {
    width: 5vw;  
    height: 5vw;
    margin:  2vw
  
}
border-radius: 10px;
display: flex;
justify-content: center;
align-items: center;
`

const BtnImg = styled.img`


background: transparent;
max-width: 100%;

&:hover {
    transition: all 0.1s ease-in;

    transform: scale(1.15);

}
`

interface NavBtnProps {
    image?: any;
    state?: Function;
    active?: any;
    onClick: any;


    }
    
const  NavBtn = (props:NavBtnProps)=>{



    return(
    
    <NB>
       <BtnImg
        onClick={props.onClick}
     


        src={props.image}></BtnImg> 
    </NB>
    
    )
}


const Back = styled.div`
background-color: ${theme.primary};
position: fixed;
width: 100%;
height: 100%;
margin: 0; 
padding: 0;

 


`
const SIlogo = styled.img`
position: fixed;
top: .75vw; 
right: .75vw;
border-radius: 2.5px;
transition: all 0.1s ease-in;

@media only screen and (min-width: 768px) {
    max-width: 20%
    }



@media only screen and (max-width: 768px) {
    max-width: 40%
    }

    &:hover {
        transform: translateY(-3px);
       
      }

`
const Title = styled.h1`
font-size: 3vw;
color: white;
text-align: left;
margin: 1.4vw 30px;
font-style: italic;
text-decoration: underline;

@media only screen and (max-width: 768px) {
    display: none;

    }
@media only screen and (min-width: 1300px) {
     margin: .8vw 30px;

    }

    &:hover {
        transition: all 0.1s ease-in;

        transform: translateY(-3px);
       
      }

`
const BackComp = (props:{
    chartState:Function;
    commentsState:Function;
    entriesState:Function;
    pdfState:Function;
    chart:any;
    entries:any;
    comments:any;
    pdf: any
}

)=>{


    const [title, setTitle]= useState<string>("Customer Voice")

    const handleToggle=(name:string, state: Function, vis: any, text:string)=>{
        switch(name){
            case "entries":
                props.chartState(false);
                props.commentsState(false)
                props.pdfState(false)

                break;
            case "chart": 
                props.commentsState(false);
                props.entriesState(false)
                props.pdfState(false)

                break;
            case "comments":
                props.entriesState(false)
                props.chartState(false)
                props.pdfState(false)
                break;
            case "pdf":
                props.entriesState(false)
                props.chartState(false)
                props.commentsState(false);

        }


        state(!vis)
    }

  


    return(
        <Back>
            <Row >
             <Title  >{title}</Title>
             {/* add onclick to show sample list */}
            <a href="https://solarinnovations.com/information/finish-options/" target={"_blank"}><SIlogo src={solarLogo} ></SIlogo></a>  
            </Row>
            <ButtonContainer> 
                <NavBtn image={chartLogo} 

                onClick={()=>{handleToggle("chart", props.chartState, props.chart, "Chart")}}

                ></NavBtn>
                
                <NavBtn image={list} 
                onClick={()=>{handleToggle("entries", props.entriesState, props.entries, "Submissions" )}}

                ></NavBtn>

                <NavBtn image={mail}
                onClick={()=>{handleToggle("comments", props.commentsState, props.comments, "Comments" )}}

                 ></NavBtn>
                 <NavBtn image={plus}
                onClick={()=>{handleToggle("pdf", props.pdfState, props.pdf, "Comments" )}}

                 ></NavBtn>

               

            </ButtonContainer>
        
        </Back>
    )
}








const ContentContainer = styled(Container)`
background-color: white;
overflow-y: scroll;
-webkit-overflow-scrolling: touch;
height: 100vh;
padding-bottom: 20vw;
position: fixed;
top: 5vw;

@media only screen and (min-width: 768px) {

width: 95vw;
margin: 0; 
padding: 50px 50px 20vw 50px;
left: 5vw;
border-radius: 20px 0;

}


@media only screen and (max-width: 768px) {
    width: 100%;
    top: 10vw;


 
 }
`

export default function Nav(children:any){
    const [commentsVis, setCommentsVis] = useState<boolean>(false)
    const [chartVis, setChartVis] = useState<boolean>(true)
    const [entriesVis , setEntriesVis] = useState<boolean>(false)
      const [loading, setLoading] = useState(true);
      const [chartData, setChartData] = useState()
        const [entries, setEntries] = useState([])
      const [weeks, setWeeks] = useState()
    const [pdfVis, setPdfVis] = useState<boolean>(false)
     useEffect(() => {
        const bootstrapasync = async () => {
                let data:any = await getChartData()
                setEntries(data.entries)
                setChartData(data.chartData)
                setWeeks(data.weeks)
         }
         bootstrapasync()
         setLoading(false)
         chartData? setChartVis(true) : console.log("")


      },[])     




    return  entries.length<1? (
        <SplashScreen />
      ) : (
        <>

        <BackComp
            chartState={setChartVis}
            chart={chartVis}
            entriesState={setEntriesVis}
            entries={entriesVis}
            commentsState={setCommentsVis}
            comments={commentsVis}
            pdf= {pdfVis}
            pdfState= {setPdfVis}
          ></BackComp>
        <ContentContainer fluid style={{minHeight:"100vh"}}>
        {chartVis? <ChartComp entries={entries} data={chartData}/> : " "}
        {entriesVis? <Entries data={entries} /> : " "}
        {commentsVis? <Comments data={entries} /> : " "}
        {pdfVis? <PDF entries={entries} chartData={chartData}/> : " "}



        </ContentContainer>
        
        </>
    )
}