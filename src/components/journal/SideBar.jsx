import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeLogout } from '../../actions/auth';
import { JournalEntries } from './JournalEntries'
import { createNote } from '../../actions/notes';

export const SideBar = () => {
    const dispatch = useDispatch();
    const { name } = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch( makeLogout() );
    }

    const handleAddNew = () => {
        dispatch( createNote() );
    }

    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-nabvar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span>{ name }</span>
                </h3>

                <button className="btn clear" onClick={ handleLogout }>
                    Logout
                </button>
            </div>

            <div className="journal__new-entry" onClick={ handleAddNew }>
                <div className="fab">
                    <div className="avatar">
                        <i className="far fa-calendar"></i>
                    </div>
                </div>
            </div>

            <hr/>

            <JournalEntries />
        </aside>
    )
}
