const fs = require("fs").promises;
const path = require("path");
const randomUUID = require("crypto").randomUUID;

class ContactsAPI {
  constructor() {
    this.contactsPath = path.join(__dirname, "db", "contacts.json");
  }

  // ---------------- GET ALL ----------------
  async listContacts() {
    try {
      const result = JSON.parse(await fs.readFile(this.contactsPath, "utf-8"));
      if (!result) throw new Error("Contacts wasn't found");
      return result;
    } catch (err) {
      console.log(err.message);
    }
  }

  // ---------------- GET ONE ----------------
  async getContactById(contactId) {
    try {
      const contacts = await this.listContacts();

      const contact = contacts.find((contact) => contact.id === contactId);
      if (!contact) throw new Error("There is no such contact");

      return contact;
    } catch (err) {
      console.log(err.message);
    }
  }

  // ---------------- DELETE ----------------
  async removeContact(contactId) {
    try {
      const contacts = await this.listContacts();

      const index = contacts.findIndex((contact) => contact.id === contactId);
      if (index === -1) throw new Error("There is no such contact");
      const [delContact] = contacts.splice(index, 1);

      await fs.writeFile(this.contactsPath, JSON.stringify(contacts));

      return delContact;
    } catch (err) {
      console.log(err.message);
    }
  }

  // ---------------- ADD ----------------
  async addContact(name, email, phone) {
    try {
      const contacts = await this.listContacts();

      const id = randomUUID();
      const newContact = { id, name, email, phone };
      contacts.push(newContact);

      await fs.writeFile(this.contactsPath, JSON.stringify(contacts));

      return newContact;
    } catch (err) {
      console.log(err.message);
    }
  }
}

module.exports = ContactsAPI;
