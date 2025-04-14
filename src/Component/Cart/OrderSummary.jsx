import React from 'react';

const OrderSummary = ({ selectedItems, onCheckout }) => {
  return (
    <div className="w-full sm:w-2/5 bg-[var(--primary)] p-6 rounded-lg shadow-md h-fit">
      <h2 className="text-xl font-semibold mb-6 text-[var(--secondary)]">Order Summary</h2>
      
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
                <span>NT$ {calculateTotal(selectedItems).toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          {/* 結帳按鈕 */}
          <button
            className="w-full bg-[var(--darker-tertiary)] text-[var(--secondary)] py-3 rounded-lg mt-4 font-semibold"
            disabled={selectedItems.length === 0}
            onClick={onCheckout}
          >
            CHECKOUT
          </button>
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