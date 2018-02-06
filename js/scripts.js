/*
	   Desenvolvido por Paula Castelan Firme
	   github: https://github.com/pcastelan
	   linkedin: https://www.linkedin.com/in/paulacastelanfirme/

	   API de gráficos:  http://echarts.baidu.com/
*/

//calculos que aceitam apenas numeros
var apenasNum = ['media', 'moda', 'mediana', 'separatrizes', 'variabilidade'];



//Google analytics
var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-105144990-2']); 
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('link')[document.getElementsByTagName('link').length-1]; s.insertAdjacentElement('afterend', ga);;
  })();
//Fim Google analytics


/*
 * funcao contadorInputs - Conta quantos inputs de determinada classe tem na página
 * parametro classe - classe dos inputs que serao contados
 * retorna um número inteiro 
 */
function contadorInputs(classe){ 
	var cont = 0;
	$(classe).each(function(){
		cont++;
	});
	$('.ic-contaInputs').text(cont + ' valores');
	return cont;
}


/*
 * funcao somaInputNum - Soma todos os valores (numeros) dos inputs de determinada classe
 * parametro classe - classe dos inputs que serao somados
 * retorna a soma dos valores (numéricos);
 */
function somaInputNum(classe) {
	var soma = 0;
	$(classe).each(function(e){
		soma = soma + Number($(this).val());
	});
	return soma;
}


/*
 * funcao porcentagem - calcula porcentagem de valor numerico
 * parametro valor - parcela do valor total
 * parametro total - valor total
 * retorna a porcentagem
 */
function porcentagem(valor, total){
	return arredonda2((valor/total)*100);
}


/*
 * funcao criaVetor - cria vetor com todos os valores de determinada classe
 * parametro classe - classe dos inputs onde estao dos valores
 * retorna um vetor com os valores;
 */
function criaVetor(classe) {
	var vetor = [];
	$(classe).each(function(){
		vetor.push($(this).val());
	});
	return vetor;
}


/*
 * funcao arredonda2 - arredonda um valor para duas casas decimais
 * parametro valor - valor numérico que será arredondado
 * retorna o valor arredondado;
 */
function arredonda2(valor) {
	valor = +valor;

	if (isNaN(valor))
		return NaN;

	valor = valor.toString().split('e');
	valor = Math.round(+(valor[0] + 'e' + (valor[1] ? (+valor[1] + 2) : 2)));	
	valor = valor.toString().split('e');
	return (+(valor[0] + 'e' + (valor[1] ? (+valor[1] - 2) : -2))).toFixed(2);
}


/*
 * funcao ordenaVetor - ordena vetor simples em ordem crescente
 * parametro vetor - vetor com os valores
 * retorna o vetor ordenado
 */
function ordenaVetor(vetor){

	//verifica se o vetor é de numeros ou de strings e o ordena em ordem crescente
	if(vetor.filter(function(i){return isNaN(i);}).length > 0){ 
		vetor.sort();
	} else {
		vetor.sort(function(a,b) { return a - b;});
	}

	return vetor;
}


/*
 * calcula a média a partir de um vetor
 */
function calculaMedia(vetor){
	var soma=0,
		i;

	//calcula a soma dos valores do vetor
	for(i=0; i<vetor.length; i++){
		soma = soma + Number(vetor[i]);
	}

	//divide a soma pelo numero de valores
	return soma/vetor.length;
}


/*
 * limpar os inputs do site sempre que ele recarrega
 */
$(document).ready(function(){
	$('.ic-inputs').val('');
	$('#ic-nomeVariavel').val('');
});


/*
 * funcao vetorFreq - recebe um vetor e cria um vetor de objetos com atributo var e frequencia
 * parametro vetor - vetor com as variaveis
 * retorna um vetor de objetos ordenado pela variavel ;
 */
function vetorFreq (vetor) {
	var j = 0;
	vetFr = [];

	vetor = ordenaVetor(vetor);

	//insere no vetor de objetos moda o primeiro valor do vetor ordenado
	vetFr.push({var:vetor[0], frequencia:1});

	if(vetor.length>1){
		for (var i = 1; i < vetor.length; i++) {
			//se moda ja tiver vetor[i], incrementa o atributo frequencia
			if(vetor[i]==vetFr[j].var){
				vetFr[j].frequencia = Number(vetFr[j].frequencia)+1;
			} else { //senao insere um novo objeto em moda
				vetFr.push({var:vetor[i], frequencia:1});
				j++;
			}
		}
	}

	// //verifica se o vetor é de numeros ou de strings e o ordena em ordem crescente
	if(vetFr.filter(function(i){return isNaN(i.var);}).length>0){ 
	
		function ordenaFreqMod(a,b){
			if(a.var < b.var){
				return -1;  
			}
			if (a.var > b.var) {
				return 1;
			}
			return 0;
		}
		vetFr.sort(ordenaFreqMod);		
		
	} else {		
		vetor.sort(function(a,b) { return Number(a.var) - Number(b.var);});
	}

	return vetFr;
}


