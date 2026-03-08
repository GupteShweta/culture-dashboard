
import React, {useEffect, useState} from "react";
import * as d3 from "d3";

function App(){
 const [data,setData] = useState([]);
 const [country,setCountry] = useState("India");

 useEffect(()=>{
  fetch("/data/culture_dataset_120.json")
  .then(r=>r.json())
  .then(d=>setData(d));
 },[]);

 useEffect(()=>{
  if(data.length===0) return;
  const selected = data.find(d=>d.country===country);
  if(!selected) return;

  const dims = ["pdi","idv","mas","uai","lto","ivr"];
  const values = dims.map(k=>selected[k]);

  const svg = d3.select("#chart");
  svg.selectAll("*").remove();

  const width=600;
  const height=400;

  const x = d3.scaleBand().domain(dims).range([50,width-20]).padding(0.3);
  const y = d3.scaleLinear().domain([0,100]).range([height-40,20]);

  svg.append("g")
     .attr("transform","translate(0,"+(height-40)+")")
     .call(d3.axisBottom(x));

  svg.append("g")
     .attr("transform","translate(50,0)")
     .call(d3.axisLeft(y));

  svg.selectAll("rect")
     .data(values)
     .enter()
     .append("rect")
     .attr("x",(d,i)=>x(dims[i]))
     .attr("y",(d)=>y(d))
     .attr("width",x.bandwidth())
     .attr("height",(d)=>height-40-y(d));
 },[country,data]);

 return (
  <div>
   <h1>Culture Dashboard</h1>
   <select onChange={e=>setCountry(e.target.value)}>
    {data.map(c=>(<option key={c.country}>{c.country}</option>))}
   </select>
   <svg id="chart" width="600" height="400"></svg>
  </div>
 )
}

export default App;
