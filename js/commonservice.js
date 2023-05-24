class CommonService {
  constructor() {
    this.url = "http://localhost:3000/";
  }

  signup(user) {
    return $.ajax({
      url: this.url + "signup",
      type: "POST",
      data: JSON.stringify(user),
      contentType: "application/json"
    });
  }

  login(user) {
    return $.ajax({
      url: this.url + "login",
      type: "POST",
      data: JSON.stringify(user),
      contentType: "application/json"
    });
  }

  getVideos() {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    return $.ajax({
      url: this.url + "api/videos",
      type: "GET",
      headers: headers
    });
  }

  postVideos(body) {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    return $.ajax({
      url: this.url + "api/videos",
      type: "POST",
      data: JSON.stringify(body),
      contentType: "application/json",
      headers: headers
    });
  }

  bookmarkVideosPost(id, stamp) {
    const body = {
      timestamp: stamp
    };
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    return $.ajax({
      url: this.url + "api/videos/bookmarks/" + id,
      type: "POST",
      data: JSON.stringify(body),
      contentType: "application/json",
      headers: headers
    });
  }

  bookmarkVideos(id) {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    return $.ajax({
      url: this.url + "api/videos/bookmarks/" + id,
      type: "GET",
      headers: headers
    });
  }
}

const commonService = new CommonService();
