export default PessoaFormController;

PessoaFormController.$inject = ['app.sourceService'];

function PessoaFormController (sourceService) {
    var vm  = this;

    sourceService.findAll().then((response) => vm.sources = response.data);     
}
