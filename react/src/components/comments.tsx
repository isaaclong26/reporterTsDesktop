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
    shoutOut: string
}


const Entry = (props:{x:entry})=>{
        let {x} = props
    return(
        <tr>
            <td>{x.id}</td>
            <td>{x.Title}</td>
            <td>{x.date}</td>
            <td>{x.shoutOut}</td>
            <td>{x.question1}</td>
            <td>{x.question2}</td>

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





const Comments = (props:{data:entry[]})=>{
    const [entries, setEntries] = useState<entry[]>([...props.data])
    const [visEntries, setVisEntries] = useState<entry[]>([...props.data])

    const [loading, setLoading] = useState<boolean>(true)
    const [search, setSearch] = useState<string>()
    


    useEffect(()=>{
        if(search){
            Search(search)
        }
        else{
            setVisEntries(entries.filter((x:entry)=>{
                return x.question1 || x.question2 || x.shoutOut
            }))
        }

    },[search])

    const Search = (query:string)=>{
        let ops = {
            includeScore: true,
            minMatchCharLength:3,
            keys:["id","Title"]
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
            <Heading size={5} posClassName="col-lg-8" align="left">Comments</Heading>
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
                        <th>Shout Out</th>
                        <th>Solar Innovations® would like to know if anything could have been done differently to deliver a customer experience beyond expectations</th>
                        <th>Solar Innovations® would like to know if you have any additional comments on your experience.</th>

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


export default Comments