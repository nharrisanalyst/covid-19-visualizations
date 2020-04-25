// StateChart import from "./state_chart";
let stateChart;

{

  const state_promise = d3.json('https://covidtracking.com/api/v1/states/daily.json');
  const usa_promise = d3.json('https://covidtracking.com/api/v1/us/daily.json');
   Promise.all([state_promise,usa_promise]).then(datas=>{
        console.log(datas);
        const data = datas[0];
        const usa_data = datas[1];
      dataGrouped = d3.group(data, d=>d.state);

      stateData =[];
      for(let value of dataGrouped){
        const oneState = value[1].map(d=>d);
        const state = oneState[0].state;
        oneState.state =  state
        stateData.push(oneState);
      }
      const highlightedStates =['NY', 'CA', 'NJ', 'FL', 'LA', 'MI','MA',];
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

       console.log(logData);
        stateChart =   new StateChart({
             el: d3.select('.states-chart-main').node(),
             data:logData,
             highlightedStates:highlightedStates,
             doubleData:doubleData,
        });

      stateChart.render();
       let statesData = logData.map(d=>({state:d[0].state, on:highlightedStates.includes(d[0].state)}))
           statesData = statesData.sort((a,b)=>(a.state<b.state?-1:1));
       store.dispatch(setStates(statesData))
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
