import { useState } from 'react';
import DeleteModal from './DeleteModal';
import { supabase } from './supabaseClient';
import PlusIcon from "./assets/plusicon.png";

function normalizeUrl(url) {
    if (!url) return null;
    
    // Si l'URL ne commence pas par http:// ou https://, ajouter https://
    if (!url.match(/^https?:\/\//)) {
        // Si l'URL commence par www., ajouter juste https://
        if (url.startsWith('www.')) {
            return `https://${url}`;
        }
        // Sinon ajouter https://www.
        return `https://www.${url}`;
    }
    
    return url;
}

export default function FriendCard({ id, name, birthday, wishes, setWishes, modalState, setModalState, setSelectedFriendId }) {
    const [deleteModalState, setDeleteModalState] = useState(false);
    const [wishToDelete, setWishToDelete] = useState(null);

    async function handleDeleteWish() {
        const updatedWishes = wishes.filter((_, index) => index !== wishToDelete);
        
        const { error } = await supabase
            .from('friends')
            .update({ wishes: updatedWishes })
            .eq('id', id);

        if (!error) {
            setWishes(prev => ({
                ...prev,
                [id]: updatedWishes
            }));
        }
    }

    return (
        <div className="bg-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">{name}</h2>
            <p className="text-sm text-slate-400 mb-4">{birthday}</p>
            
            <div className="space-y-2">
                {wishes.map((wish, index) => (
                    <div key={index} className="flex items-center justify-between gap-2 bg-slate-700 p-3 rounded-lg">
                        <span className="flex items-center gap-2">
                            {wish.name}
                            {wish.link && (
                                <a 
                                    href={normalizeUrl(wish.link)} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-400 hover:text-blue-300"
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-5 w-5" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" 
                                        />
                                    </svg>
                                </a>
                            )}
                        </span>
                        <button
                            onClick={() => {
                                setWishToDelete(index);
                                setDeleteModalState(true);
                            }}
                            className="p-1 hover:text-red-500"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            <div 
                className="flex items-center gap-2 hover:underline cursor-pointer mt-4" 
                onClick={() => {
                    setSelectedFriendId(id);
                    setModalState(true);
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>Ajouter un souhait</span>
            </div>

            <DeleteModal 
                modalState={deleteModalState}
                setModalState={setDeleteModalState}
                onConfirm={handleDeleteWish}
            />
        </div>
    );
}