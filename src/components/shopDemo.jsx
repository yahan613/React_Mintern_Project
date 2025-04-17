
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { increment } from "@/redux/cartSlice";

export default function DialogDemo({ item }) {
  //佔存區
  const [count, setCount] = useState(1);
  const tempincrement = () => setCount(count + 1);
  const tempdecrement = () => setCount(count > 1 ? count - 1 : 1); // 最小值為 1

  //全域變數更改區
  const dispatch = useDispatch();



  const AddToCart = () => {
    setCount(1);
    dispatch(
      increment({
        count: count,
        type: item.type,
        id: item.id,
        price: item.price, // 添加商品價格
      })
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false); // 自動關閉提示
    }, 2000);
  }

  return (
    <div>
      <Dialog >
        <DialogTrigger asChild className="bg-[var(--secondary)]">
          <Button className="text-[var(--darker-tertiary)] hover:text-[var(--secondary)] hover:bg-[var(--darker-tertiary)]">Buy Now</Button>
        </DialogTrigger>
        <DialogContent className="w-[80vw] lg:w-[500vw] h-[90vh] bg-[#D9D9D9] p-12">
          <DialogHeader className="bg-[var(--base-200)] mb-4">
            <DialogTitle>{item.name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <figure>
              <img src={item.img} alt={item.name} className="rounded-xl object-cover w-[200px] bg-[var(--primary)] object-cover" />
            </figure>
            <div className="flex items-center mt-4">
              <button className="bg-[#F3DC9F] p-2 " onClick={tempdecrement}>
                -
              </button>
              <span className="text-lg font-bold bg-gray-200 px-4 py-1 rounded w-22 mx-4">{count}</span>
              <button className="bg-[#F3DC9F] p-2" onClick={tempincrement}>
                +
              </button>
            </div>
            <div className="my-4">
              <span className="font-bold">NT$ {item.price}</span>
            </div>
            <div className="my-2">{item.func}</div>
          </div>
          <DialogTrigger>
            <Button type="submit" className="bg-[#D44721] text-white" onClick={AddToCart}>Add to cart</Button>
          </DialogTrigger>
        </DialogContent>
      </Dialog>
      {/* 加入購物車後提示視窗 */}
      
    </div>
  )
}
