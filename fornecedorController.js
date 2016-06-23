var Index = {
    
    init: function() {
        Index.setForm();                        //primeiro seta o formulario
        Index.listFornecedor();                 //chama a lista do fornecedor
    },
    
    //seter o formulario com o onsubmit
    
    setForm: function(){
        var form = document.getElementById('form');               // var for vai pegar o elemento pelo id dele que é form "do formulario"
        if(form){
            form.onsubmit = function(){                     //se tem formulario 
                Index.saveFornecedor(form);                  // chama a funcao ONSUBIMIT ???
                return false;                                   //não sei o porque retorna falso???
            };
        }
    },
    
    

    //salva os dados
    
    saveFornecedor: function(form){
        var fornecedor = {};
        fornecedor.nome = form.nome.value;                                     //salva da lista fornecedor o nome 
        fornecedor.telefone = form.tel.value;                                   //salva da lista fornecedor o telefone
        fornecedor.data = form.dta.value;                                        //salva da lista fornecedor a data 
        fornecedor.codigo = form.cod.value;                                          //salva da lista fornecedor o cod
        fornecedor.cnpj =form.cnpj.value;
        if (FornecedorDAO.save(fornecedor) == FornecedorDAO.NEW) {//se o fornecedor DAO salvou o formulario fornecedor,ele recebe um novo item
           TableController.addItem(fornecedor,Index.edit,Index.delete);              //o controller da tabela adiciona item ???recebe parametro?
        } else{ 
           TableController.clearList();                                             
            Index.listFornecedor();                 // senão o controler da tabela limpa a lista ? não entendi o index
        }                                               
               
            form.nome.value = form.tcc.value = form.orientador.value = "";     ///???????

 },
 
    setTable: function(){
        var table = document.getElementById('tabela-fornecedores');       //seta a tabela e pega o elemento  pelo id   
        TableController.setTable(table);
    },
        
        listFornecedor: function () {                             
            Index.setTable();
            var fornecedorList = FornecedorDAO.retrieve();            //???
           if (fornecedorList && fornecedorList.length) {                           // a lista do fornecedor é do tamanho todo dela 
			TableController.addList(fornecedorList, Index.edit, Index.delete);       //adiciona a lista ja com o edit e delete
		}
	},
    //editar os campos do usuario(aluno)
 
        	edit: function(nome) {
		if(confirm("Você deseja editar o usuário " + nome + " ?")) {       // tela de confirmacao    
			var fornecedor = FornecedorDAO.get(nome);                    //pega o nome com o dao
			if (fornecedor) {
				var form = document.getElementById('form');              //pega o elemento do formulario por id
                    form.nome.value = fornecedor.nome;                  //pega exatamente o que foi digitado no nome
                    form.tel.value =  fornecedor.telefone;              //pega exatamente o que foi digitado no telefone
                    form.dta.value = fornecedor.data;                   //pega exatamente o que foi digitado na data
                    form.cod.value =  fornecedor.codigo;
                    form.cnpj.value=fornecedor.cnpj;
                    
            }
        }
},

    //deletar o usuario(aluno)

delete: function(nome, element) {
		if(confirm("Você deseja deletar o usuário " + nome + " ?")) {            
			var fornecedor = FornecedorDAO.get(nome);
			if (fornecedor) {
				if(FornecedorDAO.delete(nome)) {                        // se foi chamado o delete com o parametro(nome)
					var row = element.parentNode.parentNode;          // ???????
					row.parentNode.removeChild(row);                     //  ????? na linha do NO?? vai apagar a "filha" linha que esta no no? 
				}
			}	
		}
	}
};


//initialization
FornecedorDAO.unserializeAndParse();                    
Index.init();
