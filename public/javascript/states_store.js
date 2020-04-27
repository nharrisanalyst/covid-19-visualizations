let store

//actions
const setStates = (data)=>({
  type:'SET_STATES',
  payload:{
    data
  }
})

const onOffState=(state)=>({
  type:'ON_OFF_STATE',
  payload:{
    state,
  }
})

const setDailyState =(state)=>({
  type:'SET_DAILY_NEW_STATE',    //can also be all of the unitied states
  payload:{
     state
  }
})

const setDailyStatistic =(stat)=>({
  type:'SET_DAILY_NEW_STATISTIC',
  payload:{
    stat
  }
})


{


    const initState =  {
        states:null,
        dailyNewSS:'USA',
        dailyNewStat:'Deaths'
    }

    const stateReducer = (state = initState, action= null) =>{
          switch(action.type){
            case 'ON_OFF_STATE':
              return {...state, states:state.states.map(st=>{
                  if(action.payload.state === st.state){
                    st.on = !st.on;
                  }
                  return st;
              })};

            case 'SET_DAILY_NEW_STATE':
              return {...state, dailyNewSS:action.payload.state};
            case 'SET_DAILY_NEW_STATISTIC':
              return {...state, dailyNewStat:action.payload.stat};
            case 'SET_STATES':
              return {...state, states:action.payload.data};
               return state;
          }
    };

    store = Redux.createStore(stateReducer);
}
