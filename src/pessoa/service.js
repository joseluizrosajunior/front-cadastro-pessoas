export default PessoaService;

PessoaService.$inject = ['$http'];

function PessoaService ($http) {
    var service = this;

    var URL_PESSOAS = 'http://localhost:8080/pessoas';
    var URL_MUNICIPIOS = 'http://localhost:8080/municipios';
    var URL_PAISES = 'http://localhost:8080/paises';

    service.findAll = function (offset, filterValue) {
        var filter = '';
        if (filterValue) {
            filter = `nome=${filterValue}&cpf=${filterValue}`
        }
        return $http.get(URL_PESSOAS + `?page=${((offset || 1)-1)}&${filter}`)
            .then(function(response) {
                return response.data;
            });
    }

    service.findOne = function (id) {
        return $http.get(URL_PESSOAS + '/' + id)
            .then(function(response) {
                return response.data;
            });
    }

    service.insert = function (pessoa) {
        return $http.post(URL_PESSOAS, pessoa)
            .then(function(response) {
                return response.data;
            });
    }

    service.update = function (pessoa) {
        return $http.put(URL_PESSOAS + '/' + pessoa.id, pessoa)
            .then(function(response) {
                return response.data;
            });
    }

    service.remove = function (id) {
        return $http.delete(URL_PESSOAS + '/' + id);
    }

    service.findAllNaturalidade = function(uf) {
        return $http.get(URL_MUNICIPIOS + '?uf=' + uf);
    }

    service.findAllNacionalidade = function() {
        return $http.get(URL_PAISES);
    }

    return service;
}