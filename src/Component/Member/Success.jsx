import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { X } from 'lucide-react'
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'
import { app } from "@/firebase/config";
import shopList from '@/json/Shoplist.json';
import { useDispatch } from 'react-redux'
import { logout } from '@/redux/loginSlice'
import { Storage } from '@/firebase/storage'
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { fetchAvatarUrl } from '@/api/avator'
import { useQuery } from '@tanstack/react-query'

const db = getFirestore(app)

export default function Success() {
    const userInfo = useSelector((state) => state.login)
    const [showOrderDetails, setShowOrderDetails] = useState(false)
    const [orders, setOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)
    const dispatch = useDispatch();

    // 根據商品名稱獲取圖片URL
    const getProductImage = (productName) => {
        const product = shopList.find(item => item.name === productName);
        return product ? product.img : '/placeholder.png';
    };

    useEffect(() => {
        const fetchOrders = async () => {
            if (userInfo.userId) {
                try {
                    console.log('Fetching orders for user:', userInfo.userId);
                    const ordersRef = collection(db, 'orders')
                    const q = query(ordersRef, where('userId', '==', userInfo.userId))
                    const querySnapshot = await getDocs(q)
                    const ordersData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    console.log('Fetched orders:', ordersData);
                    setOrders(ordersData)
                } catch (error) {
                    console.error('Error fetching orders:', error)
                }
            }
        }
        fetchOrders()
    }, [userInfo.userId])

    //Avator 
    /*useEffect(() => {
        if (userInfo.userMail) {
            // 只取 @ 前面部分作為檔名，避免錯誤
            const safeEmail = userInfo.userMail.split('@')[0];
            const imgRef = ref(Storage, `avatars/${safeEmail}.png`);
            getDownloadURL(imgRef)
                .then((url) => {
                    console.log("圖片網址：", url);
                    setAvatarUrl(url);
                });
        }
    }, [userInfo.userMail])*/

    const { data: avatarUrl = '/default-avatar.png', isLoading } = useQuery({
        queryKey: ['avatar', userInfo.userMail],
        queryFn: () => fetchAvatarUrl(userInfo.userMail),
        enabled: !!userInfo.userMail,
    });


    const handleOrderClick = async (orderId) => {
        try {
            const orderRef = doc(db, 'orders', orderId)
            const orderSnap = await getDoc(orderRef)
            if (orderSnap.exists()) {
                setSelectedOrder({ id: orderSnap.id, ...orderSnap.data() })
                setShowOrderDetails(true)
            }
        } catch (error) {
            console.error('Error fetching order details:', error)
        }
    }

    const handleCloseDetails = () => {
        setShowOrderDetails(false)
        setSelectedOrder(null)
    }

    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate();
        return date.toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }


    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className="h-9/10 w-9/10 sm:w-2/3 flex flex-col lg:flex-row justify-center items-start m-10 rounded-2xl gap-8">
                {/* 上側內容：會員資料區塊和訂單列表 */}
                <div className={`h-auto sm:h-full w-full lg:w-3/5 flex justify-center rounded-2xl px-10 py-5 transition-all duration-500 bg-[var(--base-100)] ${showOrderDetails ? '' : 'lg:mx-auto'}`}>
                    <div className="w-full text-center flex items-center flex-col text-[var(--secondary)]">
                        <div className='w-full flex flex-row justify-center items-center'>
                            <img
                                src={avatarUrl}
                                alt="User Avatar"
                                className="w-3/10 lg:ml-10 rounded-full border-2 border-[var(--secondary)] object-cover mb-4 self-center"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/default-avatar.png';
                                }}
                            />
                            <div className="w-7/10 text-base lg:text-2xl font-bold my-5">歡迎，{userInfo.userName}</div>
                        </div>


                        <div className="flex flex-col sm:flex-row w-full justify-between p-3 mb-6 border-2 rounded-2xl border-[var(--darker-tertiary)] gap-15 text-start ">
                            <div className="text-sm lg:text-xl font-semibold">E-mail</div>
                            <div className="text-sm lg:text-xl">{userInfo.userMail}</div>
                        </div>

                        <div className="flex flex-row w-full justify-between p-3 mb-6 border-2 rounded-2xl border-[var(--darker-tertiary)] gap-10">
                            <div className="text-sm lg:text-xl font-semibold">ChickenBaby</div>
                            <div className="text-sm lg:text-xl">{userInfo.userChickenBaby}</div>
                        </div>

                        <div className='w-full'>
                            <div className='text-xl sm:text-2xl flex pl-3 font-semibold'>My orders</div>
                            <div className="w-full h-[1px] bg-[var(--secondary)] my-4"></div>
                            <div className='w-full flex flex-row justify-between px-3 sm:px-5 text-sm text-start lg:text-base font-semibold text-[var(--secondary)]'>
                                <p>Order Number</p>
                                <p className="mr-10">Order Date</p>
                                <p>Status</p>
                            </div>

                            {orders.length === 0 ? (
                                <div className="text-center py-4 text-[var(--secondary)]">
                                    <p>No orders found</p>
                                </div>
                            ) : (
                                orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="w-full flex flex-row justify-between px-3 sm:px-5 py-3 mt-2 bg-[var(--tertiary)] rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                        onClick={() => handleOrderClick(order.id)}
                                    >
                                        <p className="text-sm lg:text-base text-[var(--secondary)]">{order.orderNumber}</p>
                                        <p className="text-sm lg:text-base text-[var(--secondary)] sm:ml-10 ">
                                            {formatDate(order.orderDate)}
                                        </p>
                                        <p className="text-sm lg:text-base text-[var(--secondary)]">{order.status}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* 下側內容：訂單詳細資料 */}
                {showOrderDetails && selectedOrder && (
                    <div className="w-full lg:w-2/5 p-5 rounded-2xl bg-[var(--darker-tertiary)] text-[var(--secondary)] text-xl flex flex-col transition-all duration-1000 overflow-hidden animate-slide-down self-center ">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="sm:text-2xl font-semibold">Order details</h3>
                            <button onClick={handleCloseDetails} className="p-1 rounded-full hover:bg-[var(--tertiary)] transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div className="flex flex-row justify-between">
                                <p className="font-semibold" >Order Number</p>
                                <p>{selectedOrder.orderNumber}</p>
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <p className="font-semibold">Order Date</p>
                                <p className='text-base sm:text-xl'>{formatDate(selectedOrder.orderDate)}</p>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p className="font-semibold">Status</p>
                                <p>{selectedOrder.status}</p>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p className="font-semibold">Total</p>
                                <p>NT$ {selectedOrder.total?.toLocaleString()}</p>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p className="font-semibold">Shipping Address</p>
                                <p className="text-right max-w-[200px]">{selectedOrder.address}</p>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p className="font-semibold">Payment Method</p>
                                <p>{selectedOrder.paymentMethod === 'credit_card' ? 'Credit Card' : 'Cash on Delivery'}</p>
                            </div>
                            <div className="w-full h-px bg-[var(--secondary)] my-2"></div>
                            {selectedOrder.items && (
                                <div className="w-full flex flex-col items-start">
                                    <h4 className="text-lg font-semibold mb-2 self-start">Order Items</h4>
                                    <div className="flex flex-wrap gap-4">
                                        {selectedOrder.items.map((item, index) => {
                                            const productImage = getProductImage(item.name);
                                            console.log('Product image for', item.name, ':', productImage); // 添加日誌
                                            return (
                                                <div key={index} className="flex flex-col items-center">
                                                    <img
                                                        className="w-20 h-20 object-cover rounded-lg max-w-[70px] max-h-[70px]"
                                                        src={productImage}
                                                        alt={item.name}
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = '/placeholder.png';
                                                        }}
                                                    />
                                                    <span className="text-sm mt-1">{item.name}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                )}
            </div>
            <div className='flex justify-center items-center mt-10 mb-10'>
                <Link to="/login" onClick={handleLogout} className=" flex justify-center items-center px-10 py-3 bg-[var(--accent)] text-white text-xl font-bold rounded hover:bg-[var(--base-200)] hover:text-[var(--accent)] transition-colors duration-200">
                    登出
                </Link>
            </div>
        </div>
    )
}