/*
 * funcao vetorM - recebe um vetor e cria um vetor de objetos com atributo var e frequencia
 * parametro vetor - vetor com as variaveis
 * retorna um vetor de objetos ordenado pela frequencia ;
 */
function vetorM(vetor){
	var j = 0;
	vetFr = [];

	vetor = ordenaVetor(vetor);

	//insere no vetor de objetos o primeiro valor do vetor ordenado
	vetFr.push({var:vetor[0], frequencia:1});

	if(vetor.length>1){
		for (var i = 1; i < vetor.length; i++) {
			//se ja tiver vetor[i], incrementa o atributo frequencia
			if(vetor[i]==vetFr[j].var){
				vetFr[j].frequencia = Number(vetFr[j].frequencia)+1;
			} else { //senao insere um novo objeto
				vetFr.push({var:vetor[i], frequencia:1});
				j++;
			}
		}
	}
		//ordena o vetor de acordo com a frequencia
		function ordenaFreqMod(a,b){
			if(a.frequencia > b.frequencia){
				return -1;  
			}
			if (a.frequencia < b.frequencia) {
				return 1;
			}
			return 0;
		}
		vetFr.sort(ordenaFreqMod);		
		
	return vetFr;
}

/*------- ENTRADAS -------*/


$(document).ready(function(){

	var contEntradas=1; //contador

	//funcao que insere na pagina o input de entrada
	function adicionaEntrada(){
			contEntradas++; //incrementa contador

		  $('.ic-inputsBox__inputs').prepend('<div class="ic-inputsBox__inputs--entrada'+contEntradas+'"><input type="text" class="ic-inputs ic-inputsBox__inputs--entrada'+contEntradas+'"></div>');
			//mostra o botao de remover entrada
			$('.ic-botaoRemoveEntrada').show();

			//foca na ultima entrada da pagina
			$('.ic-inputsBox__inputs--entrada'+contEntradas).focus();
			
	}

	//insere entrada na pagina
	$('.ic-botaoInsereEntrada').on('click', function(){
		adicionaEntrada();
	});
	
	//remove entrada da pagina
	$('.ic-botaoRemoveEntrada').on('click', function(){

		$('.ic-inputsBox__inputs--entrada'+contEntradas).remove();
		contEntradas--; //decrementa contador

		//se só tiver uma entrada na pagina
		if(contEntradas===1){
			//remove o botao de remover entrada
			$('.ic-botaoRemoveEntrada').hide();
		}

		//foca na ultima entrada da pagina
		$('.ic-inputsBox__inputs--entrada'+contEntradas+ ' input').focus();
	});
	



	//calculos
	$('.ic-botaoCalcula').on('click', function(){
		var inputVazio = 0;
		var inputNum = 0;
		var verificaApenasNum = false;


		//remove as mensagens de erro antigas
		$('.ic-input-erro').removeClass('ic-input-erro');
		$('.ic-input-erro__box').remove();

		//verifica se as entradas da pagina devem ser apenas numeros
		for(var i = 0; i < apenasNum.length; i++){
			if(apenasNum[i] === $('.ic-botaoCalcula').attr('data-funcionalidade') ){
				verificaApenasNum = true;
				break;
			}
		}

		//adiciona classe as entradas que identificam que elas sao apenas numero
		if(verificaApenasNum){
			$('.ic-inputs').addClass('ic-inputs--num');
		}

		//verifica se o usuario esta tentando enviar input vazio
		$('.ic-inputs').each(function(i){
			if ($(this).val() === ''){
				$(this).addClass('ic-input-erro');		
				inputVazio++;
			}
		});
		
		//verifica se o usuario esta tentando texto onde deve ser numero
		$('.ic-inputs--num').each(function(i){
			if (isNaN($(this).val())){
				$(this).addClass('ic-input-erro');		
				inputNum++;
			}
		});
		


		if (inputVazio > 0){

			//mensagem de erro quando o usuario tentar enviar campos vazios
			$('.ic-titulosBox').append('<div class="row"><div class="ic-input-erro__box col-md-12"><p>Você está tentando enviar um ou mais campos vazios, preencha os campos destacados.</p></div></div>');

		} else if ( inputNum > 0 ) {
			
			//mensagem de erro quando o usuario tentar enviar texto onde so aceitam numeros
			$('.ic-titulosBox').append('<div class="row"><div class="ic-input-erro__box col-md-12"><p>Você só pode inserir números, corrija os campos destacados</p></div></div>');

		} else {// se nao existirem erros, sao feitos os calculos
			
			var opcao = $(this).attr('data-funcionalidade');

			if(opcao === 'frequencia'){
				$('.ic-tabelaFrequencia__tabela').css('display', 'table');
				$('.ic-tabelaFrequencia__tabela > *').remove();
				tabelaFrequencia(vetorFreq(criaVetor('.ic-inputs')));
				focoResposta();

			} else if(opcao === 'media'){
				var media = calculaMedia(criaVetor('.ic-inputs'));

				//escreve a resposta na página
				
				$('.ic-resposta').html('A média entre os valores é: '+media);
				focoResposta();

			
			} else if (opcao === 'moda'){

				calculaModa(vetorM(criaVetor('.ic-inputs')));
				focoResposta();

			} else if (opcao === 'mediana'){

				var dados = criaVetor('.ic-inputs'); //cria o vetor de entradas
				dados = ordenaVetor(dados);
				var mediana = calculaMediana(dados); //recebe a resposta calculada na funcao calculaMediana		


				//escreve a resposta na página
				$('.ic-resposta').html("O valor da mediana é: "+mediana[0]);
				focoResposta();

			} else if (opcao === 'separatrizes'){

				geraSeparatrizes(criaVetor('.ic-inputs'));
				focoResposta();

			} else if (opcao === 'graficos'){

				//variavel tipo recebe o tipo de gráfico selecionado;
				var tipo = $('.ic-graficos__select option:selected').val();
				
				if(tipo !=='vazio'){
					$('#ic-grafico-1').show();
					//inicia a api dos gráficos
					var myChart = echarts.init(document.getElementById('ic-grafico-1'));
					focoResposta();
					switch(tipo){
						case "bar":
							// formata os dados inseridos para a api
							var dadosBarra = geraValorBarra();

							//configura o grafico de barras
							var option_bar = {
								title: {
									text: $('#ic-graficos__titulo').val(), //seta o titulo do grafico
									textStyle: {
										marginBottom: '10px'
									},
									x: 'center'
								},
								textStyle:{
									fontSize: 10
								},
								tooltip: {},
								toolbox: {
									feature: {
										saveAsImage : {
											show: true,
											type: 'png',
											title: 'Salvar como imagem',
											name: 'grafico_de_barras'
										}
									}
								},
								xAxis: {
									name: $('#ic-graficos__eixox').val(), //seta titulo do eixo x
									nameLocation: 'middle',
									nameTextStyle: {
										fontSize: '15',
										// fontWeight: 'bold',
										color: '#01295C',
										fontStyle: 'italic'
									},
									nameGap: 25,
									data: dadosBarra[1], //titulos
									axisLabel: {
				            // color: '#001633',
				            fontSize: '11',
				            fontWeight: 'bold',
				            fontFamily: 'sans-serif'
					        },
					        axisLine: {
										lineStyle: {
											color: '#666666'
										}
									}
								},
								yAxis: {
									name: $('#ic-graficos__eixoy').val(), //seta titulo do eixo y
									nameLocation: 'end',
									nameGap: 10,
									axisLabel:{
				            color: '#001633',
				            fontSize: '11',
				            fontWeight: 'bold',
				            fontFamily: 'sans-serif'
					        },
									nameTextStyle: {
										fontSize: '13',
										// fontWeight: 'bold',
										color: '#01295C',
										fontStyle: 'italic'
									},
									axisLine: {
										lineStyle: {
											color: '#666666'
										}
									}
								},
								barMaxWidth: '50',
								series: [{
									type: 'bar',
									data: dadosBarra[0], //valores
									label: {
										normal: {
											show: true,
											position: 'insideTop'
										}
									},
									itemStyle: {
										emphasis:{
											opacity: 0.9,
											shadowColor: 'rgba(0, 0, 0, 0.5)',
											shadowBlur: 5
										}
									}
								}],
								color:['#5C97BF']
							};
							myChart.setOption(option_bar); //chama a funcao que gera o grafico
							break;

						case "pie":
							// formata os dados inserido para a api
							var valores = geraValorPizza(); 

							// inicializa o vetor pros nomes
							var pienomes = [];

							//popula o vetor pros nomes
							for (var i = 0; i < valores.length; i++) {
								pienomes.push(valores[i].name);
							}

							//configura o grafico de barras
							var option_pie = {
								title: {
									text: $('#ic-graficos__titulo').val(), //titulo do grafico
									textStyle: {
										display: 'block',
										marginBottom: '10px'
									},
									x: 'center',
								},
								tooltip: {
									trigger: 'item',
									formatter: "{b}: {c} ({d}%)"
								},
								toolbox: {
									feature: {
										saveAsImage : {
											show: true,
											type: 'png', 
											title: 'Salvar como imagem',
											name: 'grafico_de_pizza'
										}
									}
								},
								legend: {
									orient: 'vertical',
									data: pienomes, //nomes das variaveis
									x: 'left'
								},
								series: [{
									type: 'pie',
									radius: '55%',
									data: valores, //entradas
									label: {
										normal: {
											formatter: '{d}%',
											show: true,
											position: 'insideBottom'
										},
									},
									itemStyle: {
										normal: {
											borderColor:'#00131E',
											borderWidth: 0.2
											
										},
										emphasis: {
											opacity:0.9,
											shadowColor: 'rgba(0, 0, 0, 0.5)',
											shadowBlur: 5
										}
									}
								}],
								color:['#34495E', '#67809F', '#4B77BE', '#22313F', '#3A539B']
							};
							myChart.setOption(option_pie);//chama a funcao que gera o grafico
							break;
					}

				}
			} else if (opcao === 'variabilidade') {

				var entradas = criaVetor('.ic-inputs');

				//calculos
				var media = calculaMedia(entradas);
				var desvioMedio = calculaDesvioMedio(entradas, media);
				var variancia = calculaVariancia(desvioMedio);
				var desvioPadrao = calculaDesvioPadrao(variancia);
				var coeficienteVariacao = calculaCoeficienteVariacao(desvioPadrao, media);

				$('.ic-resposta').html('<strong>Variância</strong>: '+ arredonda2(variancia)	+ '<br><strong>Desvio Padrão</strong>: '+ arredonda2(desvioPadrao) +'<br><strong>Coeficiente de Variação</strong>: '+ arredonda2(coeficienteVariacao) +'% - ');
				focoResposta();
				
				//escreve na página o nível da dispersao
				if (coeficienteVariacao <= 15) {

					$('.ic-resposta').append('<em>baixa</em> dispersão (dados homogêneos)');

				} else if (coeficienteVariacao > 15 && coeficienteVariacao <= 30 ){

					$('.ic-resposta').append('<em>média</em> dispersão');

				} else if (coeficienteVariacao > 30 ){

					$('.ic-resposta').append('<em>alta</em> dispersão (dados heterogêneos)');

				}
				
			}
		}


	});

});

