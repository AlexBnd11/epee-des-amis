import { useState, useEffect } from "react";
import { supabase } from './supabaseClient';

export default function WishModal({ modalState, setModalState, selectedFriendId, wishes, setWishes }) {
    const [newWishName, setNewWishName] = useState('');
    const [newWishLink, setNewWishLink] = useState('');

    // Réinitialiser les champs quand la modale s'ouvre ou se ferme
    useEffect(() => {
        setNewWishName('');
        setNewWishLink('');
    }, [modalState]);

    async function handleAddWish() {
        if (!newWishName) return;

        const newWish = {
            name: newWishName,
            link: newWishLink || null
        };

        const { error } = await supabase
            .from('friends')
            .update({
                wishes: [...(wishes[selectedFriendId] || []), newWish]
            })
            .eq('id', selectedFriendId);

        if (!error) {
            setWishes(prev => ({
                ...prev,
                [selectedFriendId]: [...(prev[selectedFriendId] || []), newWish]
            }));

            setNewWishName('');
            setNewWishLink('');
            setModalState(false);
        }
    }
    return (
        <div 
            className={`fixed inset-0 bg-black/70 flex items-center justify-center p-4 ${modalState ? "block" : "hidden"}`}
            onClick={() => setModalState(false)} 
        >
            <div 
                className="bg-slate-800 rounded-2xl p-6 w-full max-w-md m-3"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold mb-6">Ajouter un souhait</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="wishName" className="block text-sm font-medium mb-1">
                            Nom du souhait
                        </label>
                        <input
                            type="text"
                            id="wishName"
                            value={newWishName}
                            className="w-full px-3 py-2 bg-slate-700 rounded-md"
                            placeholder="Ex: Coffret Blu-Ray Hell Driver"
                            onChange={(e) => setNewWishName(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="wishLink" className="block text-sm font-medium mb-1">
                            Lien (optionnel)
                        </label>
                        <input
                            type="url"
                            id="wishLink"
                            value={newWishLink}
                            className="w-full px-3 py-2 bg-slate-700 rounded-md"
                            placeholder="Optionnel"
                            onChange={(e) => setNewWishLink(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                setModalState(false);
                            }}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                handleAddWish();
                                setModalState(false);
                                
                            }}
                        >
                            Ajouter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}