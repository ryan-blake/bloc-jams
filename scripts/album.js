
// Example Album .function pulls info from.
var albumPicasso = {
    title: 'The cool',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/03.png',
    songs: [
      { title: 'Blue', duration: '4:26' },
      { title: 'Green', duration: '3:14' },
      { title: 'Red', duration: '5:01' },
      { title: 'Pink', duration: '3:21'},
      { title: 'Magenta', duration: '2:15'}
    ]
};

// Another Example Album .function pulls info from.
var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
      { title: 'Hello, Operator?', duration: '1:01' },
      { title: 'Ring, ring, ring', duration: '5:01' },
      { title: 'Fits in your pocket', duration: '3:21'},
      { title: 'Can you hear me now?', duration: '3:14' },
      { title: 'Wrong phone number', duration: '2:15'}
    ]
};

var albumRyan = {
    title: 'The microphone',
    artist: 'Parconi',
    label: 'me',
    year: '1990',
    albumArtUrl: 'assets/images/album_covers/05.png',
    songs: [
      { title: 'Hello, sunshine?', duration: '1:01' },
      { title: 'Ring, rang, ring', duration: '5:01' },
      { title: 'Fits in no pockets', duration: '3:21'},
      { title: 'Can we hear me us?', duration: '3:14' },
      { title: 'Wrong tele number', duration: '2:15'}
    ]
};

$(document).ready(function() {

//generates song row content
var createSongRow = function (songNumber, songName, songLength) {

  var template =
     '<tr class="album-view-song-item">'
   + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
   + '  <td class="song-item-title">' + songName + '</td>'
   + '  <td class="song-item-duration">' + songLength + '</td>'
   + '</tr>'
   ;

 var $row = $(template);


 var clickHandler = function() {
   var songNumber = $(this).attr('data-song-number');

   	if (currentlyPlayingSong !== null) {
   		// Revert to song number for currently playing song because user started playing new song.
   		var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
   		currentlyPlayingCell.html(currentlyPlayingSong);
   	}
   	if (currentlyPlayingSong !== songNumber) {
   		// Switch from Play -> Pause button to indicate new song is playing.
   		$(this).html(pauseButtonTemplate);
   		currentlyPlayingSong = songNumber;
   	} else if (currentlyPlayingSong === songNumber) {
   		// Switch from Pause -> Play button to pause currently playing song.
   		$(this).html(playButtonTemplate);
   		currentlyPlayingSong = null;
   	}
  };

 var onHover = function(event) {
   var songNumberCell = $(this).find('.song-item-number');
   var songNumber = songNumberCell.attr('data-song-number');

    if (songNumber !== currentlyPlayingSong) {
        songNumberCell.html(playButtonTemplate);
    }
  };

 var offHover = function(event) {
   var songNumberCell = $(this).find('.song-item-number');
   var songNumber = songNumberCell.attr('data-song-number');

    if (songNumber !== currentlyPlayingSong) {
        songNumberCell.html(songNumber);
    }
  };

  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
    return $row;

};
var currentlyPlayingSong = null;



var setCurrentAlbum = function(album) {
  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');

  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);
  $albumSongList.empty();

    for (var i = 0; i < album.songs.length; i++) {
      var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
             $albumSongList.append($newRow)
      }
};

var child = document.getElementsByClassName('album-view-title')['0'];
var noParent = document.querySelector('html');

// findParentByClassName(child, 'album-view-title');



  setCurrentAlbum(albumPicasso);
  var albums = [albumPicasso, albumMarconi, albumRyan];
  var index = 1;
  var albumImage = document.getElementsByClassName('album-cover-art')[0];

 albumImage.addEventListener("click", function(event) {
    setCurrentAlbum(albums[index]);
     index++;
     if (index == albums.length) {
       index = 0;
     }

  });


  var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
  var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';


});
