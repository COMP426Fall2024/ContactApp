import {Contact} from "./Contact.js";
import {ContactView} from "./ContactView.js";

const loadContacts = async () => {
    const contact_id_list = await Contact.findAll();
    contact_id_list.forEach(async (cid) => {
        const contact = await Contact.find(cid);
        new ContactView(contact, document.querySelector('#contactList'));
    });
}
    
loadContacts();

document.querySelector('#add_contact').addEventListener('click', async (e) => {
        let contact = await Contact.create("First", "Last", "Email", "Phone", "Notes");
        new ContactView(contact, document.querySelector('#contactList'), true);
    }
);