/*------- TABELA DE FREQUÊNCIA -----*/

//calcula e imprime a tabela de frequencia a partir de um vetor com os valores;
function tabelaFrequencia(vetor){

	//insere o cabeçalho da tabela
	$('.ic-tabelaFrequencia__tabela').append('<thead><tr><th class="ic-tabelaFrequencia__variavel">Variavel</th><th>Frequência</th><th>Porcentagem (%)</th><th>Frequência Acumulada Relativa (%)</th></tr></thead>');

	//nome da variavel na tabela
	var nomeVariavel  = $('#ic-nomeVariavel').val();
	if(nomeVariavel !== '' && nomeVariavel !== ' '){
		$('.ic-tabelaFrequencia__variavel').html(nomeVariavel);
	}

	var freqRelAbs = 0,
		total = 0;


	//imprime tabela
	for (var m = 0; m < vetor.length; m++) {total = total + vetor[m].frequencia;}
	for (var k = 0; k < vetor.length; k++) {
		var freqRel = porcentagem(vetor[k].frequencia, total);
		freqRelAbs = Number(freqRelAbs) + Number(freqRel);
		$('.ic-tabelaFrequencia__tabela').append('<tr class="ic-tabelaFrequencia__tabela__conteudo"><td>'+vetor[k].var+'</td><td>'+vetor[k].frequencia+'</td><td>'+freqRel+'</td><td>'+freqRelAbs+'</td></tr>');		
	}
	$('.ic-tabelaFrequencia__tabela').append('<tr class="ic-tabelaFrequencia__tabela__final"><td> TOTAL</td><td>'+total+'</td><td>'+100+'</td><td> </td></tr>');	
}




