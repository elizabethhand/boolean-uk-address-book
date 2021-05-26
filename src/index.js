const viewSection = document.querySelector(".view-section");
const contactsSection = document.querySelector(".contacts-section");

const state = {
  contacts: [],
  selectedContact: null
};

/* [START] NO NEED TO EDIT */

function getContacts() {
  fetch("http://localhost:3000/contacts")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      state.contacts = data;

      renderContactsList();
    });
}

function renderContactsList() {
  const listEl = document.createElement("ul");
  listEl.className = "contacts-list";

  for (let i = 0; i < state.contacts.length; i++) {
    const contact = state.contacts[i];
    const listItemEl = renderContactListItem(contact);

    listEl.append(listItemEl);
  }

  contactsSection.append(listEl);
}

function renderAddressSection(address) {
  const containerEl = document.createElement("section");

  const headingEl = document.createElement("h2");
  headingEl.innerText = "Address";

  containerEl.append(headingEl);

  const streetText = document.createElement("p");
  streetText.innerText = address.street;

  containerEl.append(streetText);

  const cityText = document.createElement("p");
  cityText.innerText = address.city;

  containerEl.append(cityText);

  const postCodeText = document.createElement("p");
  postCodeText.innerText = address.postCode;

  containerEl.append(postCodeText);

  return containerEl;
}

function renderContactView() {
  const contact = state.selectedContact;

  if (!contact) return;

  viewSection.innerHTML = "";

  const containerEl = document.createElement("article");
  containerEl.className = "center light-shadow address-card";

  const headingEl = document.createElement("h1");

  const fullName = `${contact.firstName} ${contact.lastName}`;
  headingEl.innerText = fullName;

  containerEl.append(headingEl);

  const addressSectionEl = renderAddressSection(contact.address);

  containerEl.append(addressSectionEl);

  viewSection.append(containerEl);
}

/* [END] NO NEED TO EDIT */

function renderContactListItem(contact) {
  const listItemEl = document.createElement("li");

  const headingEl = document.createElement("h3");

  const fullName = `${contact.firstName} ${contact.lastName}`;

  headingEl.innerText = fullName;

  listItemEl.append(headingEl);

  const viewBtn = document.createElement("button");
  viewBtn.className = "button grey";
  viewBtn.innerText = "View";

  viewBtn.addEventListener("click", function () {
    state.selectedContact = contact;

    renderContactView();
  });

  listItemEl.append(viewBtn);

  const editBtn = document.createElement("button");
  editBtn.className = "button blue";
  editBtn.innerText = "Edit";

  editBtn.addEventListener("click", function () {
    state.selectedContact = contact

    renderContactEdit()
  });

  listItemEl.append(editBtn);

  return listItemEl;
}

