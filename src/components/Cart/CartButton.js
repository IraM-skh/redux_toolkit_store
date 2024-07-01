import { useDispatch, useSelector } from "react-redux";
import styles from "./CartButton.module.css";
import { itemsInCartSliceActions } from "../../store/items-in-cart-slice";

const CartButton = (props) => {
    const dispatchFun = useDispatch();
    const totalAmount = useSelector(
        (state) => state.itemsInCart.amountItemsInCart
    );
    const toggleShowCartHandler = () => {
        dispatchFun(itemsInCartSliceActions.toggleShowCart());
    };
    return (
        <button className={styles.button} onClick={toggleShowCartHandler}>
            <span>Корзина</span>
            <span className={styles.badge}>{totalAmount}</span>
        </button>
    );
};

export default CartButton;
