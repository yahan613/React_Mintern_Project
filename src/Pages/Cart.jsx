import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "@/Component/Footer";
import shoplistData from "../json/Shoplist.json";
import { updateQuantity, removeItem } from "../redux/cartSlice";

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

  // 計算總金額（使用實際價格）
  const calculateTotal = () => {
    return cart.items.reduce((total, item) => {
      // 只計算被選中的商品
      if (selectedItems.includes(item.id)) {
        // 使用商品實際價格
        const price = item.price || getProductDetails(item.id).price || 0;
        return total + (item.quantity * price);
      }
      return total;
    }, 0);
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

  console.log("目前item：", cart);
  console.log("選中商品：", selectedItems);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--secondary)]">
      {/* 主內容區 */}
      <div className="flex-grow pt-8">
        <div className='flex justify-start'>
          <h1 className="text-1xl text-white mb-8 ml-12">Home/cart</h1>
        </div>

        <div className="container mx-auto px-12 mb-16">
          {/* 主要容器，使用 flex-row */}
          <div className="flex flex-row gap-6 ">
            {/* 左側容器 - 購物車商品列表 */}
            <div className="w-3/5">
              {cart.items.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-lg">
                  <p className="text-gray-500">The cart is empty</p>
                  <Link to="/product" className="mt-4 inline-block bg-[var(--primary)] text-white px-4 py-2 rounded">
                    Go shopping~😎
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* 動態渲染購物車商品 */}
                  {cart.items.map((item) => {
                    const product = getProductDetails(item.id);
                    const price = item.price || product.price || 0;
                    const subtotal = item.quantity * price;
                    const isSelected = selectedItems.includes(item.id);

                    return (
                      <div
                        key={item.id}
                        className="bg-[var(--darker-tertiary)] p-6 rounded-[20px] shadow-md"
                      >
                        <div className="flex items-center space-x-6">
                          {/* 選擇框 */}
                          <div className="flex-shrink-0">
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleToggleSelect(item.id)}
                                className="sr-only" // 隱藏原始 checkbox
                              />
                              <div
                                onClick={() => handleToggleSelect(item.id)}
                                className="w-6 h-6 rounded bg-[var(--secondary)] cursor-pointer flex items-center justify-center"
                              >
                                {isSelected && (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* 商品圖片 */}
                          <div className="flex-shrink-0">
                            <img
                              src={product.img}
                              alt={product.name}
                              className="w-[160px] h-[160px] object-cover rounded-lg"
                            />
                          </div>

                          {/* 商品信息 */}
                          <div className="flex flex-col flex-grow space-y-4 items-start">
                            <h3 className="text-xl font-semibold text-[var(--secondary)]">{product.name}</h3>
                            <p className="text-[var(--secondary)] text-lg font-medium mt-1">
                              NT$ {subtotal.toLocaleString()}
                            </p>

                            {/* 數量調整 */}
                            <div className="flex items-center">
                              <button
                                className="px-3 py-1 bg-[var(--primary)] text-white rounded-l-lg border-none shadow-none overflow-hidden"
                                style={{ boxShadow: 'none', borderRadius: '0.5rem 0 0 0.5rem' }}
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              >
                                -
                              </button>
                              <span className="px-4 py-1 bg-[var(--secondary)] text-white border-x border-[var(--primary)]">{item.quantity}</span>
                              <button
                                className="px-3 py-1 bg-[var(--primary)] text-white rounded-r-lg border-none shadow-none overflow-hidden"
                                style={{ boxShadow: 'none', borderRadius: '0 0.5rem 0.5rem 0' }}
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>


                          </div>

                          {/* 刪除按鈕 */}
                          <div className="flex-shrink-0">
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-[var(--secondary)] hover:text-[var(--error)] transition-colors bg-transparent border-none shadow-none"
                              style={{ boxShadow: 'none' }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 右側容器 - 訂單摘要 */}
            <div className="w-2/5 bg-[var(--primary)] p-6 rounded-lg shadow-md h-fit">
              <h2 className="text-xl font-semibold mb-6 text-[var(--secondary)]">Order Summary</h2>
              
              {selectedItems.length === 0 ? (
                <div className="text-center py-4 text-[var(--secondary)]">
                  <p>No items selected</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* 所選商品列表 */}
                  <div className="space-y-3">
                    {getSelectedItemsDetails().map(item => (
                      <div key={item.id} className="flex justify-between items-center text-[var(--secondary)]">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium truncate max-w-[180px]">{item.name}</span>
                          <span className="text-sm">x{item.quantity}</span>
                        </div>
                        <span>NT$ {item.subtotal.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* 分隔線 */}
                  <div className="border-t border-gray-300"></div>
                  
                  {/* 運費 */}
                  <div className="flex justify-between text-[var(--secondary)]">
                    <span>Shipping:</span>
                    <span>NT$ 0</span>
                  </div>
                  
                  {/* 總金額 */}
                  <div className="relative mt-4">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gray-300"></div>
                    <div className="pt-4">
                      <div className="flex justify-between font-bold text-[var(--secondary)]">
                        <span>Total:</span>
                        <span>NT$ {calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* 結帳按鈕 */}
                  <button
                    className="w-full bg-[var(--darker-tertiary)] text-[var(--secondary)] py-3 rounded-lg mt-4 font-semibold"
                    disabled={selectedItems.length === 0}
                  >
                    CHECKOUT
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
