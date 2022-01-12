"use strict";

const form = document.getElementById("my-form");
const formStatus = document.querySelector(".form-status");

async function handleSubmit(event) {
  event.preventDefault();
  const status = document.getElementById("my-form-status");
  const data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      formStatus.classList.remove("form-status-error");
      formStatus.classList.add("form-status-success");
      status.innerHTML = "Message Sent Succesfully!";
      form.reset();
    })
    .catch((error) => {
      formStatus.classList.remove("form-status-success");
      formStatus.classList.add("form-status-error");
      status.innerHTML = "Oops! There was a problem submitting your form";
    });
}

form.addEventListener("submit", handleSubmit);
