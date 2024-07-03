import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import StatusBarMessage from "./components/UI/StatusBarMessage";
import { sendCartDataAC, getCartData } from "./store/items-in-cart-slice";

let isInitialRunning = true;

function App() {
    const isCartOpen = useSelector((state) => state.itemsInCart.isCartOpen);
    const itemsInCart = useSelector((state) => state.itemsInCart.itemsInCart);
    const isCarUnpdate = useSelector((state) => state.itemsInCart.isCarUnpdate);
    const statusMessage = useSelector(
        (state) => state.fetchStatus.statusMessage
    );
    const dispatchFun = useDispatch();
    useEffect(() => {
        dispatchFun(getCartData());
    }, []);
    useEffect(() => {
        if (isInitialRunning) {
            isInitialRunning = false;
            return;
        }
        if (isCarUnpdate) {
            dispatchFun(sendCartDataAC(itemsInCart));
        }
    }, [itemsInCart]);
    return (
        <Layout>
            {statusMessage && (
                <StatusBarMessage
                    status={statusMessage.status}
                    title={statusMessage.title}
                    message={statusMessage.message}
                />
            )}
            {isCartOpen && <Cart />}
            <Products />
        </Layout>
    );
}

export default App;
