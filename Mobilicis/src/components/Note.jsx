import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function Note() {
  const [records , setRecords] = useState([])
  const [showAvgIncome, setShowAvgIncome] = useState(false);

  useEffect(()=>{
    fetch('https://datafilter2.onrender.com/user')
    .then(response => response.json())
    .then(data => setRecords(data))
    .catch(err => console.log(err))
  }, []);
  
  const [option1,setOption1] = useState(false);
  const [option2,setOption2] = useState(false);
  const [option3,setOption3] = useState(false);
  const [option4,setOption4] = useState(false);
  const [option5,setOption5] = useState(false);

  const handleChange=(data)=>{
    if(data=="option1"){
      setOption1(!option1);
    }
    if(data=="option2"){
      setOption2(!option2);
    }
    if(data=="option3"){
      setOption3(!option3);
    }
    if(data=="option4"){
      setOption4(!option4);
    }
    if(data=="option5"){
      setOption5(!option5);
    }
  }
  const cityCountMap = {};
  records.forEach(item => {
    const city = item.city;
    if (city in cityCountMap) {
      cityCountMap[city]++;
    } else {
      cityCountMap[city] = 1;
    }
  });

  const top10Cities = Object.entries(cityCountMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(entry => entry[0]);

    const cityIncomes = records
    .filter(item => top10Cities.includes(item.city))
    .map(item => parseInt(item.income.slice(1)));

  const cityAvgIncomes = top10Cities.reduce((acc, city, index) => {
    const cityData = records.filter(item => item.city === city);
    const cityIncomeTotal = cityData.reduce((total, item) => total + parseInt(item.income.slice(1)), 0);
    const cityAvgIncome = cityIncomeTotal / cityData.length;
    return {
      ...acc,
      [city]: cityAvgIncome.toFixed(2),
    };
  }, {});

  return (
    <div>
      <div className="row">
      <div><input type="checkbox" value={option1} onChange={()=>handleChange("option1")} /> Option 1 </div>
      <div><input type="checkbox" value={option2} onChange={()=>handleChange("option2")} /> Option 2 </div>
      <div><input type="checkbox" value={option3} onChange={()=>handleChange("option3")} /> Option 3 </div>
      <div><input type="checkbox" value={option4} onChange={()=>handleChange("option4")} /> Option 4 </div>
      <div><input type="checkbox" value={option5} checked={showAvgIncome} onChange={() => setShowAvgIncome(!showAvgIncome)} /> Option 5 </div>
      </div>

      <div>
      {showAvgIncome && (
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Average Income</th>
            </tr>
          </thead>
          <tbody>
            {top10Cities.map(city => (
              <tr key={city}>
                <td>{city}</td>
                <td>{cityAvgIncomes[city]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>

      <table className="border table table-striped table table-bordered">
        <thead className="border thead-dark">
        <tr>
        <th scope="col">First name</th>
        <th scope="col">Last Name</th>
        <th scope="col">Email</th>
        <th scope="col">Gender</th>
        <th scope="col">Income</th>
        <th scope="col">City</th>
        <th scope="col">Car</th>
        <th scope="col">Quote</th>
        <th scope="col">Phone Price</th>
        </tr>
        </thead>
        
        {records.filter((list)=> {

        const email = list.email.toLowerCase();
        const emailParts = email.split("@");
        const userName = emailParts[0];
        const domainName = emailParts[1];

        
        const income = parseFloat(list.income.replace('$', ''));

            if(option1==false && option2==false && option3==false && option4==false && option5==false){
            return list}
            else if(option1==true&&(income>5)&&(list.car.includes("BMW") || list.car.includes("Mercedes"))){
            return list}
            else if(option2==true&&(list.gender=="Male")&&(list.phone_price>10000)){
            return list}
            else if(option3==true&&(list.last_name.startsWith("M"))&&(list.quote.length>15)&&(userName.includes(list.last_name.toLowerCase()) || domainName.startsWith(`${list.last_name.toLowerCase()}.`))){
            return list}
            else if(option4==true&&(list.car.includes("BMW") || list.car.includes("Mercedes") || list.car.includes("Audi"))&&(!(/\d/.test(list.email)))){
            return list}
        }).map((list,index)=> (

          <tbody className="border">
          <tr>
          <th scope="col">{list.first_name}</th>
          <th scope="col">{list.last_name}</th>
          <th scope="col">{list.email}</th>
          <th scope="col">{list.gender}</th>
          <th scope="col">{list.income}</th>
          <th scope="col">{list.city}</th>
          <th scope="col">{list.car}</th>
          <th scope="col">{list.quote}</th>
          <th scope="col">{list.phone_price}</th>
          </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default Note;
