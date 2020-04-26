let StateChart;
{
  class BaseXYChart{
    constructor(options){
      this.margin = {l:40,t:20,r:20,b:20};
      this.el = options.el;
      this.data = options.data;
      this.highlightedStates = options.highlightedStates;
      this.height = this.el.getBoundingClientRect().height - (this.margin.t+this.margin.b);
      this.width = this.el.getBoundingClientRect().width - (this.margin.l+this.margin.r);
      this.doubleData=options.doubleData;
    }

    makeSVG(){
      this.svg = d3.select(this.el).append('svg')
                                    .attr('height', this.height +(this.margin.t+this.margin.b))
                                    .attr('width', this.width + (this.margin.l+this.margin.r))
       this.mainG = this.svg.append('g')
                        .attr('transform', `translate(${this.margin.l}, ${this.margin.t})`)
    }

   makeScales(){
      let dayMax = d3.max(this.data, d=>d.length);
           dayMax = dayMax + ((3000-dayMax) % 10);

      this.dayMax = dayMax;
      this.xScale= d3.scaleLinear().domain([0,dayMax]).range([0,this.width]);
      const maxY = 300000
             this.maxY = maxY;
      this.yScale = d3.scaleLog().domain([10,maxY]).range([this.height,0]);

      }

    makeAxis(){
      const xAxis = d3.axisBottom(this.xScale).tickValues(makeYTicks(this.dayMax, 5));
      const yAxis = d3.axisRight(this.yScale).tickFormat(d3.format('.2s')).tickSize(this.width - this.margin.l-this.margin.r).tickValues([100, 500, 1000, 5000, 10000,20000,50000,100000,200000,300000]);

      this.mainG.append('g').attr('class', 'log-chart-x-axis').attr('transform', `translate(0, ${this.height})`)
                                                              .call(xAxis).call(g => g.selectAll(".domain")
                                                                                      .attr("stroke-opacity", 0.5)
                                                                                      .attr("stroke-dasharray", "2,2"))
                                                              .call(g => g.selectAll(".tick line").remove());


      this.mainG.append('g').attr('class','log-chart-y-axis').attr('transform', `translate(${0}, ${0})`)
                            .call(yAxis).call(g => g.select('.domain').remove())
                            .call(g => g.selectAll(".tick line")
                                        .attr("stroke-opacity", 0.5)
                                        .attr("stroke-dasharray", "2,2")
                                        .attr('x2', this.width))
                                        .call(g => g.selectAll(".tick text")
                                                     .attr("x", 4)
                                                     .attr("dy", -4));

    }

  }

    class  LogStateChart extends BaseXYChart{



      makeLines(){
        const self = this;
        const line = d3.line()
                      .x(d=> this.xScale(d.day))
                      .y(d => this.yScale(d.positive));
        this.mainG.selectAll('.state-groups').remove();
        this.mainG.selectAll('.state-groups').data(this.data)
                   .join('g')
                   .attr('class','state-groups')
                   .attr('fill', d=> d[0]===undefined?'none': self.highlightedStates.includes(d[0].state)?'rgb(58, 68, 207)':'rgb(181,232,255)')
                   .each(function(d,i){
                      d3.select(this).append('path').datum(d)
                                      .attr('class', d=>d[0]===undefined?'state-path':`state-path state-path-${d[0].state}`)
                                      .attr('d', line)
                                      .attr('fill', 'none')
                                      .attr('stroke',  d=> d[0]===undefined?'none': self.highlightedStates.includes(d[0].state)?'rgb(58, 68, 207)':'rgb(181,232,255)')
                                      .attr('stroke-width', d => window.innerWidth<670?1:1.5 );

                    d3.select(this).selectAll('.state-circles').data(d)
                                   .join('circle')
                                   .attr('class',d=>`state-circle state-circle-${d.state}`)
                                   .attr('cx',d => self.xScale(d.day))
                                   .attr('cy', d => self.yScale(d.positive))
                                   .attr('r',d => window.innerWidth<670?1.5:2.0);
                   })


      }


      makeOverlay(){


             let dataFlat = [];
             for(var state of this.data) if(state.length != 0) dataFlat = dataFlat.concat(state);

             const points = dataFlat.map(d=>([(this.xScale(d.day) +this.margin.l),(this.yScale(d.positive)+this.margin.t)]))

             const delaunay= d3.Delaunay.from(points);
             const voronoi = delaunay.voronoi([0,0, this.width,this.height]);

             console.log(delaunay.find(1,1))
                   this.svg.on('mousemove', el=>{
                    d3.selectAll('.popup-circle').remove();
                   d3.selectAll('.circle-overlay').remove();
                    const [mx,my] = d3.mouse(this.el);
                    const index = delaunay.find(mx, my);
                  this.renderOverlay(dataFlat[index], mx,my);

               const xoffset =window.innerWidth < 670? -125: my >200?35:-220
              const popUp = this.mainG.selectAll('.popup-circle').data([dataFlat[index]])
                                                                 .join('g')
                                                                 .attr('class', 'popup-circle')
                                                                 .attr('fill', 'rgb(50,50,50)')
                                                                 .attr('transform', d=>`translate(${(this.xScale(d.day)+xoffset)}, ${this.yScale(d.positive)-20})`)

                                                                 popUp.append('text')
                                                                       .attr('y', d => window.innerWidth < 670?'10':'0')
                                                                       .text(d => `State: ${d.state}`);

                                                                 popUp.append('text')
                                                                      .attr('y', '20')
                                                                     .text(d =>`Confirmed Positive ${d3.format(",")(d.positive)}`)

            })

            this.svg.on('mouseleave', el=>{
              d3.selectAll('.tool-tip-text').remove();
              d3.selectAll('.popup-circle').remove();
             d3.selectAll('.circle-overlay').remove();
              d3.selectAll('.circle-overlay').remove();
                            d3.selectAll('.state-path')
                                            .attr('stroke',  d=> d[0]===undefined?'none': this.highlightedStates.includes(d[0].state)?'rgb(58, 68, 207)':'rgb(181,232,255)')
                                            .attr('stroke-width', 2 );

                          d3.selectAll('.state-circle')
                                         .attr('fill',d=> this.highlightedStates.includes(d.state)?'rgb(58, 68, 207)':'rgb(181,232,255)');
        })
      }

      renderOverlay(data, x,y){

        d3.selectAll('.state-circle').attr('fill','none');
        d3.selectAll('.state-path').attr('stroke', 'rgb(181,232,255)')
                                   .attr('stroke-width', 1)
                                   .attr('stroke-opacity', 0.75);

        d3.selectAll(`.state-circle-${data.state}`).attr('fill','rgb(58, 68, 207)');
        d3.selectAll(`.state-path-${data.state}`).attr('stroke','rgb(58, 68, 207)')
                                                 .attr('stroke-width', 2 )
                                                 .attr('stroke-opacity',1);

       this.mainG.append('circle').datum(data)
                                  .attr('class',"circle-overlay")
                                  .attr('cx',d => this.xScale(d.day))
                                  .attr('cy', d => this.yScale(d.positive))
                                  .attr('r', 5)
                                  .attr('fill','rgb(143, 210, 255)');

         const stateData = d3.select(`.state-path-${data.state}`).data()[0];
         const popUpData = stateData[stateData.length-1];

         d3.selectAll('.tool-tip-text').remove();
         const xOffSet =  popUpData.state ==='WA'?150:popUpData.state ==='MI'?80:30;
         const yOffSet = popUpData.state ==='MP'?-40:25;
         const popUp = this.mainG.append('g')
                           .attr('class', 'tool-tip-text')
                           .attr('transform',`translate(${(this.xScale(popUpData.day) - xOffSet)}, ${this.yScale(popUpData.positive) +yOffSet})`)

                      popUp.append('text')
                           .text(`State: ${popUpData.state}`)
                      popUp.append('text')
                           .attr('y', '20')
                          .text(`Confirmed Positive ${d3.format(",")(popUpData.positive)}`)
                     //.text(this.renderPopUp(popUpData.state,d3.format(",")(popUpData.positive),'Positive'));


      }

      renderPopUp(state, value, currentNew, title){
        return(`<div  class='state-chart-popup'>
                  <div class='state-popup-state'>State: ${state}</div>
                  <div class='value-popup-state'>${title}: ${value}</div>
                </div>`)
      }

      changeHighlightedState(highlightedStates){
        this.highlightedStates = highlightedStates;
        this.data = this.data.sort(d=>{
          if(highlightedStates.includes( d[0]!= undefined && d[0].state)){
            return 1
          }else{
            return -1;
          }
        })
        this.makeLines();
      }
      makeDoubleLines(){
        const line = d3.line()
                       .x(d=>this.xScale(d.day))
                       .y(d=>this.yScale(d.value));
       console.log('double this',this.doubleData);
       this.mainG.selectAll('.double-lines').data(this.doubleData)
                                             .join('path')
                                             .attr('class', 'double-lines')
                                             .attr('stroke', 'rgba(100,100,100, 0.5)')
                                             .attr('stroke-width', 1)
                                             .attr('fill', 'none')
                                             .attr("stroke-dasharray", '10,5')
                                             .attr('d', line);

        this.mainG.selectAll('.double-line-text')
                                .data(this.doubleData)
                                .join('text')
                                .attr('class', 'double-text')
                                .attr('x',(d,i)=> i === 0?this.xScale(doubleDay(this.maxY, i+1) -7):this.xScale(doubleDay(this.maxY, i+1) -9))
                                .attr('y', this.yScale(this.maxY)+ 18)
                                .attr('fill', 'rgba(100,100,100, 0.25)')
                                .text((d,i)=> i===0? `Doubles Every Day`:`Doubles Every ${i+1} Days`)

      }

      render(){
        this.makeSVG();
        this.makeScales();
        this.makeAxis();
        this.makeDoubleLines();
        this.makeLines();
        this.makeOverlay();
        //this.makeDots();
      }

    }


 function makeYTicks(num, multiple){
   const ticks =[];
   while(num >=0){
      ticks.push(num);
      num = num - multiple;
   }

   return ticks;
 }


//this is essentially an export
  StateChart = LogStateChart;
}
