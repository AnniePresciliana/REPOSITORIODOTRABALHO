var FornecedorDAO = {

	DB_KEY: "fornecedores",
	NEW: 1,                       //???
	UPDATE: 2,                   //???

	list: [], 

	save: function(fornecedor, tableController) {               
		var list  = FornecedorDAO.list,           
		    index = FornecedorDAO.getIndex(fornecedor);
		
		if(index > -1) {
			list[index] = fornecedor;                  //     ???? 
		FornecedorDAO.serializeAndSave();
			return FornecedorDAO.UPDATE;             //retorna a atualização        
		}
		else {
			list.push(fornecedor);
			if(tableController) {
				tableController.addItem(fornecedor);
			}
		}
		
		FornecedorDAO.serializeAndSave();

		return FornecedorDAO.NEW;                     // retorna o novo item 
	},

	retrieve: function() {
		var list = FornecedorDAO.list;
		if(list && list.length > 0) {               //se a lista ta ali e o tamanho dela é maior que 0 
			return list;                         //retorna lista 
		}
		return null;
	},

	get: function(nome) { 
		var list  = FornecedorDAO.list,                            
		    index = FornecedorDAO.getIndex({'nome': nome});             //???

		if (index > -1) {
			var fornecedor = list[index];
			return fornecedor;                      //se a lista estiver vazia retorna null
		}

		return null;
	},

	getIndex: function(fornecedor) {
		var list = FornecedorDAO.list,
		    item = {};

		for (var i = 0; i < list.length; i++) {              // roda listando os itens que estão no index 
			item = list[i];                                      // retornando o item indexado
			if(item.nome == fornecedor.nome) {
				return i;
			}
		}

		return -1;                                           // se tiver vazia volta e retorna null 
	},

	delete: function(nome) {
		var list  = FornecedorDAO.list,
		    index = FornecedorDAO.getIndex({'nome': nome});       

		if (index > -1) {
			list.splice(index, 1);                       //???
			FornecedorDAO.serializeAndSave();
			return true;
		}

		return false;
	},

	serializeAndSave: function() {                               
		var list = FornecedorDAO.list;
		if(list && list.length > 0) {                            //pega  a lista  se o tamanho for maior que 0
			var json = JSON.stringify(FornecedorDAO.list);           // torna em String
			window.localStorage.setItem(FornecedorDAO.DB_KEY, json);     //guarda localmente 
		}
	},

	unserializeAndParse: function() {
		var json = window.localStorage.getItem(FornecedorDAO.DB_KEY);       //pega o item e guarda 
		if(json) {                                                   //se tiver alguma coisa no json que stringuifo 
			FornecedorDAO.list = JSON.parse(json);
		}
		else {
			FornecedorDAO.list = [];                             // senão retorna nada ??
		}
	}

};
