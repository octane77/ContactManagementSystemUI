import React from 'react';

const Contact = ({contact, editContact, deleteContact}) => {
    return (
        <tr key = {contact.id}>
            <td className="text-center px-6 py-2 whitespace-nowrap">
                <div className="text-sm text-gray-500">{contact.firstName}</div>
            </td>
            <td className="text-center px-6 py-2 whitespace-nowrap">
                <div className="text-sm text-gray-500">{contact.lastName}</div>
            </td>
            <td className="text-center px-6 py-2 whitespace-nowrap">
                <div className="text-sm text-gray-500">{contact.emailAddress}</div>
            </td>
            <td className="text-center px-6 py-2 whitespace-nowrap">
                <div className="text-sm text-gray-500">{contact.mobile}</div>
            </td>
            <td className="text-center px-6 py-2 whitespace-nowrap">
                <div className="text-sm text-gray-500">{contact.office}</div>
            </td>
            <td className="text-center px-6 py-2 whitespace-nowrap">
                <a onClick={(e, id) => editContact(e, contact.id)}
                   className="rounded text-sm text-white bg-blue-500 py-1 px-2 hover:bg-blue-700 hover:cursor-pointer">Edit</a>
                <a onClick={(e, id) => deleteContact(e, contact.id)}
                   className="rounded  text-sm text-white bg-red-500 py-1 px-2 ml-1 hover:bg-red-700 hover:cursor-pointer">Delete</a>
            </td>
        </tr>
    );

};

export default Contact;
