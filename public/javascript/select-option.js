let SelectOption;


{
   class SelectOptionClass{
     constructor(options){
       this.el = options.el;
       this.list = options.list;
       this.selected = options.selected;
       this.dispFunc = options.dispFunc;  // dispatch function takes new value dispatches this
       this.selectClass = options.selectClass;
     }

     makeselectOption(){
       this.select = d3.select(this.el).append('select').attr('class', this.selectClass);




       this.select.selectAll('option').data(this.list)
                                      .join('option')
                                      .property('value', d=>d)
                                      .text(d=>d);

       this.select.property('value',this.selected);

     }

     onChage(){
       const self = this;
       this.select.on('change', function(){
          self.dispFunc();
       })
     }


   render(){
     this.makeselectOption();
     this.onChage();
   }
 }




SelectOption = SelectOptionClass;
const test = new SelectOption({
     el:d3.select('.daily-new-select-state').node(),
     list:[1,2,3],
     selected:3,
     dispFunc:()=>{console.log('here we are')},
     selectClass:'test-select-class',
})

test.render();

}
