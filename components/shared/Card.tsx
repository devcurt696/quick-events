import { IEvent } from '@/lib/mongodb/database/models/event.model'
import Link from 'next/link'
import React from 'react'
type CardProps = {
    event: IEvent,
    hasOrderLink?: boolean,
    hidePrice?: boolean 
}
const Card = ({ event, hasOrderLink, hidePrice}: CardProps) => {
  return (
    <div className='group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[480px]'>
        <Link 
            href={`/events/${event._id}`} 
            style={{backgroundImage: `url(${event.imageUrl})`}}
            className='flex-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500'
        >

        </Link>
    </div>
  )
}

export default Card