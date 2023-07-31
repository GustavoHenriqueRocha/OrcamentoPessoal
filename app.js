class Despesa {
	constructor(ano ,mes ,dia, tipo, descricao, valor){
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}


	validarDados(){
		//in itera sobre cada atributo do objeto em loop até finalizar
		for(let i in this) {
			//this[i] resgata os valores dos atributos
			if (this[i] === undefined || this[i] === "" || this[i] === null) {
				return false 
			}
		}
		return true
	}
}

//cada despesa recebe um id unico
class Bd{

	//para não esquecer que esse metodo sempre recebe dois parametros

	//LocalStorage.setItem(key,value)
	//LocalStorage.getItem(key,value)

	//iniciando um id = 0
	constructor(){
		let id = localStorage.getItem('id')

		if (id === null) {
			localStorage.setItem('id', 0)
		} else {

		}

	}

	//lendo e add um novo id somando 1
	getProximoId(){
		let proximoId = localStorage.getItem('id') //null
		return parseInt(proximoId) + 1
	}

	gravar(d){//d = bd.gravar(d = despesa)
		
		let id = this.getProximoId()


		//objeto literal to JSON 
		//id = array de despesas 
		localStorage.setItem(id, JSON.stringify(d))


		//atualiza o doc id com o valor do proximoId
		//primeiro o nome da chave e o segundo o valor
		localStorage.setItem('id', id)
	}

	recuperarTodosRegistros(){

		//É criado um array vazio, que será utilizado para armazenar as despesas recuperadas do localStorage.
		let despesas = Array()

		let id = localStorage.getItem('id')//variavel recebe o o id do bd

		//recupera todas as despesas cadatradas em localstorage
		for(let i = 1; i <= id; i++) {

			//recuperar a despesa
			let despesa = JSON.parse(localStorage.getItem(i))//(i)valor da key

			//verifcando se alguma key foi removido se sim pula o push
			if (despesa === null) {
				continue
			}

			//recuperando o id de cada despesa individual para trata-las seja para excluir ou etc...
			despesa.id = i

			//cada objeto é add ao array
			despesas.push(despesa)
		}
		return despesas
	}

	//trbalhando a pesquisa no bd
	pesquisar(despesa){
		let despesasFiltradas = Array()
		//recuperando todos os dados para em seguida aplicar o filtro
		despesasFiltradas = this.recuperarTodosRegistros()//esse sndo o array com todas as despesas
		
		console.log(despesasFiltradas)
		console.log(despesa)

		// explicando a arrowFunction
		// Essa linha de código compara o atributo ano de cada despesa no array despesasFiltradas
		// com o atributo ano do objeto despesa. Se houver correspondência, a despesa é incluída 
		// no array filtrado. No entanto, é importante notar que a função filter() não altera o array 
		// original; ela retorna um novo array com os elementos filtrados.

		//ano
		if (despesa.ano != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)//
		}
		
		//mes
		if (despesa.mes != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}
		
		//dia
		if (despesa.dia != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}
		//tipo
		if (despesa.tipo != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}
		//descricao
		if (despesa.dia != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}
		//valor

		//a função devolve o array filtrado 
		return despesasFiltradas
	}

	//excluindo tasks
	remover(id){
		localStorage.removeItem(id)
	}
}


//this need any coment???
let bd = new Bd()


