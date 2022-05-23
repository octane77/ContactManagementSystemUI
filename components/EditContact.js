import React, {Fragment, useState, useEffect} from 'react';
import {Dialog, Transition} from "@headlessui/react";

const EditContact = ({contactId, setResponseContact}) => {
    const FETCH_CONTACT_BY_ID_BASE_URL = "http://localhost:8080/cms/api/v1/fetchUserById";
    const UPDATE_CONTACT_API_BASE_URL = "http://localhost:8080/cms/api/v1/updateContact"
    const [isOpen, setIsOpen] = useState(false);
    const [contact, setContact] = useState({
        id: "",
        firstName: "",
        lastName: "",
        emailAddress: "",
        mobile: "",
        office: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(FETCH_CONTACT_BY_ID_BASE_URL + "/" + contactId, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const _contact = await response.json();
                setContact(_contact);
                setIsOpen(true);
            } catch (error) {
                console.log(error);
            }
        };
        if (contactId) {
            fetchData();
        }
    }, [contactId]);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setContact({ ...contact, [event.target.name]: value });
    };

    const reset = (e) => {
        e.preventDefault();
        setIsOpen(false)
    }

    const updateContact = async (e) => {
        e.preventDefault();
        const response = await fetch(UPDATE_CONTACT_API_BASE_URL + "/" + contactId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
        });
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        const _contact = await response.json();
        setResponseContact(_contact);
        reset(e);
    }

    const resetEntry = (e) => {
        e.preventDefault();
        setContact({
            id: "",
            firstName: "",
            lastName: "",
            emailAddress: "",
            mobile: "",
            office: "",
        });
        setIsOpen(true);
    };

    return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}>
            <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
            <div className="min-h-screen px-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95">
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900">
                            Edit Contact
                        </Dialog.Title>
                        <div className="flex max-w-md max-auto">
                            <div className="py-2">
                                <div className="h-14 my-4">
                                    <label className="block text-gray-600 text-sm font-normal">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={contact.firstName}
                                        onChange={(e) => handleChange(e)}
                                        className="h-10 w-96 border mt-2 px-2 py-2"></input>
                                </div>
                                <div className="h-14 my-4">
                                    <label className="block text-gray-600 text-sm font-normal">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={contact.lastName}
                                        onChange={(e) => handleChange(e)}
                                        className="h-10 w-96 border mt-2 px-2 py-2"></input>
                                </div>
                                <div className="h-14 my-4">
                                    <label className="block text-gray-600 text-sm font-normal">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="emailAddress"
                                        value={contact.emailAddress}
                                        onChange={(e) => handleChange(e)}
                                        className="h-10 w-96 border mt-2 px-2 py-2"></input>
                                </div>
                                <div className="h-14 my-4">
                                    <label className="block text-gray-600 text-sm font-normal">
                                        Mobile
                                    </label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        value={contact.mobile}
                                        onChange={(e) => handleChange(e)}
                                        className="h-10 w-96 border mt-2 px-2 py-2"></input>
                                </div>
                                <div className="h-14 my-4">
                                    <label className="block text-gray-600 text-sm font-normal">
                                        Office
                                    </label>
                                    <input
                                        type="text"
                                        name="office"
                                        value={contact.office}
                                        onChange={(e) => handleChange(e)}
                                        className="h-10 w-96 border mt-2 px-2 py-2"></input>
                                </div>
                                <div className="h-14 my-4 space-x-4 pt-4">
                                    <button
                                        onClick={updateContact}
                                        className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6">
                                        Update
                                    </button>
                                    <button
                                        onClick={resetEntry}
                                        className="rounded text-white font-semibold bg-blue-400 hover:bg-blue-700 py-2 px-6">
                                        Clear
                                    </button>
                                    <button
                                        onClick={reset}
                                        className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition>
    )
};

export default EditContact;
