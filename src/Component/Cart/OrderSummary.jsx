import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeItem } from '../../redux/cartSlice';

const OrderSummary = ({ selectedItems, onCheckout }) => {
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [showSuccess, setShowSuccess] = useState(false);
  const shippingFee = 50;
  const dispatch = useDispatch();

  const subtotal = calculateTotal(selectedItems);
  const total = subtotal + shippingFee;

  const handleCheckout = () => {
    onCheckout();
    // 移除已結帳的商品
    selectedItems.forEach(item => {
      dispatch(removeItem({ id: item.id, type: item.type }));
    });
    setShowSuccess(true);
    // 3秒後自動關閉提示
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="w-full sm:w-2/5 bg-[var(--primary)] p-6 rounded-lg shadow-md h-fit">
      <h2 className="text-2xl font-semibold mb-8 text-[var(--secondary)]">Order Summary</h2>
      
      {selectedItems.length === 0 ? (
        <div className="text-center py-4 text-[var(--secondary)]">
          <p>No items selected</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 所選商品列表 */}
          <div className="space-y-3">
            {selectedItems.map(item => (
              <div key={item.id} className="flex justify-between items-center text-[var(--secondary)]">
                <div className="flex items-center space-x-2">
                  <span className="font-medium truncate max-w-[150px] sm:max-w-[300px] text-sm sm:text-base">{item.name}</span>
                  <span className="text-sm">x{item.quantity}</span>
                </div>
                <span>NT$ {item.subtotal.toLocaleString()}</span>
              </div>
            ))}
          </div>
          
          {/* 分隔線 */}
          <div className="w-full h-[1px] bg-gray-100 my-4"></div>
          
          {/* 運費 */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-[var(--secondary)] cursor-pointer" onClick={() => setIsAddressOpen(!isAddressOpen)}>
              <span className="flex items-center gap-2 font-medium">
                Shipping
                <svg 
                  className={`w-4 h-4 transition-transform ${isAddressOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
              <span>NT$ {shippingFee}</span>
            </div>
            
            {isAddressOpen && (
              <div className="mt-2 p-4 bg-gray-100 rounded-lg">
                <label className="block text-sm font-regular text-[var(--secondary)] mb-2 text-left">
                  Delivery Address
                </label>
                <textarea
                  className="w-full p-2 border border-[var(--secondary)] rounded-md hover:ring-1 hover:ring-[var(--tertiary)] focus:ring-1 focus:ring-[var(--tertiary)]"
                  rows="3"
                  placeholder="Enter your delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            )}
          </div>
          
          {/* 支付方式 */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-[var(--secondary)]">
              <span className="font-medium">Payment Method</span>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="p-2 rounded-md hover:ring-1 hover:ring-[var(--tertiary)] focus:ring-1 focus:ring-[var(--tertiary)] bg-white w-45"
              >
                <option value="credit_card">Credit Card</option>
                <option value="cash_on_delivery">Cash on Delivery</option>
              </select>
            </div>
          </div>
          
          {/* 總金額 */}
          <div className="relative mt-4">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gray-100"></div>
            <div className="pt-4">
              <div className="flex justify-between font-semibold text-[var(--secondary)] text-2xl">
                <span>Total</span>
                <span>NT$ {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          {/* 結帳按鈕 */}
          <button
            className="w-full bg-[var(--darker-tertiary)] text-[var(--secondary)] py-3 rounded-lg mt-4 font-semibold"
            disabled={selectedItems.length === 0}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      )}

      {/* 結帳成功提示 */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="relative bg-[var(--tertiary)] p-8 rounded-lg shadow-xl animate-fade-in">
            <div className="text-center">
              <svg 
                className="w-16 h-16 mx-auto mb-4 text-[var(--secondary)]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
              <h3 className="text-2xl font-semibold text-[var(--secondary)] mb-3">Order Successful!</h3>
              <p className="text-lg text-[var(--secondary)]">Thank you for your purchase.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 計算總金額的輔助函數
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.subtotal, 0);
};

export default OrderSummary; 