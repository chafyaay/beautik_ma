const url = "http://localhost:4300";

async function API_CALL(params: any) {
  return await fetch(`${url}/${params}`)
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getAllProducts(params: any) {
  const response = await API_CALL(params);
  return response;
}
export async function getProductById(params: any) {
  const response = await API_CALL(params);

  return response[0];
}

export async function getData() {
  const response = await fetch(`${url}/products`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstParam: "yourValue",
      secondParam: "yourOtherValue",
    }),
  })
    .then((data) => data)
    .catch((err) => err);
  return response;
}
