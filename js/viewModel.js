document.addEventListener("DOMContentLoaded", function () {
    // Your Knockout.js code here
    function ViewModel() {
      var self = this;
      self.selectedMenuItem = ko.observable('signup');
      self.username = ko.observable("");
      self.password = ko.observable("");
      self.response = ko.observable("");
      self.token = ko.observable("");
      self.videosList = ko.observableArray([]);
      self.videoUrl = ko.observable('');
      self.selectMenuItem = function (item) {
        self.selectedMenuItem(item);
      };

      self.signup = function () {
        var user = {
          username: self.username(),
          password: self.password()
        };
        commonService.signup(user)
          .done(function (response) {
            self.response = ko.observable(response.message)
          })
          .fail(function (error) {
            self.response("Error: " + error.statusText);
          });
      };


      self.login = function () {
        var user = {
          username: self.username(),
          password: self.password()
        };
        commonService.login(user)
          .done(function (response) {
            self.response = ko.observable(response)
            localStorage.setItem('token', response.token);
            self.selectedMenuItem('video')
            self.getVideos()
          })
          .fail(function (error) {
            self.response("Error: " + error.statusText);
          });
      };
      self.getVideos = function () {
        commonService.getVideos().done(function (response) {
          self.videosList(response.videos)
          console.log(self.videosList)
        }).fail(function (error) {
          self.response('Error:' + error.statusText)
        })
      }
      self.handleClick = function (item) {
        console.log('Clicked:', item);
        self.videoUrl(item.url)
      };
      self.init = function () {
        self.getVideos();
      };
    }
    var viewModel = new ViewModel();
    ko.applyBindings(viewModel);
  })