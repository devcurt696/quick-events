import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/mongodb/database/models/order.model'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async () => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const orders = await getOrdersByUser({userId, page: 1 });

    const orderedEvents = orders?.data.map((order: IOrder) => order.event || []);
    const organizedEvents = await getEventsByUser({ 
        userId,
        page: 1
    })

    console.log({orderedEvents});
  return (
    <>
        { /* my tickets*/}
        <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
            <div className='wrapper flex items-center justify-center sm:justify-between'>
                <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
                <Button asChild size='lg' className='button hidden sm:flex'>
                    <Link href='/#events'>
                        Explore More Events
                    </Link>
                </Button>
            </div>
        </section>

        
            <section className='wrapper my-8'>
            <Collection 
            data={orderedEvents}
            emptyTitle="no event tickets purchased"
            emptyStateSubtext="Come back later"
            collectionType="My_Tickets"
            limit={3}
            page={1}
            urlParamName='ordersPage'
            totalPages={2}
            />
        </section>
        
        {/* events organized*/}

        <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
            <div className='wrapper flex items-center justify-center sm:justify-between'>
                <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
                <Button asChild size='lg' className='button hidden sm:flex'>
                    <Link href='/events/create'>
                        Create New Event
                    </Link>
                </Button>
            </div>
        </section>

        
        <section className='wrapper my-8'>
            <Collection 
            data={organizedEvents?.data}
            emptyTitle="no events have been created yet"
            emptyStateSubtext="Go and create an event"
            collectionType="Events_Organized"
            limit={6}
            page={1}
            urlParamName='eventsPage'
            totalPages={2}
            />
        </section>
        
    </>
  )
}

export default ProfilePage