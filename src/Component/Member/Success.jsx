import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { X } from 'lucide-react'
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'
import { app } from "@/firebase/config";
import shopList from '@/json/Shoplist.json';

const db = getFirestore(app)

export default function Success() {
    const userInfo = useSelector((state) => state.login)
    const [showOrderDetails, setShowOrderDetails] = useState(false)
    const [orders, setOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)

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

    return (
        <div className="h-screen w-full flex flex-row justify-center items-start m-10 rounded-2xl px-10 gap-10">
            {/* 左側內容：會員資料區塊和訂單列表 */}
            <div className={`h-9/10 w-full lg:w-2/5 flex justify-center m-5 rounded-2xl px-10 bg-[var(--base-100)] transition-all duration-500 ${showOrderDetails ? '' : 'lg:mx-auto'}`}>
                <div className="w-full text-center flex items-center flex-col text-[var(--secondary)]">
                    <div className="text-base lg:text-3xl font-bold my-10">歡迎，{userInfo.userName}</div>

                    <div className="flex flex-row w-full justify-between p-3 mb-6 border-2 rounded-2xl border-[var(--darker-tertiary)] gap-15">
                        <div className="text-sm lg:text-xl">E-mail</div>
                        <div className="text-sm lg:text-xl">{userInfo.userMail}</div>
                    </div>

                    <div className="flex flex-row w-full justify-between p-3 mb-6 border-2 rounded-2xl border-[var(--darker-tertiary)] gap-10">
                        <div className="text-sm lg:text-xl">ChickenBaby</div>
                        <div className="text-sm lg:text-xl">{userInfo.userChickenBaby}</div>
                    </div>

                    <div className='w-full'>
                        <div className='text-2xl flex pl-3'>My orders</div>
                        <div className="w-full h-[1px] bg-[var(--secondary)] my-4"></div>
                        <div className='w-full flex flex-row justify-between px-5 text-sm lg:text-base font-semibold text-[var(--secondary)]'>
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
                                    className="w-full flex flex-row justify-between px-5 py-3 mt-2 bg-[var(--tertiary)] rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                    onClick={() => handleOrderClick(order.id)}
                                >
                                    <p className="text-sm lg:text-base text-[var(--secondary)]">{order.orderNumber}</p>
                                    <p className="text-sm lg:text-base text-[var(--secondary)] ml-10">
                                        {formatDate(order.orderDate)}
                                    </p>
                                    <p className="text-sm lg:text-base text-[var(--secondary)]">{order.status}</p>
                                </div>
                            ))
                        )}
                    </div>

                    <Link to="/login" className="mt-4 px-4 py-2 bg-[var(--accent)] text-white font-bold rounded hover:bg-[var(--base-200)] hover:text-[var(--accent)] transition-colors duration-200">
                        登出
                    </Link>
                </div>
            </div>

            {/* 右側內容：訂單詳細資料 */}
            {showOrderDetails && selectedOrder && (
                <div className="w-full lg:w-1/3 p-5 rounded-2xl bg-[var(--darker-tertiary)] text-[var(--secondary)] text-xl font-regular flex flex-col transition-all duration-1000 overflow-hidden animate-slide-down self-center">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-semibold">Order details</h3>
                        <button onClick={handleCloseDetails} className="p-1 rounded-full hover:bg-[var(--tertiary)] transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className="flex flex-row justify-between">
                            <p>Order Number</p>
                            <p>{selectedOrder.orderNumber}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Order Date</p>
                            <p>{formatDate(selectedOrder.orderDate)}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Status</p>
                            <p>{selectedOrder.status}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Total</p>
                            <p>NT$ {selectedOrder.total?.toLocaleString()}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Shipping Address</p>
                            <p className="text-right max-w-[200px]">{selectedOrder.address}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Payment Method</p>
                            <p>{selectedOrder.paymentMethod === 'credit_card' ? 'Credit Card' : 'Cash on Delivery'}</p>
                        </div>
                        {selectedOrder.items && (
                            <div className="mt-4">
                                <h4 className="text-lg font-semibold mb-2">Order Items</h4>
                                <div className="flex flex-wrap gap-4">
                                    {selectedOrder.items.map((item, index) => {
                                        const productImage = getProductImage(item.name);
                                        console.log('Product image for', item.name, ':', productImage); // 添加日誌
                                        return (
                                            <div key={index} className="flex flex-col items-center">
                                                <img 
                                                    className="w-20 h-20 object-cover rounded-lg max-w-[70px]" 
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
    )
}
