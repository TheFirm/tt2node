angular.module('tt2').directive('ttReportEdit', function () {
    return {
        replace: true,
        templateUrl: '/js/app/reportEdit/reportEdit.html',
        controller: function ($http, $scope) {
            /*$scope.projects = [];
            $http.get('/api/projects').success(function (projects, status, headers) {
                $scope.projects = projects;
            });*/
            $scope.addReport = function () {
                $http.post('/api/report', {
                    time_start: $scope.time_start,
                    time_end: $scope.time_end,
                    comment: $scope.comment
                }).success(function (resp) {
                    console.log(resp)
                });
            }
        }
    }
});