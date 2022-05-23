// noinspection SpellCheckingInspection

import React, {useEffect, useState} from 'react';
import Contact from "./Contact";
import EditContact from "./EditContact";

const ContactList = ({contact}) => {
    const FETCH_CONTACTS_API_BASE_URL = "http://localhost:8080/cms/api/v1/fetchContacts"
    const DELETE_CONTACT_BY_ID_API_URL = "http://localhost:8080/cms/api/v1/deleteContactBy"
    const [contacts, setContacts] = useState(null)
    const [loading, setLoading] = useState(true)
    const [contactId, setContactId] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(FETCH_CONTACTS_API_BASE_URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const contacts = await response.json()
                setContacts(contacts)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        fetchData()
    }, [contact])

    const deleteContact = (e, id) => {
        e.preventDefault();
        fetch(DELETE_CONTACT_BY_ID_API_URL + "/" + id, {
            method: "DELETE",
        }).then((res) => {
            if (contacts) {
                setContacts((prevElement) => {
                    return prevElement.filter((contacts) => contacts.id !== id);
                })
            }
        })
    }

    const editContact = (e, id) => {
        e.preventDefault();
        setContactId(id)
    }

    return (
        <>
        <div className="container mx-auto my-8">
            <div className="flex shadow border-b">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="text-center font-medium text-gray-500 py-2 px-6">First Name</th>
                        <th className="text-center font-medium text-gray-500 py-2 px-6">Last Name</th>
                        <th className="text-center font-medium text-gray-500 py-2 px-6">Email Address</th>
                        <th className="text-center font-medium text-gray-500 py-2 px-6">Mobile</th>
                        <th className="text-center font-medium text-gray-500 py-2 px-6">Office</th>
                        <th className="text-center font-medium text-gray-500 py-2 px-6">Actions</th>
                    </tr>
                    </thead>
                    {!loading && (
                        <tbody className="bg-white">
                        {contacts?.map((contact) => (
                            <Contact contact={contact} key={contact.id} deleteContact={deleteContact}
                                     editContact={editContact}/>
                        ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    <EditContact contactId={contactId}/>
    </>
)

};

export default ContactList;
