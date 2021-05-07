import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    const dispatch = useDispatch();
    const { active:note } = useSelector( state => state.notes );
    
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { body, title } = formValues;

    // load the selected note on the screen
    const activeId = useRef(note.id);
    useEffect(() => {
        if( activeId.current !== note.id ){
            activeId.current = note.id;
            reset(note);
        }
    }, [ note, reset ]);

    // Change the active note on change
    useEffect(() => {
        dispatch( activeNote(formValues.id, {...formValues}) );
    }, [ formValues, dispatch ]);

    const imageErrorHandler = (error) => {
        error.target.style.display = 'none';
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input 
                    type="text"
                    placeholder="Some awesome title"
                    autoComplete="off"
                    className="notes__input title"
                    onChange={ handleInputChange }
                    name="title"
                    value={ title }
                />

                <textarea 
                    placeholder="Type a description"
                    className="notes__description"
                    onChange={ handleInputChange }
                    name="body" 
                    value={ body }
                ></textarea>

                {
                    note.url &&  
                    <div className="notes__image">
                        <img 
                            src={ note.url } 
                            alt="forest-mountain"
                            onError={ imageErrorHandler }
                        />
                    </div>
                }
            </div>
        </div>
    )
}
