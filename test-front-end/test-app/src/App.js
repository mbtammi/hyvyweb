import { StylesManager, Model } from 'survey-core';
import 'survey-core/modern.min.css'
import './App.css';
import { Survey } from 'survey-react-ui';
import { useCallback, useState } from 'react';
import surveyJson from './studySurvey';
// const SURVEY_ID = 1;



function App() {

  const surveyComplete = useCallback((sender) => {
    console.log("Hyva poika")
    // saveSurveyResults(
    //   "https://your-web-service.com/" + SURVEY_ID,
    //   sender.data
    // )
  }, []);

  const alertResults = useCallback((sender) => {
    console.log("Senderi: ", sender.data)
    console.log("survey: ", surveyJson)
    const results = JSON.stringify(surveyJson.pages[0].elements);
    countThePoints(sender.data);
    // alert(results);
  }, []);


  function findLargest(numbers) {
    let largest = -Infinity;
    let index = 0
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > largest) {
            largest = numbers[i];
            index = i
        }
    }
    return {largest: largest, index: index};
}
  

  const survey = new Model(surveyJson);
  survey.onComplete.add(alertResults);

  function valueOf(value) {
    if (value === "Item 1") return (
      1
    )
    if (value === "Item 2") return (
      0.5
    )
    if (value === "Item 3") return (
      0
    )
    if (value === "Item 4") return (
      -1
    )
    else return (
      0
    )
  }
  
  function countThePoints(data) {
    console.log("DATA", data)

    let mathematics = valueOf(data.question1) + valueOf(data.question22) + valueOf( data.question23) + valueOf( data.question25) + valueOf(data.question31) + valueOf( data.question32) + valueOf( data.question33) + valueOf( data.question34) + valueOf( data.question35) + valueOf( data.question36)
    //  + valueOf( data.question9 + data.question22 + data.question23 + data.question25 + data.question31 + data.question32 + data.question33 + data.question34 + data.question35 + data.question36)
    let physics = valueOf(data.question1) + valueOf( data.question22) + (valueOf (data.question25)*2) + valueOf(data.question37)
    let biology = valueOf(data.question2) + (valueOf(data.question27)*2) + (valueOf(data.question28)*2) + (valueOf (data.question29)*2) + valueOf(data.question30) + valueOf( data.question37)


    console.log(biology)
    console.log(physics)
    console.log(mathematics)
    const values = [mathematics, physics, biology]
    const valueNames = ["mathematics", "physics", "biology"]
    let test = findLargest(values);
    console.log("Test muuttuja: ", test)
    // console.log("Arvosana: ", valueNames[test.index])
    console.log("Values: ", values)
    alert(`You are most interested in: ${valueNames[test.index]}`)
    console.log("And it had the value of :", test.largest)
    // let korkein = findLargestAndSecondLargest(values)
    console.log("Suurin value on: ", findLargest(values))
    //Pitäis tehä logiikka joka laskee

  }

StylesManager.applyTheme("modern");
  return (
    <div>
      <Survey model={survey} />;
    </div>
  );
}

// function saveSurveyResults(url, json) {
//   const request = new XMLHttpRequest();
//   request.open('POST', url);
//   request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
//   request.addEventListener('load', () => {
//     // Handle "load"
//   });
//   request.addEventListener('error', () => {
//     // Handle "error"
//   });
//   request.send(JSON.stringify(json));
// }

export default App;
