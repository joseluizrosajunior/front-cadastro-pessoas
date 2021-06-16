export default SourceService;

SourceService.$inject = ['$http'];

function SourceService ($http) {
    var service = this;

    var URL = 'http://localhost:8080/source';

    service.findAll = findAll;

    return service;

    function findAll () {
        return $http.get(URL);
    }
}