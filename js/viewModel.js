document.addEventListener("DOMContentLoaded", () => {
  // Your Knockout.js code here
  class ViewModel {
    constructor() {
      this.selectedMenuItem = ko.observable('signup');
      this.username = ko.observable("");
      this.password = ko.observable("");
      this.response = ko.observable("");
      this.token = ko.observable("");
      this.videosList = ko.observableArray([]);
      this.videoUrl = ko.observable('');
    }

    selectMenuItem = (item) => {
      this.selectedMenuItem(item);
    };

    signup = () => {
      const user = {
        username: this.username(),
        password: this.password()
      };
      commonService.signup(user)
        .done((response) => {
          this.response = ko.observable(response.message);
        })
        .fail((error) => {
          this.response("Error: " + error.statusText);
        });
    };

    login = () => {
      const user = {
        username: this.username(),
        password: this.password()
      };
      commonService.login(user)
        .done((response) => {
          this.response = ko.observable(response);
          localStorage.setItem('token', response.token);
          this.selectedMenuItem('video');
          this.getVideos();
        })
        .fail((error) => {
          this.response("Error: " + error.statusText);
        });
    };

    getVideos = () => {
      commonService.getVideos()
        .done((response) => {
          this.videosList(response.videos);
          console.log(this.videosList);
        })
        .fail((error) => {
          this.response('Error:' + error.statusText);
        });
    };

    handleClick = (item) => {
      console.log('Clicked:', item);
      this.videoUrl(item.url);
    };

    init = () => {
      this.getVideos();
    };
  }

  const viewModel = new ViewModel();
  ko.applyBindings(viewModel);
});