/*------ MODA -------*/

/*
 *  funcao calculaModa - calcula a moda dos valores a partir das entradas do usuário
 *  parametro: vetor - um vetor com os valores inseridos pelo usuário
 */
function calculaModa(vetor){
	//imprime o objeto de maior frequencia
	$('.ic-resposta').html('Resposta: <br>'+vetor[0].var);
	//se tiver mais de uma entrada
	if(vetor.length>1){

		for (var i = 1; i<vetor.length; i++) {
			//verifica se existe mais de um objeto com a maior frequencia, se tiver o imprime
			if(vetor[0].frequencia === vetor[i].frequencia){
				$('.ic-resposta').append(' '+vetor[i].var);
			} else {
				i = vetor.length+1;
			}
		}
		
	} 
	
}



/*------ MEDIANA -------*/

//funcao que calcula a mediana a partir de um vetor com os valores
function calculaMediana(vetor){

	var i,
		meio=0,
		mediana;
	//se o vetor só tiver um valor
	if(vetor.length==1){
		//a mediana é esse unico valor
		mediana = vetor[0];
	} else {


		//calcula qual a posição do valor central
		meio = Math.floor(vetor.length/2);

		if(vetor.length/2 - meio >= 0.5){
			meio++;
		}

		//converte todas as entradas para números
		for(i=0; i<vetor.length; i++){
			vetor[i] = Number(vetor[i]);
		}

		//se o numero de valores for par
		if(vetor.length%2 === 0){
			mediana = (vetor[meio-1]+vetor[meio])/2;
		} else {
			mediana = vetor[meio-1];
		}
	}
	
	//posicao 0 é a mediana calculada, posicao 1 é a posicao da mediana dentro do vetor
	return [mediana, meio];
}

