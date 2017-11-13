angular.module('sliderModule', ['ngAnimate']).service('apiService', ['$http', function ($http) {

    this.getSlideList = getSlideList;

    function getSlideList() {
        alert('hello');
    }

    return this;
}]);