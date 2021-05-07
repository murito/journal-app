import Swal from "sweetalert2";

import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const createNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);

        dispatch(activeNote(docRef.id, newNote));
        dispatch( addNewNote( docRef.id, newNote ) );
    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        if (!note.url) {
            delete note.url;
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
        dispatch( updateNote(note.id, noteToFirestore) );

        Swal.fire('Saved', note.title, 'success');
    }
}

export const updateNote = (id, note) => ({
    type: types.notesUpdate,
    payload: {
        id,
        note: { id, ...note }
    }
});

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        try{
            const fileUrl = await fileUpload(file);
            activeNote.url = fileUrl;

            dispatch(startSaveNote(activeNote));
            Swal.close();
        }catch(error){
            Swal.close();
            Swal.fire('Error', error.message, 'error');
        }

    }
}

export const startDeleteNote = ( id ) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { notes } = getState().notes;
        const currentNote = notes.find(note => note.id === id);

        const result = await Swal.fire({
            title: `Are you sure you want to delete this Note:`,
            html: `
                <div style="display: ${ currentNote.url ? 'block' : 'none' }">
                    <img style="width: 140px;" src="${currentNote.url}"/>
                </div>
                <strong>[${currentNote.title}]</strong>
            `,
            showDenyButton: true,
            showCancelButton: true,
            showConfirmButton: false,
            denyButtonText: `Yes, Delete it.`
        });
        
        if ( result.isDenied ) {
            await db.doc(`${uid}/journal/notes/${id}`).delete();
            dispatch( deleteNote() );
            dispatch( setNotes( notes.filter(note => note.id !== id) ) );

            Swal.fire('Deleted', 'The Note was deleted.', 'success');
        }
    }
}

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id: id,
        ...note   
    }
})

export const deleteNote = () => ({
    type: types.notesDelete,
    payload:  null
})

export const notesLogout = () => ({
    type: types.notesClean
})