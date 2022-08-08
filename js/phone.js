function api_success(response) {
  let chosen_model_phone = document.getElementById(`chosen_model_phone`);
  let phone_img = document.getElementById(`phone_img`);
  chosen_model_phone[`innerHTML`] = `<h2>Brand: ${response[`data`][`data`][`brand`]} </h2>
                                    <h3>Model: ${response[`data`][`data`][`phone_name`]}</h3>
                                    <p>Operation System: ${response[`data`][`data`][`os`]}</p>
`;

  for (let i = 0; i < response[`data`][`data`][`phone_images`].length; i++) {
    phone_img[`innerHTML`] += `<img src="${response[`data`][`data`][`phone_images`][i]}">`;
  }
}

function api_failure(error) {
  alert(`reload the page`);
}

let api_detail = Cookies.get(`detail_API`);

axios
  .request({
    url: api_detail,
  })
  .then(api_success)
  .catch(api_failure);
