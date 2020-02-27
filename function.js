$(document).ready(function () {

	calCount(); //Calculate number of packed and unpacked items 

	//Search for Unpacked Items
	$("#unpackSearch").on("keyup", function () {
	var value = $(this).val().toLowerCase();
		$("#unpackdiv .checkbox").filter(function () {
		  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});

	//Search for Packed Items
	$("#packedSearch").on("keyup", function () {
	var value = $(this).val().toLowerCase();
		$("#packed *").filter(function () {
		  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});

	//add new items
	$('.submit').click(function(){
		var item = $('#addItem').val();
		var newItem = '<div class="checkbox"><label><input type="checkbox" value="" class="chkBox"><p>'+ item +'</p></label><button type="button" class="btn remove" style="color: #F65E81;font-size: 14px;margin: 0px 0px 0px 11px; background-color: transparent;">Remove</button></div>';
		$("#unpackdiv").append(newItem);
		var numUnpack = $("#unpackdiv").children('.checkbox').length;
		$('#countUnPack').text('Unpacked Items('+numUnpack+')');

	});

	//Remove Items
	$(document).on("click",'.remove', function(){
	    $(this).parent().remove();
	    calCount();
  	});

	//Add unpakced items to packed item list  
	$(document).on('change',"#unpackdiv .chkBox" ,function(){
	if($(this).is(':checked'))
	{
	    var clone=$(this).parents('.checkbox').clone().find('.chkBox:checkbox').prop('checked' , true).end();
	    $('#packed').prepend(clone);
	    $(this).parents('.checkbox').remove();
	    calCount();
	}
	});

	//Move packed items to unpacked item list
	$(document).on('change',"#packed .chkBox" ,function(){
	if ($(this).prop('checked')==false){ 
	    var clone=$(this).parents('.checkbox').clone().find('.chkBox:checkbox').prop('checked' , false).end();
	    $('#unpackdiv').prepend(clone);
	    $(this).parents('.checkbox').remove();
	    calCount();
	}
	});

	//Unpack all packed item from the list
	$('.unpackAll').click(function(){
		var allItems = $("#packed").children().clone().find('.chkBox:checkbox').prop('checked' , false).end();
		$('#unpackdiv').prepend(allItems);
	    $("#packed").empty();
		calCount();
	});

	function calCount(){
		var numUnpack = $("#unpackdiv").children('.checkbox').length;
		$('#countUnPack').text('Unpacked Items('+numUnpack+')');
		var numPack = $("#packed").children('.checkbox').length;
		$('#countPack').text('Packed Items('+numPack+')');
	}
	
});