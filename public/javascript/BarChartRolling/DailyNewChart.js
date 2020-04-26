
let DailyNewChart;

{
  class DailyNewChartClass extends DailyNewBase{



    makeBars(){
      console.log('bandwidth',this.xScale.bandwidth())
      console.log(this.xScale.domain());
      console.log(this.xScale.range());
      this.mainG.selectAll('.daily-bars').data(this.data)
                                         .join('rect')
                                         .attr('height', d=> this.height - this.yScale(d[this.yAtt]))
                                         .attr('width', this.xScale.bandwidth())
                                         .attr('x', d => this.xScale(d.date))
                                         .attr('y', d => this.yScale(d[this.yAtt]))
                                         .attr('fill','rgb(191, 0, 255)')
                                         .attr('stroke', 'white')
                                         .attr('stroke-width', 1)


    }

    makeAverageLine(){

    }

   render(){
    this.makeSVG();
    this.makeScales();
    this.makeAxis();
    this.makeBars();
   }
   rerender(options){

   }
  }

  DailyNewChart = DailyNewChartClass;

}
