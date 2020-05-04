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

const setRollingStat = (stat) =>({
   type:'SET_ROLLING_STAT',
   payload:{
     stat,
   }
})

const setRollingStates = (states) =>({
  type:'SET_ROLLING_STATES',
  payload:{
    states,
  }
})

const onOffRollingState = (state) =>({
  type:'ON_OFF_ROLLING_STATE',
  payload:{
    state,
  }
})

{


    const initState =  {
        states:null,
        dailyNewSS:'USA',
        dailyNewStat:'Deaths',
        rollingStates:null,
        rollingStat:'Deaths',
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
            case 'ON_OFF_ROLLING_STATE':
            return {...state, rollingStates:state.states.map(st=>{
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
            case 'SET_ROLLING_STATES':
              return {...state,rollingStates:action.payload.states};
            default:
              return state;


            }
    };

    store = Redux.createStore(stateReducer);
}
