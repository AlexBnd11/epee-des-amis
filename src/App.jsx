import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import FriendCard from "./FriendCard";
import WishModal from './WishModal';
import { FRIENDS_DATA } from './data/friends';
import pixelSword from './assets/pixel-sword.png';

export default function App() {
  const [wishes, setWishes] = useState({});
  const [modalState, setModalState] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState(null);

  useEffect(() => {
    async function fetchWishes() {
      const { data, error } = await supabase
        .from('friends')
        .select('*');
      
      if (!error && data) {
        const wishesById = {};
        data.forEach(friend => {
          wishesById[friend.id] = friend.wishes;
        });
        setWishes(wishesById);
      }
    }

    fetchWishes();
  }, []);

  return (
    <>
      <h1 className="text-3xl p-9 pb-5 text-center flex items-center justify-center gap-3 font-['Press_Start_2P'] text-yellow-500">
        <img 
          src={pixelSword} 
          alt="Pixel Sword" 
          className="h-20 w-20 object-contain"
        />
        L'épée des amis
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 p-10">
        {FRIENDS_DATA.map(friend => (
          <FriendCard 
            key={friend.id}
            id={friend.id}
            name={friend.name}
            birthday={friend.birthday}
            wishes={wishes[friend.id] || []}
            setWishes={setWishes}
            modalState={modalState}
            setModalState={setModalState}
            setSelectedFriendId={setSelectedFriendId}
          />
        ))}
      </div>
      <WishModal
        modalState={modalState}
        setModalState={setModalState}
        selectedFriendId={selectedFriendId}
        wishes={wishes}
        setWishes={setWishes}
      />
    </>
  );
}
