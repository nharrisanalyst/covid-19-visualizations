
let DailyNewChart;

{

  const mapStatToData ={
    'deathIncrease':'Deaths',
    'positiveIncrease':'Confirmed Positive',
    'totalTestResultsIncrease':'Test',
    'hospitalizedIncrease':'Hospitalized',
  }
  class DailyNewChartClass extends DailyNewBase{



    makeBars(){

      this.mainG.selectAll('.daily-bars').data(this.data)
                                         .join('rect')
                                         .attr('class', 'daily-bars')
                                         .attr('height', d=> this.height - this.yScale(d[this.yAtt]))
                                         .attr('width', this.xScale.bandwidth())
                                         .attr('x', d => this.xScale(d.date))
                                         .attr('y', d => this.yScale(d[this.yAtt]))
                                         .attr('fill','rgb(191, 0, 255)')
                                         .attr('stroke', 'grey')
                                         .attr('stroke-width', 0.5)


    }

    makeAverageLine(){
      this.mainG.select('.seven-day-ave-line').remove();
      const rollingData = d3.rolling(this.data.reverse(),7,d=>d[this.yAtt]);

      const rollingDataWithDate =[];
      let index =0;
      for(let data of rollingData){
        if(isNaN(data)){
          index++;
        }else{
          rollingDataWithDate.push({value:data, date:this.data[index].date});
          index++;
        }
      }
    const line = d3.line()
                   .x(d=>(this.xScale(d.date) + (this.xScale.bandwidth()/2)))
                   .y(d=> this.yScale(d.value))

         this.mainG.append('path').datum(rollingDataWithDate)
                    .attr('class','seven-day-ave-line')
                    .attr('d', line)
                    .attr('stroke', 'rgb(255,149,0)')
                    .attr('stroke-width', 3)
                    .attr('fill', 'none')



    }

    barsOverlay(){
      const self = this;
       this.mainG.selectAll('.daily-bars').on('mouseenter',function(d){
         d3.select(this).attr('stroke', 'black').attr('stroke-width', 2);
         const [mx,my] =d3.mouse(d3.select('body').node());
         const x = mx> window.innerWidth -250?window.innerWidth -250:mx;// + self.margin.l;
         const y = my -100 //+ self.margin.t;

         d3.select(self.el).append('div')
                           .attr('class', 'new-daily-tooltip')
                           .style('position', 'absolute')
                           .style('top', `${y}px`)
                           .style('left', `${x +10 }px`)
                           .html(self.renderPopHTML(mapStatToData[self.yAtt], d[self.yAtt],d.date))
       })

       this.mainG.selectAll('.daily-bars').on('mouseleave',function(){
         d3.selectAll('.new-daily-tooltip').remove();
         d3.select(this).attr('stroke', 'grey') .attr('stroke-width', 0.5);
       })
    }

    renderPopHTML(title,value, day){
      return `<div style='font-weight:bold;' class='daily-chart-title'>${title}</div>
               <div class='daily-chart-amount'>New Daily Amount: ${value}</div>
               <div class='daily-chart-amount'>Date: ${day}</div>`
    }

   render(){
    this.makeSVG();
    this.makeScales();
    this.makeAxis();
    this.makeBars();
    this.makeAverageLine();
    this.barsOverlay();
   }

   update(){
     this.makeScales();
     this.upateAxis();
     this.makeBars();
     this.makeAverageLine();
     this.barsOverlay();
   }
   rerender(options){
     console.log(options);
    this.yAtt = options.yAttribute === undefined? this.yAtt:options.yAttribute;
    this.data = options.data === undefined? this.data:options.data;
    this.update();
   }
  }

  DailyNewChart = DailyNewChartClass;

}
