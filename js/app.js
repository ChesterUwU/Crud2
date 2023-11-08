document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const contactList = document.getElementById("contact-list");
  const contactModal = document.getElementById("contact-modal");
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  function displayContacts() {
      contactList.innerHTML = "";
      contacts.forEach((contact, index) => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `
              <button class="delete" data-index="${index}">Eliminar</button>
              <strong>${contact.name}</strong>
              <p>Teléfono: ${contact.phone}</p>
              <p>Email: ${contact.email}</p>
              <button class="edit" data-index="${index}">Editar</button>`;
          contactList.appendChild(listItem);
      });

      const editButtons = document.querySelectorAll(".edit");
      const deleteButtons = document.querySelectorAll(".delete");

      editButtons.forEach((button) => {
          button.addEventListener("click", (event) => {
              const index = event.target.dataset.index;
              openEditModal(contacts[index], index);
          });
      });

      deleteButtons.forEach((button) => {
          button.addEventListener("click", (event) => {
              const index = event.target.dataset.index;
              contacts.splice(index, 1);
              localStorage.setItem("contacts", JSON.stringify(contacts));
              displayContacts();
          });
      });
  }

  function openEditModal(contact, index) {
      document.getElementById("name").value = contact.name;
      document.getElementById("phone").value = contact.phone;
      document.getElementById("email").value = contact.email;
      const contactIndexInput = document.createElement("input");
      contactIndexInput.type = "hidden";
      contactIndexInput.id = "contact-index";
      contactIndexInput.value = index;
      contactForm.appendChild(contactIndexInput);
      contactModal.style.display = "block";
  }

  function closeEditModal() {
      document.getElementById("contact-index").remove();
      contactForm.reset();
      contactModal.style.display = "none";
  }

  displayContacts();

  contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const email = document.getElementById("email").value;
      const contactIndex = document.getElementById("contact-index");

      if (name && phone && email) {
          if (contactIndex) {
              const index = contactIndex.value;
              contacts[index] = new Contact(name, phone, email);
          } else {
              contacts.push(new Contact(name, phone, email));
          }

          localStorage.setItem("contacts", JSON.stringify(contacts));
          closeEditModal();
          displayContacts();
      }
  });
});
