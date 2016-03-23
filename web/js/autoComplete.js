/**
 * Created by Toshiba on 14-03-2016.
 */


var $autoCompelt;
// A $( document ).ready() block.
$( document ).ready(function() {




    $('input[inputAutoComplete=on]').each(function() {
        document.getElementById($(this).attr('id')).addEventListener('focusin',function() {
            AutoComplete($(this).attr('id'));
            //console.log($(this).attr('id') );
        });
    });


});


function AutoComplete($id){
    // Create the autocomplete object and associate it with the UI input control.
    // Restrict the search to the default country, and to place type "address".
    var $elem=document.getElementById($id);

    $autoCompelt = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        ($elem), {
            types: ['geocode'],
            componentRestrictions: {'country': 'TN'}
        });
    $autoCompelt.bindTo('bounds', map);

    $autoCompelt.addListener('place_changed', function(){
        var place = $autoCompelt.getPlace();

        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(7);

            //alert(place.geometry.location.lat());
            //alert(place.geometry.location.lng());

            var $parent =$($elem).parent();
            $parent.find('input[class=latitude]').val(place.geometry.location.lat());
            $parent.find('input[class=longitude]').val(place.geometry.location.lng());

            var $db_parent=$parent.parent();

            $db_parent.find('input[class=latitude]').val(place.geometry.location.lat());
            $db_parent.find('input[class=longitude]').val(place.geometry.location.lng());


        } else {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

    });


}