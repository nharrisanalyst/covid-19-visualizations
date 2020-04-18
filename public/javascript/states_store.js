let store

{
  const stateAbbreviations = [
'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
'VT','VI','VA','WA','WV','WI','WY'
]

    const initState =  stateAbbreviations.map(state=>({
        name:state, on:true
    }))

    const stateReducer = (state = initState, action= null) =>{
          switch(action.type){
            default:
               return state;
          }
    };

    store = Redux.createStore(stateReducer);
}