function renderContactEdit() {
  const contact = state.selectedContact;

  if (!contact) return;


  let form = document.createElement('form')
  form.classList.add("form-stack", "light-shadow", "center", "contact-form")

  let h1 = document.createElement('h1')
  h1.innerText = "Edit Contact"

  let firstNameLabel = document.createElement('label')
  firstNameLabel.setAttribute("for", "first-name-input")
  firstNameLabel.innerText = "First Name:"

  let firstNameInput = document.createElement('input')
  firstNameInput.setAttribute("id", "first-name-input")
  firstNameInput.setAttribute("name", "first-name-input")
  firstNameInput.setAttribute("type", "text")
  firstNameInput.setAttribute("placeholder", contact.firstName)


  let lastNameLabel = document.createElement('label')
  lastNameLabel.setAttribute("for", "last-name-input")
  lastNameLabel.innerText = "Last Name:"

  let lastNameInput = document.createElement('input')
  lastNameInput.setAttribute("id", "last-name-input")
  lastNameInput.setAttribute("name", "last-name-input")
  lastNameInput.setAttribute("type", "text")
  lastNameInput.setAttribute("placeholder", contact.lastName)

  let streetNameLabel = document.createElement('label')
  streetNameLabel.setAttribute("for", "street-input")
  streetNameLabel.innerText = "Street:"

  let streetInput = document.createElement('input')
  streetInput.setAttribute("id", "street-input")
  streetInput.setAttribute("name", "street-input")
  streetInput.setAttribute("type", "text")
  streetInput.setAttribute("placeholder", contact.address.street)

  let cityInputLabel = document.createElement('label')
  cityInputLabel.setAttribute("for", "city-input")
  cityInputLabel.innerText = "City:"

  let cityInput = document.createElement('input')
  cityInput.setAttribute("id", "city-input")
  cityInput.setAttribute("name", "city-input")
  cityInput.setAttribute("type", "text")
  cityInput.setAttribute("placeholder", contact.address.city)

  let postcodeInputLabel = document.createElement('label')
  postcodeInputLabel.setAttribute("for", "postcode-input")
  postcodeInputLabel.innerText = "Postcode:"

  let postcodeInput = document.createElement('input')
  postcodeInput.setAttribute("id", "postcode-input")
  postcodeInput.setAttribute("name", "postcode-input")
  postcodeInput.setAttribute("type", "text")
  postcodeInput.setAttribute("placeholder", contact.address.postCode)

  let checkboxSection = document.createElement('div')
  checkboxSection.setAttribute("class", "checkbox-section")

  let checkbox = document.createElement('input')
  checkbox.setAttribute("id", "block-checkbox")
  checkbox.setAttribute("name", "block-checkbox")
  checkbox.setAttribute("type", "checkbox")

  let checkboxLabel = document.createElement('label')
  checkboxLabel.setAttribute("for", "block-checkbox")
  checkboxLabel.innerText = "Block"

  let actionsSection = document.createElement('div')
  actionsSection.setAttribute("class", "actions-section")

  let submitBtn = document.createElement('button')
  submitBtn.classList.add("button", "blue")
  submitBtn.setAttribute("type", "submit")
  submitBtn.innerText = "Create"

  submitBtn.addEventListener("click", function (event) {
    event.preventDefault()
    selectedContact = contact


    firstName = firstNameInput.value
    lastName = lastNameInput.value
    blockContact = checkbox.value

    editUser(contact, firstName, lastName, blockContact)

  })

  let deleteBtn = document.createElement('button')
  deleteBtn.classList.add("button", "blue")
  deleteBtn.setAttribute("type", "submit")
  deleteBtn.innerText = "Delete"

  viewSection.append(form)
  actionsSection.append(submitBtn, deleteBtn)
  checkboxSection.append(checkbox, checkboxLabel)
  form.append(h1,
    firstNameLabel,
    firstNameInput,
    lastNameLabel,
    lastNameInput,
    streetNameLabel,
    streetInput,
    cityInputLabel,
    cityInput,
    postcodeInputLabel,
    postcodeInput,
    checkboxSection,
    actionsSection)


}
function editUser(contact, firstName, lastName, blockContact) {

  fetch(`http://localhost:3000/contacts/${contact.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "firstName": firstName,
      "lastName": lastName,
      "blockContact": blockContact
    })
  })

    .then(function (response) { return response.json() })
}

function listenNewContactButton() {
  const btn = document.querySelector(".new-contact-btn");

  btn.addEventListener("click", function (event) {
    event.preventDefault()
    createContact()
  });
}

function createContact() {

  let form = document.createElement('form')
  form.classList.add("form-stack", "light-shadow", "center", "contact-form")

  let h1 = document.createElement('h1')
  h1.innerText = " Create Contact"

  let firstNameLabel = document.createElement('label')
  firstNameLabel.setAttribute("for", "first-name-input")
  firstNameLabel.innerText = "First Name:"

  let firstNameInput = document.createElement('input')
  firstNameInput.setAttribute("id", "first-name-input")
  firstNameInput.setAttribute("name", "first-name-input")
  firstNameInput.setAttribute("type", "text")


  let lastNameLabel = document.createElement('label')
  lastNameLabel.setAttribute("for", "last-name-input")
  lastNameLabel.innerText = "Last Name:"

  let lastNameInput = document.createElement('input')
  lastNameInput.setAttribute("id", "last-name-input")
  lastNameInput.setAttribute("name", "last-name-input")
  lastNameInput.setAttribute("type", "text")

  let streetNameLabel = document.createElement('label')
  streetNameLabel.setAttribute("for", "street-input")
  streetNameLabel.innerText = "Street:"

  let streetInput = document.createElement('input')
  streetInput.setAttribute("id", "street-input")
  streetInput.setAttribute("name", "street-input")
  streetInput.setAttribute("type", "text")

  let cityInputLabel = document.createElement('label')
  cityInputLabel.setAttribute("for", "city-input")
  cityInputLabel.innerText = "City:"

  let cityInput = document.createElement('input')
  cityInput.setAttribute("id", "city-input")
  cityInput.setAttribute("name", "city-input")
  cityInput.setAttribute("type", "text")

  let postcodeInputLabel = document.createElement('label')
  postcodeInputLabel.setAttribute("for", "postcode-input")
  postcodeInputLabel.innerText = "Postcode:"

  let postcodeInput = document.createElement('input')
  postcodeInput.setAttribute("id", "postcode-input")
  postcodeInput.setAttribute("name", "postcode-input")
  postcodeInput.setAttribute("type", "text")

  let checkboxSection = document.createElement('div')
  checkboxSection.setAttribute("class", "checkbox-section")

  let checkbox = document.createElement('input')
  checkbox.setAttribute("id", "block-checkbox")
  checkbox.setAttribute("name", "block-checkbox")
  checkbox.setAttribute("type", "checkbox")

  let checkboxLabel = document.createElement('label')
  checkboxLabel.setAttribute("for", "block-checkbox")
  checkboxLabel.innerText = "Block"

  let actionsSection = document.createElement('div')
  actionsSection.setAttribute("class", "actions-section")

  let submitBtn = document.createElement('button')
  submitBtn.classList.add("button", "blue")
  submitBtn.setAttribute("type", "submit")
  submitBtn.innerText = "Create"

  submitBtn.addEventListener("click", function (event) {
    event.preventDefault()

    newAddress = {
      "street": streetInput.value,
      "city": cityInput.value,
      "postCode": postcodeInput.value

    }

    newContact = {
      "firstName": firstNameInput.value,
      "lastName": lastNameInput.value,
      "blockContact": checkbox.value,
      "addressId": null
    }

    state.contacts.push(newAddress)
    state.contacts.push(newContact)

    addUser(newContact, newAddress)
  })

  viewSection.append(form)
  actionsSection.append(submitBtn)
  checkboxSection.append(checkbox, checkboxLabel)
  form.append(h1,
    firstNameLabel,
    firstNameInput,
    lastNameLabel,
    lastNameInput,
    streetNameLabel,
    streetInput,
    cityInputLabel,
    cityInput,
    postcodeInputLabel,
    postcodeInput,
    checkboxSection,
    actionsSection)

  main()


}

function addUser(newContact, newAddress) {

  fetch('http://localhost:3000/addresses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newAddress)
  }).then(function (response) {
    console.log(response)
    return response.json()

  }).then(function (address) {
    newContact.addressId = address.id

    fetch('http://localhost:3000/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newContact)
    })
      .then(function (resp) {
        return resp.json();
      }).then(function (contact) {

      })
  })

}


function main() {

  listenNewContactButton();
  getContacts();
}

main();
