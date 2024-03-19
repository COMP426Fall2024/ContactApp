export class Contact {

    #id
    #first
    #last
    #email
    #phone
    #notes

    #dirty

    // Never use the constructor directly. Always need to use
    // the async factory method. Since we are most often creating
    // the object from a json object returned from server, we wrote
    // the constructor to expect object state to be given as such.

    constructor(obj_json) {
        this.#id = obj_json.id;
        this.#first = obj_json.first;
        this.#last = obj_json.last;
        this.#email = obj_json.email;
        this.#phone = obj_json.phone;
        this.#notes = obj_json.notes;
        this.#dirty = false;
    }

    // update writes the current state of the object back to the
    // server. Should be called after one or more of the object fields are
    // changed. 

    async update() {
        // If not dirty, don't do anything.
        if (!this.#dirty) {
            return;
        }

        let data_string = JSON.stringify({
            first: this.#first,
            last: this.#last,
            email: this.#email,
            phone: this.#phone,
            notes: this.#notes
        });

        let response = await fetch("http://localhost:3000/contacts/" + this.id,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data_string
            });

        let response_json = await response.json();
        // Update local structure with current state from server.
        // Shouldn't really need to do this if things actually worked but 
        // can't hurt.

        this.#id = response_json.id;
        this.#first = response_json.first;
        this.#last = response_json.last;
        this.#email = response_json.email;
        this.#phone = response_json.phone;
        this.#notes = response_json.notes;

        this.#dirty = false;
        // Return object now updated.
        return this;
    }

    get id() { return this.#id }
    get first() { return this.#first }
    get last() { return this.#last }
    get email() { return this.#email }
    get phone() { return this.#phone }
    get notes() { return this.#notes }

    set id(val) { this.#id = val; this.#dirty = true;}
    set first(val) { this.#first = val; this.#dirty = true;}
    set last(val) { this.#last = val; this.#dirty = true;}
    set email(val) { this.#email = val; this.#dirty = true;}
    set phone(val) { this.#phone = val; this.#dirty = true;}
    set notes(val) { this.#notes = val; this.#dirty = true;}

    // Retrieves array of all contact ids

    static async findAll() {
        let response = await fetch("http://localhost:3000/contacts/");
        let response_json = await response.json();
        return response_json;
    }

    // Retrieves Contact object given id

    static async find(id) {
        try {
            let response = await fetch("http://localhost:3000/contacts/" + id);

            return new Contact(await response.json());
        } catch {
            throw "No contact with id: " + id;
        }
    }

    // Creates new contact

    static async create(first, last, email, phone, notes) {
        let data_string = JSON.stringify({
            first: first,
            last: last,
            email: email,
            phone: phone,
            notes: notes
        });

        let response = await fetch("http://localhost:3000/contacts",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data_string
            });

        return new Contact(await response.json());
    }

}