//atribuindo dados ao objeto apartir do onclick
function cadastrarDespesa(){

	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')
	
	let despesa = new Despesa(
		ano.value,
		mes.value,
		dia.value,
		tipo.value,
	    descricao.value,
	    valor.value
	)

	//verifica se os dados foram todos preenchidos 
	if (despesa.validarDados()) {
		//gravando despesa com os valores do object
		bd.gravar(despesa)

		//trocando a estilização do modal 
		document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'//add to html??
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'//add new class??
		document.getElementById('modal_conteudo').innerHTML = 'Despesa cadastrada com sucesso'//add to html??
		document.getElementById('modal_buton').className = 'btn btn-success'//add new class??

		//dialog de sucesso e dados armazenados caso o if de validarDados() seja true
		$('#modalRegistraDespesa').modal('show')

		//zerando os valores
		ano.value = ''
		mes.value = ''
		dia.value = ''
		tipo.value = ''
		descricao.value = ''
		valor.value = ''

	} else {

		//trocando a estilização do modal
		document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'//add to html??
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'//add new class??
		document.getElementById('modal_conteudo').innerHTML = 'Ainda tem um ou mais campos não preenchidos !'//add to html??
		document.getElementById('modal_buton').className = 'btn btn-danger'//add new class??


		//dialog de erro caso o if de validarDados() seja false
		$('#modalRegistraDespesa').modal('show')
	}

	


}


//trabalhando com a consulta
function carregaListaDespesas(despesas = Array(), filtro = false) {

	//se nao houver parametro recupera todos os registros, se houver o if é ignorado
	if (despesas.length == 0 && filtro == false) {
		//recupera as info la do recuperarTodosRegistros() e add a variavel
		despesas = bd.recuperarTodosRegistros()
	}

	//daqui pra baixo vou fazer aparecer as despesas 

	//selecionando o elemento tbody
	let listaDespesas = document.getElementById('listaDespesas')
	listaDespesas.innerHTML = ''

	//função executada uma vez para cada atributo do array gerando as (tr)/(td)
	despesas.forEach( function(d) {//representa a variavel let despesas

		//console.log(d)
		
		//criando a linha (tr), como despesas ja tem os atributos eu nao preciso fazer muita coisa
		let linha = listaDespesas.insertRow()

		//criar as colunas (td)
		linha.insertCell(0).innerHTML = `${d.dia} / ${d.mes} / ${d.ano}`
		
		//ajustar o tipo para o conteudo e nao o id
		switch(d.tipo){
			case '1': d.tipo = 'Alimentação'
				break

			case '2': d.tipo = 'Educação'
				break

			case '3': d.tipo = 'Lazer'
				break

			case '4': d.tipo = 'Saúde'
				break

			case '5': d.tipo = 'Transporte'
				break
		}

		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor

		//criar o botão de apagar 
		let btn = document.createElement("button")
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fas fa-times"></i>'
		//associa o id do objeto ao id do botão
		btn.id = `id_despesa_${d.id}`
		//função de remover objeto do localstorage
		btn.onclick = function () {

			//tratando o nome do id 
			let id = this.id.replace('id_despesa_', '')

			// Aqui você pode definir a mensagem do modal com os dados da despesa removida
	      	document.getElementById('modal_titulo').innerText = 'Despesa Removida';
	      	document.getElementById('modal_titulo_div').className = 'modal-header text-danger';
	      	document.getElementById('modal_conteudo').innerText = `A despesa do dia ${d.dia}/${d.mes}/${d.ano} foi removida com sucesso!`;
	      	document.getElementById('modal_buton').className = 'btn btn-danger';

	     	 $('#modalRegistraDespesa').modal('show');


			//fazendo execução da função e excluindo objeto do localstorage
			bd.remover(id)

			
		}
		linha.insertCell(4).append(btn)

		
	})
	
}
//att com o objeto ja removido do localstorage
function reload() {
	window.location.reload()
}

//função de pesquisa ativada no onclick da lupa
function pesquisarDespesa() {
	//recupera os valores pelo .value do id ou seja a referencia
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)//recebe os atributos 


	//pegando o retorno de despesasFiltradas()
	let despesas = bd.pesquisar(despesa)

	
	//daqui pra baixo vou fazer aparecer as despesas com o mesmo codigo int nada de novo
	//a diferença é que agora despesas recebe o array despesasFiltradas
	//
	//----------------------------------------------------------------------------------------

	carregaListaDespesas(depesas, true)
}





