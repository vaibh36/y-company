let baseUrl = "https://fakestoreapi.com";

async function getServiceResponse(path) {
  const res = await fetch(`${baseUrl}/${path}`);
  const data = await res.json();
  return data;
}

export default getServiceResponse;
