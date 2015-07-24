describe("Report edit directive test", function () {

    beforeEach(module('tt2'));
    beforeEach(module('templates'));
    var scope, element, $httpBackend, controller, projectsRequestHandler;

    beforeEach(inject(function(  $rootScope, $compile, $injector){


        $httpBackend = $injector.get('$httpBackend');
        projectsRequestHandler = $httpBackend.when('GET', '/api/project/list')
            .respond([{"id":2,"name":"Rogahn and Daughters"},{"id":3,"name":"McGlynn-Zemlak"}]);

        scope = $rootScope.$new();

        element = angular.element("<tt-report-edit></tt-report-edit>");

        $compile(element)(scope);
        template = $compile(element)(scope);
        scope.$digest();
        $httpBackend.flush();
        controller = element.controller;
    }));

    afterEach(function() {
        //$httpBackend.verifyNoOutstandingExpectation ();
        $httpBackend.verifyNoOutstandingRequest ();
    });

    it('check if directives scope init', inject(function () {
        expect(scope).not.toBe(null);
    }));
    it('should projects to be not empty', inject(function () {
        $httpBackend.expectGET('/api/project/list');
        expect(scope.projects.length).not.toBe(0);
    }));
    it('should have good validation patterns', inject(function () {
        it('should date be valid', inject(function () {
            scope.date_report = '2014-09-15';
            expect(scope.date_report).toMatch(/^20(\d{2})(-\d{1,2}){2}$/);
        }));
        it('should time be valid', inject(function () {
            scope.time_start = '08:08:19';
            expect(scope.time_start).toMatch(/^\d{2}:\d{2}(:\d{2})?$/);
        }));
    }));
    it('should parse string period to milliseconds', function () {
        scope.periodString = '1d 1h 10m 10s';
        scope.parsePeriod();
        var res = ( 3600*24 + 3600 + 600 + 10 ) * 1000;
        expect(scope.period).toEqual( res);
    })
});