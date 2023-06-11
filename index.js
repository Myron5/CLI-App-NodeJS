const argv = require("yargs").argv;
const ContactsAPI = require("./contacts.js");

// ---------------- INVOKE ACTION ----------------

async function invokeAction({ action, id, name, email, phone }) {
  const contactsAPI = new ContactsAPI();

  switch (action) {
    case "list":
      console.log(await contactsAPI.listContacts());
      break;

    case "get":
      if (!id) {
        console.log(`Missed id to get!`);
        break;
      }
      console.log(await contactsAPI.getContactById(id));
      break;

    case "remove":
      if (!id) {
        console.log(`Missed id to remove!`);
        break;
      }
      console.log(await contactsAPI.removeContact(id));
      break;

    case "add":
      if (!name || !email || !phone) {
        const nameStr = !name ? "name" : "";
        const emailStr = !email ? "email" : "";
        const phoneStr = !name ? "phone" : "";
        console.log(`There is no [${nameStr} ${emailStr} ${phoneStr}] to add!`);
        break;
      }
      console.log(await contactsAPI.addContact(name, email, phone));
      break;

    default:
      console.log("Unknown action type!");
  }
}

invokeAction(argv);
