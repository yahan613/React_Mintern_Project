import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "@/Component/Footer";
import shoplistData from "../json/Shoplist.json";
import { updateQuantity, removeItem } from "../redux/cartSlice";
import CartItem from "@/Component/Cart/CartItem";
import EmptyCart from "@/Component/Cart/EmptyCart";
import OrderSummary from "@/Component/Cart/OrderSummary";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);

  // 初始化時自動選擇所有商品
  useEffect(() => {
    if (cart.items.length > 0 && selectedItems.length === 0) {
      setSelectedItems(cart.items.map(item => item.id));
    }
  }, [cart.items]);

  // 這個函數將商品ID映射到完整的商品資料
  const getProductDetails = (productId) => {
    return shoplistData.find(product => product.id === productId) || {};
  };

  // 處理商品數量更新
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeItem({ id }));
      // 從選中項目中移除
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  // 處理商品選擇
  const handleToggleSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // 刪除商品
  const handleRemoveItem = (id) => {
    dispatch(removeItem({ id }));
    // 從選中項目中移除
    setSelectedItems(selectedItems.filter(itemId => itemId !== id));
  };

  // 獲取所選商品的詳細信息用於顯示在訂單摘要中
  const getSelectedItemsDetails = () => {
    return cart.items
      .filter(item => selectedItems.includes(item.id))
      .map(item => {
        const product = getProductDetails(item.id);
        const price = item.price || product.price || 0;
        return {
          id: item.id,
          name: product.name,
          quantity: item.quantity,
          subtotal: item.quantity * price
        };
      });
  };

  // 結帳處理
  const handleCheckout = () => {
    console.log("Checkout with items:", getSelectedItemsDetails());
    
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--secondary)] pt-20">
      {/* 主內容區 */}
      <div className="flex-grow flex flex-col bg-[var(--secondary)]">

        <div className="container mx-auto px-4 sm:px-8 sm:px-12 mb-4 flex-grow">
          {/* 大容器，使用 flex-row 但在平板以下的裝置上變成 flex-col */}
          <div className="flex flex-col lg:flex-row gap-6 mt-5">
            {/* 左側容器 - 購物車商品列表 */}
            <div className="w-full lg:w-3/5 mb-6 sm:mb-0 ">
              {cart.items.length === 0 ? (
                <EmptyCart />
              ) : (
                <div className=" space-y-8 lg:space-y-4">
                  {/* 動態渲染購物車商品 */}
                  {cart.items.map((item) => {
                    const product = getProductDetails(item.id);
                    const isSelected = selectedItems.includes(item.id);

                    return (
                      <CartItem
                        key={item.id}
                        item={item}
                        product={product}
                        isSelected={isSelected}
                        onToggleSelect={handleToggleSelect}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemoveItem}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* 右側容器 - 訂單摘要 */}
            <OrderSummary 
              selectedItems={getSelectedItemsDetails()} 
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
