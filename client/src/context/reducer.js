export const initialState = {
    login:false,
    cart:[],
    removecart:[],
    token:null,
    name:"",
    userid:"",
    searchlist:[],
    autocomplete:[],
    gte:0,
    lte:400,
    ord:"",
    price100_200:0,
    price200_300:0,
    price300_500:0,
    clickSearch:false,
    cartid:""
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
        case "CARTID":
            return {
                ...state,
                cartid: action.item
            }
        case "DO_SEARCH":
            return {
                ...state,
                clickSearch:!state.clickSearch
            }
        case "SORT":
            return {
                ...state,
                ord:action.item
            }
        case "ADD_FILTER":
            return {
                ...state,
                gte: action.item.gte,
                lte:action.item.lte
            }
        case "ADD_TO_CART":
            return {
                ...state,
                cart:[...state.cart,action.item]
            }
        case "EMPTY_CART":
            return {
                ...state,
                cartid:"",
                cart:[],
                removecart:[]
            }
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart:state.cart.filter((item)=>{return item.productid !== action.item.productid}),
                removecart: [...state.removecart,action.item]
            }
        case "REDUCE_FROM_CART":
                return{
                    ...state,
                    cart: removeitem(state.cart,action.item.productid)
                }
        case "DELETE_FROM_CART":
            return{
                ...state,
                removecart:state.removecart.filter((item)=>{return item.productid !== action.item.productid})
            }
        case "SEARCH":
            return {
                ...state,
                searchlist:action.item.searchlist,
                price100_200:action.item.price100_200,
                price200_300:action.item.price200_300,
                price300_500:action.item.price300_500
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