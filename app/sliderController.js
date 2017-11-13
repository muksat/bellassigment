var app = angular.module('sliderModule', ['ngAnimate', 'angular-flexslider']);


app.controller('SliderController', function($scope, apiService) {
    $scope.title = 'Slider Animation';
    $scope.perPage = 64;
    $scope.currentPage = 1;

    apiService.getSlideList().then(function (response) {
        console.log(response);
        $scope.slides = response;
    });

    $scope.slideshowEnd = function(slider) {
        $scope.currentPage = $scope.currentPage + 1;
        console.log("loading page: ", $scope.currentPage);

        apiService.getSlideList($scope.perPage, $scope.currentPage).then(function (response) {
            response.forEach(function (element) {
                $scope.slides.push(element);
            });
        });
    }

    $scope.articleList = [];
    apiService.getArticleList($scope.perPage, $scope.currentPage).then(function (response) {
        $scope.articleList = response;
    });
});

app.service('apiService', ['$http', function ($http) {
    var url = 'https://www.ctv.ca/api/curatedfilter/byfilter/3c4d81e6-45f1-4b90-8728-2c93583d6b36/';
    var videoUrl = "https://capi.9c9media.com/destinations/ctv_web/platforms/desktop/collections/88/contents?$include=%5bEpisode,Media.Id,Season,ItemsType,Items.ID,Images,Type,ShortDesc,Media.Name,Season,Episode,Genres%5d&$inlinecount=true&$page=1&$top=100&type=episode";

    this.getSlideList = getSlideList;
    this.getArticleList = getArticleList;

    function getSlideList() {
        return $http.get(videoUrl).then(function (response){
            return response.data.Items;
        });
    }

    function getArticleList(perPage, currentPage) {
        return $http.get(url + currentPage + '/' + perPage).then(function (response){
            return response.data.Items;
        });
    }

    function prepareSlideImage (result) {
        var res = [];
        result.forEach(function (element) {
            res.push(element.ThumbnailUrl);
        });
        return res;
    }

    return this;
}]);




