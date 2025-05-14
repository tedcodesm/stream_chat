import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getUserFriends } from '../lib/api';
import FriendCard from '../components/FriendCard';
import NoFriendsFound from '../components/NoFriendsFound';

const FriendPage = () => {

    const {data: friends = [],isLoading: loadingFriends} = useQuery({
        queryKey:["friends"],
        queryFn:getUserFriends,
    })
  return (
    <div className='py-4 px-8'>
      {
        loadingFriends ? (
     <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ): (friends.length < 0 ?(
        <NoFriendsFound/>
        ):(
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div> 
        ) )
      }
    </div>
  )
}

export default FriendPage
