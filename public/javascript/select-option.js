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
          const value = d3.select(this).node().value;
          self.dispFunc(value);
          self.selected = value;
          self.select.property('value',value);
       })
     }


   render(){
     this.makeselectOption();
     this.onChage();
   }
   addToList(listAddition){
      this.list = this.list.concat(listAddition);
     this.select.remove();
     console.log('this is a story');

     this.makeselectOption()
     this.onChage();
   }
 }




SelectOption = SelectOptionClass;


}