/*------ SEPARATRIZES -------*/
function geraSeparatrizes(vetor){
	vetor = ordenaVetor(vetor);

	var quartis = calculaQuartis(vetor);

	// $('.ic-resposta--valores').html('Entrada: '+vetor);
	$('.ic-resposta').html('Q1 ou P25: <strong>'+quartis[0]+'</strong><br>Q2 ou P50: <strong>'+quartis[1]+'</strong><br>Q3 ou P75: <strong>'+quartis[2]+'</strong>');

}

function calculaQuartis(vetor){
	var quartis = [3];
	var vetQ1 = [];
	var vetQ3 = [];

	//q2 recebe a mediana dos valores centrais
	quartis[1] = (calculaMediana(vetor)[0]); 
	
	var meio = calculaMediana(vetor)[1];

	//cria vetores com os valores anteriores e posteriores a mediana central
	if (vetor.length%2 === 0){

		for(var i = 0; i<meio; i++){
			vetQ1.push(vetor[i]);
			vetQ3.push((vetor[i+meio]));
		}

	} else {

		for(var i = 0; i<meio-1; i++){
			vetQ1.push(vetor[i]);
			vetQ3.push((vetor[i+meio]));
		}
		
	}

	//calcula os outros dois quartis
	quartis[0] = calculaMediana(vetQ1)[0];
	quartis[2] = calculaMediana(vetQ3)[0];

	return quartis;
}

/* ------- GRÁFICOS --------*/

