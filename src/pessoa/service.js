export default PessoaService;

PessoaService.$inject = ['$http'];

function PessoaService ($http) {
    var service = this;

    var URL_PESSOAS = 'http://localhost:8080/pessoas';
    var URL_MUNICIPIOS = 'http://localhost:8080/municipios';
    var URL_PAISES = 'http://localhost:8080/paises';

    service.findAll = findAll;
    service.findOne = findOne;
    service.insert = insert;
    service.update = update;
    service.remove = remove;
    service.findAllNaturalidade = findAllNaturalidade;
    service.findAllNacionalidade = findAllNacionalidade;

    return service;

    function findAll (offset, filterValue) {
        var page = (offset || 1)-1;
        var filter = '';
        if (filterValue) {
            filter = `nome=${filterValue}&cpf=${filterValue}`
        }
        return $http.get(URL_PESSOAS + `?page=${page}&${filter}`)
            .then((response) => {
                return response.data;
            });
    }

    function findOne (id) {
        return $http.get(URL_PESSOAS + '/' + id)
            .then((response) => {
                return response.data;
            });
    }

    function insert (pessoa) {
        return $http.post(URL_PESSOAS, pessoa)
            .then((response) => {
                return response.data;
            });
    }

    function update (pessoa) {
        return $http.put(URL_PESSOAS + '/' + pessoa.id, pessoa)
            .then((response) => {
                return response.data;
            });
    }

    function remove (id) {
        return $http.delete(URL_PESSOAS + '/' + id);
    }

    function findAllNaturalidade(uf) {
        return $http.get(URL_MUNICIPIOS + '?uf=' + uf);
    }

    function findAllNacionalidade() {
        return $http.get(URL_PAISES);
    }

}