export default PessoaFormController;

var moment = require('moment');

PessoaFormController.$inject = ['$scope', 'app.pessoa.pessoaService', '$state', '$stateParams'];

function PessoaFormController ($scope, pessoaService, $state, $stateParams) {
    var vm = this;
    vm.save = save;
    vm.titulo = 'Novo pessoa';
    vm.pessoa = {};

    $scope.$watch('vm.pessoa.naturalidade.uf', loadMunicipios);

    init();

    function init() {
        if ($stateParams.id) {
            pessoaService.findOne($stateParams.id)
                .then(function(data) {
                    vm.titulo = 'Editando pessoa';
                    vm.pessoa = data;
                    vm.pessoa.dataNascimento = data.dataNascimento ? new Date(moment(data.dataNascimento)) : null;
                    vm.naturalidadeUf = vm.pessoa.naturalidade ? vm.pessoa.naturalidade.uf : null;
                });
        }
        vm.estados = [
            "AC","AL","AP","AM","BA","CE","ES",
            "GO","MA","MT","MS","MG","PA","PB",
            "PR","PE","PI","RJ","RN","RS","RO",
            "RR","SC","SP","SE","TO","DF"
        ];
        findAllNacionalidade();
    }    

    function loadMunicipios(newValue, oldValue) {
        if (!newValue || newValue === oldValue) {
            return;
        }
        pessoaService.findAllNaturalidade(newValue).then((response) => {
            vm.municipios = response.data;
        });
    }

    function findAllNacionalidade() {
        pessoaService.findAllNacionalidade().then((response) => {
            vm.paises = response.data;
        });
    }

    function save() {
        if (vm.pessoa.id) {
            pessoaService.update(vm.pessoa)
                .then(() => {
                    $state.go('pessoa');
                })
                .catch(() => {
                    alert('Erro ao salvar')
                });
        } else {
            pessoaService.insert(vm.pessoa)
                .then(() => {
                    $state.go('pessoa');
                })
                .catch((error) => {
                    alert('Erro ao salvar pessoa: ' + mapListErrors(error).join(', '));
                });
        }
    };

    function mapListErrors(error) {
        return error.data.map((erro) => {
            return erro.erro;
        });
    }

}

