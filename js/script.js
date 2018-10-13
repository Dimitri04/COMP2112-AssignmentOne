// Variable Declarations
const main = document.querySelector("#list");
const container = document.querySelector("#main");
const compose = document.querySelector("#compose");
const inbox = document.querySelector("#inbox");
const del = document.querySelector("#delete");
const trash = document.querySelector("#trash");
const email_count = document.querySelector(".email-count");
const trash_count = document.querySelector(".trash-count");
let local_inbox = localStorage.getItem("emails");
let local_trash = localStorage.getItem("trash");
let email_list;
let trash_list = [];
let recoverPressed = false;

// Get data from api is local storage is null/empty
if (local_inbox == null) {
  //   console.log("Fetching API data");
  fetch("https://my.api.mockaroo.com/emails.json?key=c03bce70&qty=10")
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      email_list = myJson;
      init(email_list);
      localStorage.setItem("emails", JSON.stringify(email_list));
    });
} else {
  // Parse local storage and and assign content to variable
  //   console.log("Fetching local data");
  email_list = JSON.parse(local_inbox);
  trash_list = JSON.parse(local_trash);
  init(email_list);
}

// Render eamils in both trash and inbox
function init(list) {
  // console.log(list);
  const snippet = list
    .map(
      (profile, index) =>
        `
        <div class="email-item pure-g ${
          profile.selected ? "email-item-selected" : ""
        }">
            <div class="pure-u">
                <img width="64" height="64" alt="Tilo Mitra&#x27;s avatar" class="email-avatar" src="${
                  list[index].avatar
                }">
            </div>
            <div class="pure-u-3-4">
                <h5 class="email-name">${list[index].first_name} ${
          list[index].last_name
        }</h5>
                <h4 class="email-subject">${list[index].slogan}</h4>
                <p class="email-desc">
                    ${list[index].para}
                </p>
            </div>
        </div>
    `
    )
    .join("");

  main.innerHTML = snippet;
  customAttribute();
  email_count.textContent = emailCount(email_list);
  trash_count.textContent = emailCount(trash_list);

  //   Display email contents on far right of screen
  const mail = [...document.querySelectorAll("[data-myid]")];
  mail.map((x, index) => {
    x.addEventListener("click", function(event) {
      event.preventDefault();
      const email_title = document.querySelector(".email-content-title");
      const email_subtitle_user = document.querySelector(
        ".email-content-subtitle a"
      );
      const email_date = document.querySelector(".email-content-subtitle span");
      const email_content = document.querySelector(".email-content-body");

      email_title.textContent = list[this.dataset.myid].slogan;
      email_subtitle_user.textContent = `${
        list[this.dataset.myid].first_name
      } ${list[this.dataset.myid].last_name}`;
      email_date.textContent = `${list[this.dataset.myid].time}, ${
        list[this.dataset.myid].date
      }`;
      email_content.innerHTML = `<p>${list[this.dataset.myid].para}</p>`;
    });
  });
  //   Applies selected property to email object
  mail.map((email, val) => {
    email.addEventListener("click", function() {
      list.map(x => (x.selected = false));
      list[this.dataset.myid].selected = true;
      init(list);
    });
  });
}

// EventListeners
inbox.addEventListener("click", showInbox);
del.addEventListener("click", deleteEmail);
trash.addEventListener("click", showTrash);
compose.addEventListener("click", composeEmail);

// This function deletes emails from the inbox and places them in the trash
function deleteEmail() {
  email_list.map((mail, index) => {
    mail.selected == true ? (mail.deleted = true) : (mail.deleted = false);
  });
  const newTrash = email_list.filter(y => y.deleted == true);
  trash_list.unshift(...newTrash);
  localStorage.setItem("trash", JSON.stringify(trash_list));
  email_list = email_list.filter(x => x.selected == false);
  localStorage.setItem("emails", JSON.stringify(email_list));
//   trash_count.textContent = emailCount(trash_list);
  init(email_list);
}

