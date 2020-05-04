let SelectionPanel;


{
  class SelectionPanelClass{
    constructor(options){
      this.states = options.states; // a state is an object with a name(key) and selected(true/false bool)
      this.el = otions.el;
      this.dispFunc = options.dispFunc
      this.class = options.class;
      this.selectedStates = options.selectedStates;
    }
  }



  makeSelectionPanel(){
    d3.selectAll('.state-select').remove();
    d3.select(this.el).selectAll('.state-select').data(this.states)
                 .join('div')
                 .attr('class', d=> d.on?'state-select state-select-on':'state-select')
                 .html(d=>`${d.state}`)

   //day list selectors
   newStateSelector.addToList(store.getState().states.map(d=>d.state));

   d3.selectAll('.state-select').on('click', d=>{
     const state = d.state;

     this.dispFunc(state);
   })
  }
  render(){
    this.makeSelectionPanel();
  }

  reRender(options){
    this.states = options.states;
    this.render();
  }

  SelectionPanel = SelectionPanelClass;
}
