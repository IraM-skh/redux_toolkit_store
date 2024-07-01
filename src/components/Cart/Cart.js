import { useSelector } from "react-redux";
import Card from "../UI/Card";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
    const itemsInCartState = useSelector(
        (state) => state.itemsInCart.itemsInCart
    );
    const isItemInCart = useSelector((state) => state.itemsInCart.isItemInCart);

    const itemsInCartJsx = itemsInCartState.map((item, index) => {
        return (
            <CartItem
                key={item.title + index + item.title}
                item={{
                    title: item.title,
                    quantity: item.amount,
                    total: item.totalPrice,
                    price: item.price,
                }}
            />
        );
    });

    return (
        <Card className={styles.cart}>
            {!isItemInCart && <h2>Корзина пуста</h2>}
            {isItemInCart && <h2>Мои Покупки</h2>}
            <ul>{itemsInCartJsx}</ul>
        </Card>
    );
};

export default Cart;
