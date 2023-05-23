function CommonService() {
    var self = this;
    self.url = "http://localhost:3000/";
  
    self.signup = function(user) {
      return $.ajax({
        url: self.url + "signup",
        type: "POST",
        data: JSON.stringify(user),
        contentType: "application/json"
      });
    };
  
    self.login = function(user) {
      return $.ajax({
        url: self.url + "login",
        type: "POST",
        data: JSON.stringify(user),
        contentType: "application/json"
      });
    };
  
    self.getVideos = function() {
      var headers = {
        Authorization: "Bearer " + localStorage.getItem("token")
      };
      return $.ajax({
        url: self.url + "api/videos",
        type: "GET",
        headers: headers
      });
    };
  
    self.postVideos = function(body) {
      var headers = {
        Authorization: "Bearer " + localStorage.getItem("token")
      };
      return $.ajax({
        url: self.url + "api/videos",
        type: "POST",
        data: JSON.stringify(body),
        contentType: "application/json",
        headers: headers
      });
    };
  
    self.bookmarkVideosPost = function(id, stamp) {
      var body = {
        timestamp: stamp
      };
      var headers = {
        Authorization: "Bearer " + localStorage.getItem("token")
      };
      return $.ajax({
        url: self.url + "api/videos/bookmarks/" + id,
        type: "POST",
        data: JSON.stringify(body),
        contentType: "application/json",
        headers: headers
      });
    };
  
    self.bookmarkVideos = function(id) {
      var headers = {
        Authorization: "Bearer " + localStorage.getItem("token")
      };
      return $.ajax({
        url: self.url + "api/videos/bookmarks/" + id,
        type: "GET",
        headers: headers
      });
    };
  }
  
  var commonService = new CommonService();
  