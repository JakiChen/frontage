// Google map
function initMap() {

	var latlng = new google.maps.LatLng( 35.667988, 139.753367 );
	var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 16.7,
			center: latlng
	});

	//设置标记
	var marker = new google.maps.Marker({
			position: latlng,
			animation: google.maps.Animation.DROP,
			map: map,
			icon: '/common/img/about/icon-map.png'
	});
}
