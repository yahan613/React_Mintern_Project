import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Success() {
    const userInfo = useSelector((state) => state.login)
    return (
        <div className="h-screen flex items-center justify-center m-10 rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.5)] p-10 px-20 bg-[var(--base-100)]">
            <div className="text-center flex items-center justify-center flex-col">
                <div className="text-3xl font-bold mb-10">歡迎，{userInfo.userName}</div>
                <div className="text-2xl mb-6">Mail: {userInfo.userMail}</div>
                <div className="text-2xl mb-6">ChickenBaby: {userInfo.userChickenBaby}</div>

                <Link to="/login" className="mt-4 px-4 py-2 bg-[var(--accent)] text-white font-bold rounded hover:bg-[var(--base-200)] hover:text-[var(--accent)] transition-colors duration-200">
                    登出
                </Link>
            </div>
        </div>
    )
}
