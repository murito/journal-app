import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startDeleteNote, startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {
    const dispatch = useDispatch();
    const { active:note } = useSelector(state => state.notes);

    const handleSave = () => {
        dispatch( startSaveNote(note) );
    }

    const handlePicture = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]; 
        if( file ){
            dispatch( startUploading( file ) );
        }
    }

    const handleDelete = () => {
        dispatch( startDeleteNote( note.id ) );
    }

    return (
        <div className="notes__appbar">
            <span>28 de agosto 2020</span>

            <input 
                id="fileSelector"
                type="file" 
                name="image"
                className="hidden" 
                onChange={ handleFileChange }/>

            <div>
                <button className="btn clear" onClick={ handlePicture }>Picture</button>
                <button className="btn clear" onClick={ handleSave }>Save</button>
                <button className="btn clear" onClick={ handleDelete }>
                    <i className="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
    )
}
