export default PessoaListController;

PessoaListController.$inject = ['app.pessoa.pessoaService'];

function PessoaListController (pessoaService) {
    var vm = this;
    vm.pessoa = [];

    vm.filtrar = findAll;
    vm.limpar = limpar;
    vm.anterior = anterior;
    vm.proxima = proxima;
    vm.setPage = setPage;
    vm.remove = remove;

    findAll();

    function findAll() {
        pessoaService.findAll(vm.page, vm.filter)
            .then((data) => {
                vm.pessoa = data.content;
                vm.pageSize = data.numberOfElements;
                vm.page = data.number + 1;
                vm.finish = data.last;
                vm.pages = getArrayPages(data.totalPages);
            });
    }

    function getArrayPages(pages) {
        var pagesArr = [];
        for (var i = 1; i <= pages; i++) {
            pagesArr.push(i);
        }
        return pagesArr;
    }

    function limpar() {
        vm.filter = '';
        findAll();
    }
    
    function anterior() {
        vm.page--;
        findAll();
    }

    function proxima() {
        vm.page++;
        findAll();
    }

    function setPage(page) {
        vm.page = page;
        findAll();
    }
    
    function remove(id) {
        if (confirm('Deseja realmente excluir o pessoa?')) {
            pessoaService.remove(id)
                .then(() => {
                    alert('Pessoa excluída com sucesso!');
                    findAll();
                })
                .catch(() => {
                    alert('Problemas ao excluir o pessoa!');
                });

        }
    }
}

