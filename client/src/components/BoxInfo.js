import React, { memo } from 'react'
import anonAvatar from '../assets/anon-avatar.png'
import icons from '../ultils/icons'

const { BsDot, BsTelephoneFill, SiZalo } = icons


const BoxInfo = ({ userData }) => {
    return (
        <div className='w-full bg-yellow-500 rounded-md flex flex-col items-center p-4 gap-4'>
            <img
                src={anonAvatar}
                alt="thumbnal"
                className='w-20 h-20 object-cover rounded-full border-2 border-white'
            />
            <h3 className='font-medium text-xl'>{userData?.name}</h3>
            <span className='flex items-center'>
                <BsDot size={30} color='green' />
                <span>Đang hoạt động</span>
            </span>
            <a className='bg-[#13BB7B] py-2 flex items-center justify-center gap-2 rounded-md w-full text-white font-bold text-lg' href={`tel:${userData?.phone}`}>
                <BsTelephoneFill /> {userData?.phone}
            </a>
            <a className='bg-white py-2 flex items-center justify-center gap-2 rounded-md w-full font-bold text-lg' href={`https://zalo.me/${userData?.zalo}`}>
                <SiZalo size={35} color='blue' /> 
            </a>

        </div>
    )
}

export default memo(BoxInfo)