// This function shows the emails in the trash
function showTrash() {
    recoverPressed = true;
  //   console.log("Trash");
  del.removeEventListener("click", deleteEmail);
  //   console.log("Delete handle Removed");
  local_trash = localStorage.getItem("trash");
  trash_list = JSON.parse(local_trash);
  trash_list.map(p => (p.selected = false));
  del.textContent = "Recover";
  del.setAttribute("id", "recover");
  del.classList.remove("danger-button");
  del.classList.add("recover-button");
  const recover = document.querySelector("#recover");
  recover.addEventListener("click", recoverEmail);
  //   console.log("Recover handle Added");
  init(trash_list);
}

// This function recovers emails from the trash and places them in the inbox
function recoverEmail() {
  //   console.log("Email Recovered");
  trash_list.map(mail => {
    mail.selected == true ? (mail.deleted = false) : (mail.deleted = true);
  });
  const recoverTrash = trash_list.filter(y => y.deleted == false);
  email_list.unshift(...recoverTrash);
  trash_list = trash_list.filter(x => x.deleted == true);
  localStorage.setItem("trash", JSON.stringify(trash_list));
  email_list.map(p => (p.selected = false));
  localStorage.setItem("emails", JSON.stringify(email_list));
//   trash_count.textContent = emailCount(trash_list);
  init(trash_list);
}

// This function shows the emails in the inbox
function showInbox() {
    recoverPressed = false;
  //   console.log("Inbox Selected");
  recover.removeEventListener("click", recoverEmail);
  del.textContent = "Delete";
  del.setAttribute("id", "danger");
  del.classList.remove("recover-button");
  del.classList.add("danger-button");
  del.addEventListener("click", deleteEmail);
  //   console.log("Delete handle Added");
  init(email_list);
}

// This function assigns a custom data attribute to the element selected by the query selector
function customAttribute() {
  const username = [...document.querySelectorAll(".email-item")];
  username.map((a, index) => a.setAttribute("data-myid", index));
}

// This function displays a form that allows the user to compose an email that is displayed in the inbox
function composeEmail() {
  //   console.log("compose email");
  const form_snippet = `
  <section>
  <form methood="post" class="pure-form pure-form-aligned">
      <fieldset>
          <div class="pure-control-group">
            <label class="label">First Name</label>
            <input class="input" type="text" placeholder="First Name"  name="first_name">
          </div>
          <div class="pure-control-group">
              <label class="label">Last Name</label>
              <input class="input" type="text" placeholder="Last Name"  name="last_name">
          </div>
          <div class="pure-control-group">
              <label for="email">Email Address</label>
              <input class="input" type="email" placeholder="Email input"  name="email_address">
          </div>
          <div class="pure-control-group">
            <label class="label">Topic</label>
            <input id="topic" type="text" name="topic placeholder="Enter something here...">
          </div>
          <div class="pure-control-group">
            <label class="label">Message</label>
            <textarea class="textarea" placeholder="Textarea" name="msg" id="msg"></textarea>
          </div>
          <div class="pure-controls">
              <button type="submit" class="pure-button pure-button-primary">Submit</button>
          </div>
      </fieldset>
  </form>
  </section>`;
  container.innerHTML = form_snippet;
  const form = document.querySelector("form");

  //   retrieve form informaiton, store in in an object and push it to the email list
  form.addEventListener("submit", function(e) {
    // console.log("Submit clicked");
    const newEmail = {
      first_name: this.first_name.value,
      last_name: this.last_name.value,
      email: this.email_address.value,
      slogan: this.topic.value,
      time: "3:42 AM",
      date: "10/7/2017",
      para: this.msg.value,
      avatar: "https://avatars1.githubusercontent.com/u/33965210?v=4"
    };
    email_list.unshift(newEmail);
    email_list.map(x => (x.selected = false));
    localStorage.setItem("emails", JSON.stringify(email_list));
    init(email_list);
  });
}

function emailCount(list) {
  const count = `(${list.length})`;
//   console.log(count);
  return count;
}

document.addEventListener('keydown', (event) => {
    let keyPressed = event.which || event.keyCode;
    if (keyPressed == "8") {
        if (recoverPressed == false) {
            // Delete selected email with delete key press
            deleteEmail();
        }
        else {
            // Recover selected email with delete key press
            recoverEmail();
        }
    }
});

