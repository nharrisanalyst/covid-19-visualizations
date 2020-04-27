///stateChart imported from './state_data.js';

{
  let lastDailyState ='USA';
  let lastDailyStat ='deathIncrease';
  let states;
  ['Deaths','Confirmed Positive','Test','Hospitalized']
  const mapStatToData ={
    'Deaths':'deathIncrease',
    'Confirmed Positive':'positiveIncrease',
    'Test':'totalTestResultsIncrease',
    'Hospitalized':'hospitalizedIncrease',
  }
 store.subscribe(()=>{

   if(lastDailyState != store.getState().dailyNewSS || lastDailyStat != store.getState().dailyNewStat ){
        console.log(usa_state_data);

       const newData = usa_state_data.find( d=>d[0].state === store.getState().dailyNewSS).reverse();
       const stat = store.getState().dailyNewStat;
       console.log(newData);

      new_daily_chart.rerender({data:newData,yAttribute:mapStatToData[stat]});
   }

    lastDailyState = store.getState().dailyNewSS;
    lastDailyStat = store.getState().dailyNewStat;



   if(store.getState().states === null) return;
   d3.selectAll('.state-select').remove();
   d3.select('.states-picker').selectAll('.state-select').data(store.getState().states)
                .join('div')
                .attr('class', d=> d.on?'state-select state-select-on':'state-select')
                .html(d=>`${d.state}`)

  //day list selectors
  newStateSelector.addToList(store.getState().states.map(d=>d.state));

  d3.selectAll('.state-select').on('click', d=>{
    const state = d.state;

    store.dispatch(onOffState(state));
  })
  highlightStates(store.getState().states);
 })

 function highlightStates(states){
    const selectedStates = [];
    states.forEach(st=>{if(st.on){selectedStates.push(st.state)}});
   stateChart.changeHighlightedState(selectedStates)
 }


}
