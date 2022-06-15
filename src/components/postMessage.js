function postMessage() {
  var response;

  alert("Click Button");
  fetch(
    "https://0gjkyqhhw2.execute-api.us-east-1.amazonaws.com/dev?scope=internal",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((m) => alert(m));

  return;
}

export default postMessage();
