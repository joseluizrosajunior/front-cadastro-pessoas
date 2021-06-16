export default PessoaListController;

PessoaListController.$inject = ['app.pessoa.pessoaService'];

function PessoaListController (pessoaService) {
    var vm = this;
    vm.pessoa = [];

    function _load() {
        pessoaService.findAll(vm.page, vm.filter)
            .then(function(data) {
                vm.pessoa = data.content;
                vm.pageSize = data.numberOfElements;
                vm.page = data.number + 1;
                vm.finish = data.last;
                vm.pages = _pages(data.totalPages);
            });
    }
    _load();

    function _pages(pages) {
        var pagesArr = [];
        for (var i = 1; i <= pages; i++) {
            pagesArr.push(i);
        }
        return pagesArr;
    }

    
    vm.filtrar = _load;
    vm.limpar = function() {
        vm.filter = '';
        _load();
    }
    
    vm.anterior = function () {
        vm.page--;
        _load();
    }

    vm.proxima = function () {
        vm.page++;
        _load();
    }

    vm.setPage = function (page) {
        vm.page = page;
        _load();
    }
    
    vm.remove = function (id) {
        if (confirm('Deseja realmente excluir o pessoa?')) {
            pessoaService.remove(id)
                .then(function () {
                    alert('pessoa excluído com sucesso!');
                    _load();
                })
                .catch(function (error) {
                    alert('Problemas ao excluir o pessoa [' + error + ']!');
                });

        }
    }
}

