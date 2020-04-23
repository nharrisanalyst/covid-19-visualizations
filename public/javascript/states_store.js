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


{


    const initState =  {
        states:null
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
            case 'SET_STATES':
              return {...state, states:action.payload.data};
               return state;
          }
    };

    store = Redux.createStore(stateReducer);
}
