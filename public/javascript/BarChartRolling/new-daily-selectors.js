let newStatisticSelector;
let newStateSelector;

{
  const statisticSelector = new SelectOption({
    el: d3.select('.daily-new-select-statistic').node(),
    list:['Daily Deaths'],
    selected:'Daily Deaths',
    dispFunc:(stat)=>{store.dispatch(setDailyStatistic(stat))},
    selectClass:'daily-new-select-statistic-selector'
  })

  const stateSelector = new SelectOption({
    el: d3.select('.daily-new-select-state').node(),
    list:['USA'],
    selected:'USA',
    dispFunc:(state)=>{store.dispatch(setDailyState(state))},
    selectClass:'daily-new-select-state-selector'
  })

   newStatisticSelector = statisticSelector;
   newStateSelector =stateSelector;

   newStatisticSelector.render();
   newStateSelector.render();
}
