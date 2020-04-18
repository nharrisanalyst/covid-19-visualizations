// StateChart import from "./state_chart";


{

  d3.json('https://covidtracking.com/api/v1/states/daily.json').then(data=>{
      dataGrouped = d3.group(data, d=>d.state);

      stateData =[];
      for(let value of dataGrouped){
        const oneState = value[1].map(d=>d);
        const state = oneState[0].state;
        oneState.state =  state
        stateData.push(oneState);
      }
      const highlightedStates =['NY', 'CA', 'NJ', 'FL', 'LA', 'MI', 'IL','MA','SD'];
      let logData = filter(stateData, d=>(d.positive >=10));
          logData = day(logData)

          logData.sort(d=>{
            if(highlightedStates.includes( d[0]!= undefined && d[0].state)){
              return 1
            }else{
              return -1;
            }
          })

       console.log(logData);
       const stateChart =   new StateChart({
             el: d3.select('.states-chart-main').node(),
             data:logData,
             highlightedStates:highlightedStates,
        });

      stateChart.render();
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
