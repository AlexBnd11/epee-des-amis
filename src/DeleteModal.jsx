export default function DeleteModal({ modalState, setModalState, onConfirm }) {
    return (
        <div 
            className={`fixed inset-0 bg-black/70 flex items-center justify-center p-4 ${modalState ? "block" : "hidden"}`}
            onClick={() => setModalState(false)}
        >
            <div 
                className="bg-slate-800 rounded-2xl p-6 w-full max-w-md m-3"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold mb-6">Confirmer la suppression</h2>
                <p className="mb-6">Êtes-vous sûr de vouloir supprimer ce souhait ?</p>
                
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 cursor-pointer"
                        onClick={() => setModalState(false)}
                    >
                        Annuler
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 cursor-pointer"
                        onClick={() => {
                            onConfirm();
                            setModalState(false);
                        }}
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
} 