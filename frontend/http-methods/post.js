// POST
async function postData(tD) {
    const response = await fetch("http://127.0.0.1:3000/travel-destination", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tD),
    });
    return response;
}

// POST (sign up user)
async function postSignupUserData(user) {
  const response = await fetch("http://127.0.0.1:3000/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user),
  });
  return response;
}

// POST (login user)
async function postLoginUserData(user) {
  const response = await fetch("http://127.0.0.1:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user),
  });
  const body = await response.json();
  return body;
}