export class ContactView {

    constructor(contact, parentDiv, startInEdit) {
        this.contact = contact;
        this.parentDiv = parentDiv;
        if (!startInEdit) {
            this.curDiv = this.createViewDiv();
        } else {
            this.curDiv = this.createEditDiv();
        }
        this.parentDiv.append(this.curDiv);
    }

    createViewDiv() {
        let view_div = document.createElement('div');
        view_div.classList.add('card');
        view_div.innerHTML = `
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                        <img src="https://www.cs.unc.edu/~kmp/kmp-in-namibia.jpg" alt="Placeholder image">
                        </figure>
                        <span class="edit_contact"><i class="fas fa-edit"></i></span>
                        <span class="delete_contact"><i class="fas fa-trash-alt"></i></span>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">${this.contact.first} ${this.contact.last}</p>
                        <p class="subtitle is-6">${this.contact.email}<br>
                        ${this.contact.phone}</p>
                    </div>
                </div>
            <div class="content">
            ${this.contact.notes}
            </div>
        `;

        let del_contact_btn = view_div.querySelector('.delete_contact');
        del_contact_btn.addEventListener('click', async (e) => {
            await fetch("http://localhost:3000/contacts/"+this.contact.id, {method: "DELETE"});
            this.curDiv.remove();
        });

        let edit_contact_btn = view_div.querySelector('.edit_contact');
        edit_contact_btn.addEventListener('click', (e) => {
            let edit_div = this.createEditDiv();
            this.curDiv.replaceWith(edit_div);
            this.curDiv = edit_div;
        });

        return view_div;
    }

    createEditDiv() {
        let edit_div = document.createElement('div');
        edit_div.classList.add('card');
        edit_div.innerHTML = `
        <div class="card">
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                        <img src="https://www.cs.unc.edu/~kmp/kmp-in-namibia.jpg" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <form>
                            <label>First: <input name="first" type="text" value="${this.contact.first}"></label><br>
                            <label>Last: <input name="last" type="text" value="${this.contact.last}"></label><br>
                            <label>Email: <input name="email" type="text" value="${this.contact.email}"></label><br>
                            <label>Phone: <input name="phone" type="text" value="${this.contact.phone}"></label><br>
                            <label>Notes: <textarea name="notes">${this.contact.notes}</textarea></label><br>
                            <button type="submit" class="button is-success is-small">Update</button>
                        </form>
                    </div>
                </div>
        </div>
        `;

        edit_div.querySelector("form").addEventListener('submit', async (e) => {
            e.preventDefault();
            this.contact.first = edit_div.querySelector(".media-content input[name='first']").value;
            this.contact.last = edit_div.querySelector(".media-content input[name='last']").value;
            this.contact.email = edit_div.querySelector(".media-content input[name='email']").value;
            this.contact.phone = edit_div.querySelector(".media-content input[name='phone']").value;
            this.contact.notes = edit_div.querySelector(".media-content textarea[name='notes']").value;
            this.contact = await this.contact.update();
            let new_view_div = this.createViewDiv();
            this.curDiv.replaceWith(new_view_div);
            this.curDiv = new_view_div;
        });

        return edit_div;
    }
}