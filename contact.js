class Contact {

    constructor(id, first, last, email, phone, notes) {
        this.id = id;
        this.first = first;
        this.last = last;
        this.email = email;
        this.phone = phone;
        this.notes = notes;
    }
}

let database = []

Contact.findAll = () => {
    return database.map(c => c.id);
};

Contact.find = (id) => {
    return database.find(c => c.id == id);
}

Contact.next_id = 0
Contact.create = (first, last, email, phone, notes) => {

    let result = new Contact(Contact.next_id, first, last, email, phone, notes);
    database.push(result);
    Contact.next_id += 1;
    return result;
}

Contact.delete = (id) => {
    database = database.filter(c => c.id != id);
}

// Hardcode some initial contacts.

Contact.create("John", "Doe", "john_doe@email.unc.edu", "919-867-5309", "Non-descript guy");
Contact.create( "Sally", "Walters", "sally_walters@email.unc.edu", "919-867-5309", "Fun coworker");
Contact.create( "Rajan", "Shah", "rajan_shah@email.unc.edu", "919-867-5309", "The Bomb");
Contact.create( "Anita", "Rao", "anita_rao@email.unc.edu", "919-867-5309", "Local radio celebrity");
Contact.create( "Sejal", "Patel", "sejal_patel@email.unc.edu", "919-867-5309", "Cousin on Dad's side");
Contact.create( "Darshan", "Mayer-Patel", "darshan_mayer@email.unc.edu", "919-867-5309", "Go Wildcats!");

module.exports = Contact;