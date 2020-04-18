{
 store.subscribe(()=>{
   if(store.getState().states === null) return;
   d3.selectAll('.state-select').remove();
   d3.select('.states-picker').selectAll('.state-select').data(store.getState().states)
                .join('div')
                .attr('class', d=> d.on?'state-select state-select-on':'state-select')
                .html(d=>`${d.state}`)

  d3.selectAll('.state-select').on('click', d=>{
    const state = d.state;
    console.log(state)
    store.dispatch(onOffState(state));
  })
  console.log(store.getState());
 })


}
