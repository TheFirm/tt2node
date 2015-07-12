angular.module('tt2').directive('ttReportEdit', function () {
    return {
        replace: true,
        templateUrl: 'js/app/reportEdit/reportEdit.html',
        controller: function ($http, $scope) {
            $scope.projects = [];
            $http.get('api/projects').success(function (projects, status, headers) {
                $scope.projects = projects;
            });
        }
    }
});