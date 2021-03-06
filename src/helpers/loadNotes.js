import { db } from "../firebase/firebase-config";

export const loadNotes = async ( uid ) => {
    const notesSnap = await db.collection(`${uid}/journal/notes`).get();
    const notes = [];

    notesSnap.docs.forEach( snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        });
    });

    return notes.sort((a,b)=> b.date - a.date);
}