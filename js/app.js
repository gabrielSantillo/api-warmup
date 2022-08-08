let phone_section = document.getElementById(`phone_options`);
function post_success(response) {
  for (let i = 0; i < response[`data`][`data`].length; i++) {
    phone_section.insertAdjacentHTML(
      `beforeend`,
      `
    <button api_url="${
      response[`data`][`data`][i][`detail`]
    }" class="brand_button">
    ${response[`data`][`data`][i][`brand_name`]}
    </button>
    `
    );
  }

  let brand_buttons = document.getElementsByClassName(`brand_button`);
  for (let i = 0; i < brand_buttons.length; i++) {
    brand_buttons[i].addEventListener(`click`, request_details);
  }
}

function post_failure(error) {
  alert(`reload the page`);
}

axios
  .request({
    url: `https://api-mobilespecs.azharimm.site/v2/brands/`,
  })
  .then(post_success)
  .catch(post_failure);

function details_success(response) {
  let phone_pictures = document.getElementById(`phone_pictures`);
  phone_pictures[`innerHTML`] = ``;
  for (let i = 0; i < response[`data`][`data`][`phones`].length; i++) {
    phone_pictures[`innerHTML`] += `<h3>${response[`data`][`data`][`phones`][i][`phone_name`]}</h3>
    <img detail="${response[`data`][`data`][`phones`][i][`detail`]}"
     class="img_phone_buttons"  src="${response[`data`][`data`][`phones`][i][`image`]}">
    `;
  }

  let img = document.getElementsByClassName(`img_phone_buttons`);
  for(let i = 0; i < img.length; i++) {
    img[i].addEventListener(`click`, save_api_as_cookie);
  }
}

function save_api_as_cookie(details) {
    let detail_API = details[`target`].getAttribute(`detail`);
    Cookies.set(`detail_API`, detail_API);
    location.href = `phone.html`
}

function details_failure(error) {
  alert(`error when trying to show the phones`);
}

function request_details(details) {
  let api_url = details[`target`].getAttribute(`api_url`);
  axios
    .request({
      url: api_url,
    })
    .then(details_success)
    .catch(details_failure);
}
