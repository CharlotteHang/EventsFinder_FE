const transactionLink = "http://demo6860210.mockable.io/transactions";
const accountLink = "http://demo6860210.mockable.io/accounts";
const categoryLink = "http://demo6860210.mockable.io/categories";

export function getTransactions(): Promise<any> {
  return fetchAPI(transactionLink, "GET", null);
}

export function getAccounts(): Promise<any> {
  return fetchAPI(accountLink, "GET", null);
}

export function getCategories(): Promise<any> {
  return fetchAPI(categoryLink, "GET", null);
}

// cross-domain request: FE BE different domains

const baskLink = "http://localhost:8080/";
const IP_LINK = "https://ipinfo.io/?token=5d5586edbfff4b"; //over the limit
const SEARCH_LINK = baskLink + "search-nearby?"; //backend *
const FAVOURITE_LINK = baskLink + "favouriteItems";
const RECOMMENDATIONS_LINK = baskLink + "RecommendationsByLocation?";
const LOGIN_LINK = baskLink + "userlogin?";
const CHECK_LOGIN_LINK = baskLink + "userlogin";
const SIGNUP_LINK = baskLink + "usersignup?"; // don't add / here or it will be //
const LOGOUT_LINK = baskLink + "usersignout";

async function fetchAPI(link: string, method: string, body: any): Promise<any> {
  let headers = new Headers();
  //CORS problem

  // headers.append("Access-Control-Allow-Origin", "*");
  // headers.append("Access-Control-Allow-Credentials", "true");
  headers.append("Content-Type", "application/json");
  // headers.append(
  //   "Access-Control-Allow-Headers",
  //   "Content-Type,X-Requested-With"
  // );
  // headers.append("Access-Control-Allow-Methods", "*");

  if (link === IP_LINK) {
    const res = await fetch(link, {
      mode: "cors",
      method: method,
      body: body
      // headers: headers
    });
    return res.json();
  } else {
    const res = await fetch(link, {
      mode: "cors",
      credentials: "include",
      method: method,
      body: body,
      headers: headers
    });
    return res.json();
  }
}

export function getLocation(): Promise<any> {
  return fetchAPI(IP_LINK, "GET", null);
}

export function getEventsByLocation(
  lat: string,
  lon: string,
  term: string
): Promise<any> {
  return fetchAPI(
    SEARCH_LINK + `lat=${lat}&lon=${lon}&term=${term}`,
    "GET",
    null
  );
}

export function getRecommendations(
  lat: string,
  lon: string,
  term: string
): Promise<any> {
  return fetchAPI(
    RECOMMENDATIONS_LINK + `lat=${lat}&lon=${lon}&term=${term}`,
    "GET",
    null
  );
} 

export function getFavouriteItems(): Promise<any> {
  return fetchAPI(FAVOURITE_LINK, "GET", null);
}

export function setFavouriteItems(
  addFavouriteItem: boolean,
  itemId: string
): Promise<any> {
  const body = JSON.stringify({ itemId: itemId, likeItem: addFavouriteItem});
  // put password in the request?? of POST
  return fetchAPI(FAVOURITE_LINK, "POST", body)
}

export function login(userId: string, password: string): Promise<any> {
  const body = JSON.stringify({ email: userId, password: password });
  return fetchAPI(
    LOGIN_LINK,
    "POST",
    body
  );
}

export function getLoginState(): Promise<any> {
  return fetchAPI(
    CHECK_LOGIN_LINK,
    "GET",
    null
  );
}

export function logout(): Promise<any> {
  console.log("logout")
  return fetchAPI(LOGOUT_LINK, "POST", null);
}
//304 c0de

export function signup(
  userId: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<any> {
  const body = JSON.stringify({
    email: userId,
    password: password,
    firstName: firstName,
    lastName: lastName
  });
  // put password in the request?? of POST 0511
  return fetchAPI(SIGNUP_LINK, "POST", body);
}
