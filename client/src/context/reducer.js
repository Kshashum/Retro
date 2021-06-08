export const initialState = {
    login:false,
    cart:[],
    token:null,
    name:"",
    userid:"",
    searchlist:[],
    autocomplete:[]
}
const removeitem = (cart,productid)=>{
    let res ={}
    cart.forEach(item => {
        if(item.productid===productid){
            if (item.quantity===1){
            }
            else{
                res.push({
                    ...item,
                    quantity:item.quantity-1
                })
            }
        }
        else{
            res.push(item)
        }
    return res        
    });
}
const reducer = (state,action)=>{
    switch(action.type){
        case "ADD_TO_CART":
            return {
                ...state,
                cart:[...state.cart,action.item]
            }
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart:state.cart.filter((item)=>{return item.productid !== action.item.productid})
            }
        case "REDUCE_FROM_CART":
                return{
                    ...state,
                    cart: removeitem(state.cart,action.item.productid)
                }
        case "SEARCH":
            return {
                ...state,
                searchlist:action.item
            }
        case "AUTOCOMPLETE":
            return {
                ...state,
                autocomplete:action.item
            }
        case "AUTHORIZE":
            return {
                ...state,
                login:true,
                token:action.item.token,
                name:action.item.name,
                userid:action.item.userid
            }
        case "LOGOUT":
            return {
                ...state,
                name:"",
                userid:null,
                token:null,
                login:false
            }
        default:
            return state
    }
}
export default reducer