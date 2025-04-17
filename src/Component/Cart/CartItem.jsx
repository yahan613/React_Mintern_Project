import React from 'react';
import QuantityAdjuster from '@/components/ui/QuantityAdjuster'
import CustomCheckbox from '@/components/ui/customCheckbox';
import DeleteButton from '@/components/ui/deleteButton';

const CartItem = ({ 
  item, 
  product, 
  isSelected, 
  onToggleSelect, 
  onQuantityChange, 
  onRemove 
}) => {
  const subtotal = item.quantity * (item.price || product.price || 0);

  return (
    <div className="bg-[var(--darker-tertiary)] p-4 sm:p-6 rounded-[20px] shadow-md relative">
      <div className="flex items-start items-center space-x-4">
        {/* 選擇框 */}
        <CustomCheckbox 
          isChecked={isSelected} 
          onChange={() => onToggleSelect(item.id)} 
        />

        {/* 商品圖片 */}
        <div className="flex-shrink-0">
          <img
            src={product.img}
            alt={product.name}
            className="w-[100px] h-[100px] sm:w-[160px] sm:h-[160px] object-cover rounded-lg mr-5"
          />
        </div>

        {/* 商品信息 */}
        <div className="flex flex-col flex-grow space-y-2 items-start sm:space-y-4 ml-2">
          <h3 className="text-base sm:text-xl font-semibold text-[var(--secondary)]">{product.name}</h3>
          <p className="text-[var(--secondary)] text-base sm:text-lg font-medium">
            NT$ {subtotal.toLocaleString()}
          </p>

          {/* 數量調整器 */}
          <QuantityAdjuster
            quantity={item.quantity}
            onDecrease={() => onQuantityChange(item.id, item.quantity - 1)}
            onIncrease={() => onQuantityChange(item.id, item.quantity + 1)}
          />
        </div>

        {/* 刪除按鈕 */}
        <DeleteButton onClick={() => onRemove(item.id)} />
      </div>
    </div>
  );
};

export default CartItem; 