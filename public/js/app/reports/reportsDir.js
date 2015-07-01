angular.module('tt2').directive('ttReports', function () {
    return {
        replace: true,
        templateUrl: 'js/app/reports/reports.html',
        controller: function ($http, $scope) {
            $scope.currentPage = 1;
            $scope.totalItems = 10;
            $scope.reports = [];

            //todo move to service
            var getReports = function () {
                $http.get('api/report', {params:{page: $scope.currentPage}}).success(function (reports, status, headers) {
                    reports.forEach(function (report) {
                        report.create_at = moment(report.create_at).format("DD.MM.YYYY");
                        report.date_report = moment(report.date_report).format("DD.MM.YYYY");
                    });
                    $scope.reports = reports;

                    var hders = headers();
                    $scope.totalItems = hders.totalcount;
                });
            };

            getReports();


            $scope.pageChanged = function () {
                getReports();
            };


        }
    }
});