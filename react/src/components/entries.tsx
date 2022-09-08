import React,{useState,useEffect} from "react"
import Heading from "./heading"
import Table from 'react-bootstrap/Table';
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import SplashScreen from "../splashScreen"
import getChartData from "../utils/chartlogic";
import { v4 as uuidv4 } from "uuid"
import Input from "./input";
import Fuse from "fuse.js"

interface entry{
    id: string,
    Title:string,
    projectCost:string | number,
    performance:string | number;
    conditionOfProduct:string | number;
    Yorn1:string;
    Yorn2:string;
    Yorn3:string;
    question1:string;
    question2:string;
    install:number|string;
    leadTimes:number|string;
    delivery:number|string;
    date:string;
    averageScore:number|string;
    accountant:number|string;
    completionDate:number|string;
    pm:number|string;
    response: number|string
    shoutOut:string
}


const Entry = (props:{x:entry})=>{
        let {x} = props
    return(
        <tr>
            <td>{x.id}</td>
            <td>{x.Title}</td>
            <td>{x.date}</td>
            <td style={{backgroundColor: x.averageScore > 7.9? "#439639": "#912F40", color: "white", opacity: ".8"}}>{x.averageScore}</td>
            <td style={{backgroundColor: x.projectCost > 7.9? "#439639": "#912F40", color: "white", opacity: ".8" }}>{x.projectCost}</td>
            <td style={{backgroundColor: x.conditionOfProduct > 7.9? "#439639": "#912F40", color: "white", opacity: ".8"}}>{x.conditionOfProduct}</td>
            <td style={{backgroundColor: x.performance > 7.9? "#439639": "#912F40", color: "white", opacity: ".8"}}>{x.performance}</td>
            <td style={{backgroundColor: x.leadTimes > 7.9? "#439639": "#912F40", color: "white", opacity: ".8"}}>{x.leadTimes}</td>
            <td style={{backgroundColor: x.response > 7.9? "#439639": "#912F40", color: "white", opacity: ".8"}}>{x.response}</td>
            <td style={{backgroundColor: x.completionDate > 7.9? "#439639": "#912F40", color: "white", opacity: ".8"}}>{x.completionDate}</td>
            <td style={{backgroundColor: x.delivery > 7.9? "#439639": "#912F40", color: "white", opacity: ".8"}}>{x.delivery}</td>
            <td style={{backgroundColor: x.install > 7.9? "#439639": "#912F40", color: "white", opacity: ".8"}}>{x.install}</td>
            <td>{x.shoutOut}</td>

            <td>{x.Yorn1}</td>
            <td>{x.Yorn2}</td>
            <td>{x.Yorn3}</td>

        </tr>
    )
}


const inputHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: Function
  ) => {
    const enteredName = event.target.value;
    setter(enteredName);
  };





const Entries = (props:{data:entry[]})=>{
    const [entries, setEntries] = useState<entry[]>([...props.data])
    const [visEntries, setVisEntries] = useState<entry[]>([...props.data])

    const [loading, setLoading] = useState<boolean>(true)
    const [search, setSearch] = useState<string>()
    


    useEffect(()=>{
        if(search){
            Search(search)
        }
        else{
            setVisEntries(entries)
        }

    },[search])

    const Search = (query:string)=>{
        let ops = {
            includeScore: true,
            minMatchCharLength:3,
            keys:["id","Title", "shoutOut"]
        }
        const fuse = new Fuse(entries,ops)
        setVisEntries(fuse.search(query).map((x:any)=>x.item) )

    }


    return entries.length<1? (
        <SplashScreen />
      ) :
    (
        <Container fluid>
        <Row>
            <Heading size={5} posClassName="col-lg-8" align="left">Entries</Heading>
            <Input
            posClassName="mb-2 col-lg-4"
            backgroundColor="black"
            onChange={(e: any) => {
              inputHandler(e,setSearch);
            }}
            label="Search"
            externalLabel
          ></Input>
            </Row>
        <Row>
        <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Project Id</th>
                        <th>Project Name</th>
                        <th >Date</th>
                        <th>Average Score</th>
                        <th>Project Cost</th>
                        <th>Condition of Product</th>
                        <th>Performance</th>
                        <th>Lead Times</th>
                        <th>Responsiveness</th>
                        <th>Completion date</th>
                        <th>Shipment/Delivery</th>
                        <th>Install</th>
                        <th>Shout Out</th>
                        <th>Yorn 1</th>
                        <th>Yorn 2</th>
                        <th>Yorn 3</th>

                    </tr>
                </thead>
                <tbody>

                    {visEntries.map((x:any)=>
                       <Entry x={x} key={uuidv4()}/>
                    )}


                </tbody>
            </Table>

        </Row>
        
        </Container>
    )
}


export default Entries