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
  const [count, setCount] = useState(0);
  const tempincrement = () => setCount(count + 1);
  const tempdecrement = () => setCount(count > 1 ? count - 1 : 1); // 最小值為 1

  //全域變數更改區
  const dispatch = useDispatch();

  const AddToCart = () => {
    setCount(0);
    dispatch(
      increment({
        count: count,
        type: item.type,
        id: item.id,
        price: item.price, // 添加商品價格
      })
    );
  }
  return (
    <Dialog >
      <DialogTrigger asChild className="bg-[var(--secondary)]">
        <Button variant="outline" className="text-[#F3DC9F]">Buy Now</Button>
      </DialogTrigger>
      <DialogContent className="w-500 bg-[#D9D9D9] p-12">
        <DialogHeader className="bg-[var(--base-200)] mb-4">
          <DialogTitle>{item.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <figure>
            <img src={item.img} alt={item.name} className="rounded-xl w-full h-98 object-cover" />
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
  )
}