$(document).ready(function(){
	var funcionalidade = $('.ic-botaoCalcula').attr('data-funcionalidade');
	if(funcionalidade === 'graficos'){
		$('.ic-inputsWrapper').hide();
		$('.ic-botaoCalcula').hide();

	}
	$('.ic-graficos__select option:first').attr('selected', true);


	//recarrega a página quando alguem clica no botao resetar página
	$('.ic-graficos__btnReset').click(function(){location.reload(); });


	//quando o botao de confirmação de seleção de gráfico é clicado
	$('.ic-graficos__select--selecionar').click(function(){

		//variavel tipo recebe o tipo de gráfico selecionado;
		var tipo = $('.ic-graficos__select option:selected').val(); 
		if(tipo !== 'vazio'){// se o usuário tiver escolhido o tipo de gráfico

			//oculta o campo de seleção de tipo de gráfico
			$('.ic-graficos__selectBox').hide();

			$('.ic-graficos__tituloWrapper').show();

			$('.ic-graficos__'+tipo+'__selecionado').show();

			//mostra os campos para entrada de dados
			$('.ic-inputsWrapper').css('display', 'grid');
			$('.ic-botaoCalcula').show();

			//classe para controle do estado do gráfico
			$('.ic-grafico-1').addClass('ic-grafico-gerado');
			
			//se tipo for 'barras' mostra os inputs para entrada dos titulos dos eixos
			if(tipo === 'bar'){
				$('.ic-graficos__wrapperEixo').show();
			} else {
				$('.ic-graficos__wrapperEixo').hide();
			}
			$('.ic-graficos__selectWrapper').hide();
			//limpa a mensagem de erro
			$('.ic-grafico__msg--erro').remove();
			$('.ic-grafico__msg--erro').children().remove();


			$('.ic-respostaBox').css('padding', 0);

		}

	});
});




//gera o objeto com os valores para pizza
function geraValorPizza () {

	var vetorPizza = vetorM(criaVetor('.ic-inputs')); //vetor com as frequencias de cada variavel
	var data = []; //inicializa vetor pra receber os objetos

	//popula o vetor com os objetos
	for(var i = 0; i<vetorPizza.length; i++){
		data.push({value: vetorPizza[i].frequencia, name:vetorPizza[i].var});
	}

	return data;
	
}

//gera o vetor com os valores para barra
function geraValorBarra(){

	var vetorBarra = vetorM(criaVetor('.ic-inputs')); //vetor com as frequencias de cada variavel
	var data = [[], []]; //inicializa vetor pra receber os objetos

	//popula array com os valores
	for(var i = 0; i<vetorBarra.length; i++){
		data[0].push(vetorBarra[i].frequencia); //data[0] recebe os numeros
		data[1].push(vetorBarra[i].var); //data[1] recebe os nomes
	}
	return data;
}


/* ------- VARIABILIDADE --------*/



/*
 * funcao calculaDesvioMedio - calcula o desvio medio a partir das entradas do usuario
 * parametro vetor - vetor com as entradas brutas
 * parametro media - media dos valores do vetor
 * retorna um vetor com o desvio medio de todas as entradas;
 */
function calculaDesvioMedio (vetor, media){
	var desvioMedio = [];

	for(var i = 0; i < vetor.length; i++){
		desvioMedio.push(Number(vetor[i]) - media);
	}
	return desvioMedio;
}


/*
 * funcao calculaVariancia - recebe o desvio medio e calcula a variancia dos valores
 * parametro desvio medio - com o desvio medio de todas as entradas
 * retorna a variancia
 */
function calculaVariancia (desvioMedio){
	var soma = 0;
	var numElementos = desvioMedio.length;
	var variancia;
	for(var i = 0; i < numElementos; i++){
		soma = soma + (Math.pow(desvioMedio[i], 2));
	}
	variancia = soma / (numElementos-1);

	return variancia;
}


/*
 * funcao calculaDesvioPadrao - recebe a variancia e calcula o desvio padrao
 * parametro variancia - variancia das entradas
 * retorna o desvio padrao
 */
function calculaDesvioPadrao (variancia){
	return Math.sqrt(variancia);
}


/*
 * funcao calculaCoeficienteVariacao - calcula o coeficiente de variacao das entradas dos dados
 * parametro desvioPadrao - desvio padrao calculado
 * parametro media - media calculada
 * retorna o Coeficiente de Variacao 
 */
function calculaCoeficienteVariacao(desvioPadrao, media){
	return (desvioPadrao/media) * 100;
}


/* 
 * 
 * front end 
 *
 */




$('.ic-mobile-nav').click(function(){
	$('#ic-cabecalho').toggleClass('ic-mobile-hide');
	$('.ic-mobile-nav--fechar').show();
	$('.ic-mobile-nav').hide();
});

$('.ic-mobile-nav--fechar').click(function(){
	$('#ic-cabecalho').toggleClass('ic-mobile-hide');
	$('.ic-mobile-nav--fechar').hide();
	$('.ic-mobile-nav').show();
});


function focoResposta(){
	$('.ic-respostaWrapper').css('display', 'flex');
	$('html, body').animate({
		scrollTop: $(".ic-respostaBox").offset().top
	}, 500);
}