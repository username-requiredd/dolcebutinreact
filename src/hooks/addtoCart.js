import { useCart } from "../contex/Cartcontex";
import useFetch from "./useFetch";
const AddToCart = (id) => {
    const productID = parseInt(id)
    const url = `https://dummyjson.com/products/${productID}`
    const {data,error,loading} = useFetch(url)
    const { cart, setCart } = useCart();
    const search = cart.find((item)=> item.id === productID )
    if(search === undefined){
      const results = data.find((x)=> x.id === productID )
       if(results){
        setCart((prev) => [
            ...prev,
            {
              id: results.id,
              title: results.title,
              images: results.images[0],
              price: results.price,
              quantity: 1,
              instock: results.stock,
            },
          ]);
  
       }
    }else{
        console.log("products already exist in cart")
    }
}
 
export default AddToCart;