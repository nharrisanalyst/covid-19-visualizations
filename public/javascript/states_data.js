// StateChart import from "./state_chart";
let stateChart;
let usa_state_data;
let new_daily_chart;
{

  const state_promise = d3.json('https://covidtracking.com/api/v1/states/daily.json');
  const usa_promise = d3.json('https://covidtracking.com/api/v1/us/daily.json');
   Promise.all([state_promise,usa_promise]).then(datas=>{
        const data = datas[0];
        const usa_data = datas[1];

       console.log(usa_data);

      dataGrouped = d3.group(data, d=>d.state);

      stateData =[];
      for(let value of dataGrouped){
        const oneState = value[1].map(d=>d);
        const state = oneState[0].state;
        oneState.state =  state
        stateData.push(oneState);
      }
      const highlightedStates =['NY', 'CA', 'NJ', 'FL', 'LA', 'MI','MA',];
      const highlightedRollingStates=['NY', 'NJ','ID'];
      let logData = filter(stateData, d=>(d.positive >=10));
          logData = day(logData)

          logData.sort(d=>{
            if(highlightedStates.includes( d[0]!= undefined && d[0].state)){
              return 1
            }else{
              return -1;
            }
          })

          logData = logData.filter(d => d[0]!= undefined);
          //adding state to usa
          usa_state_data = logData.concat([usa_data.map(d=>{
             d.state= 'USA';
             return d;
          }).reverse()]);
          //calculate percentPositiveIncrease
          usa_state_data = usa_state_data.map(state=>{
             return state.map(d=>{
               const increasePositive = d.positiveIncrease/d.totalTestResultsIncrease;
               d.percentPositiveIncrease = increasePositive === 1 || isNaN(increasePositive)?0:increasePositive;
               return d;
             })
          })
    //initial charts
        stateChart =   new StateChart({
             el: d3.select('.states-chart-main').node(),
             data:logData,
             highlightedStates:highlightedStates,
             doubleData:doubleData,
        });

      stateChart.render();
      const new_daily = new DailyNewChart({
        data:usa_data,
        el:d3.select('.daily-new-chart').node(),
        yAttribute:'deathIncrease',
      })

      new_daily.render();
      new_daily_chart = new_daily;
       let statesData = logData.map(d=>({state:d[0].state, on:highlightedStates.includes(d[0].state)}))
           statesData = statesData.sort((a,b)=>(a.state<b.state?-1:1));
       let rollingStatesData = statesData.map(d=>({state:d.state, on:highlightedRollingStates.includes(d.state)}));
       store.dispatch(setStates(statesData));
       store.dispatch(setRollingStates(rollingStatesData));
  })





  function filter(data ,func){
       const newData =[]
     for ( d of data){newData.push(d.filter(func))};

      return newData;

  }

  function day(data){
        return data.map(d=> d.reverse().map((k,i)=>{
            k.day = i;
            return k;
        }));
  }

}
