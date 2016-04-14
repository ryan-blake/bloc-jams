$(document).ready(function() {

//generates song row content
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

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
      currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
      updatePlayerBarSong();
   	} else if (currentlyPlayingSong === songNumber) {
   		// Switch from Pause -> Play button to pause currently playing song.
   		$(this).html(playButtonTemplate);
      $('.main-controls .play-pause').html(playerBarPlayButton);
// check if below is necessary. also monitor if new null interchangable
   		currentlyPlayingSong = null;
      // ^^^
      currentlyPlayingSongNumber = null;
      currentSongFromAlbum = null;

   	}
  };

 var onHover = function(event) {

   var songNumberCell = $(this).find('.song-item-number');
   var songNumber = parseInt($(this).attr('data-song-number'));

    if (songNumber !== currentlyPlayingSong) {
        songNumberCell.html(playButtonTemplate);
    }
  };

 var offHover = function(event) {
   var songNumberCell = $(this).find('.song-item-number');
   var songNumber = parseInt(songNumberCell.attr('data-song-number'));
    if (songNumber !== currentlyPlayingSong) {
        songNumberCell.html(songNumber);
    }
  };

  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
    return $row;

};

var currentlyPlayingSong = null;
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;



var setCurrentAlbum = function(album) {
  currentAlbum = album;
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

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
// updates the HTML of the play/pause button to the content of playerBarPauseButton
    $('.main-controls .play-pause').html(playerBarPauseButton);

};

var child = document.getElementsByClassName('album-view-title')['0'];
var noParent = document.querySelector('html');

// findParentByClassName(child, 'album-view-title');



  setCurrentAlbum(albumPicasso);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);

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
  var playerBarPlayButton = '<span class="ion-play"></span>';
  var playerBarPauseButton = '<span class="ion-pause"></span>';


  var nextSong = function() {

      var getLastSongNumber = function(index) {
          return index == 0 ? currentAlbum.songs.length : index;
      };

      var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
      // Note that we're _incrementing_ the song here
      currentSongIndex++;

      if (currentSongIndex >= currentAlbum.songs.length) {
          currentSongIndex = 0;
      }

      // Set a new current song
      currentlyPlayingSongNumber = currentSongIndex + 1;
      currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

      // Update the Player Bar information
      $('.currently-playing .song-name').text(currentSongFromAlbum.title);
      $('.currently-playing .artist-name').text(currentAlbum.artist);
      $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
      $('.main-controls .play-pause').html(playerBarPauseButton);

      var lastSongNumber = getLastSongNumber(currentSongIndex);
      var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
      var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

      $nextSongNumberCell.html(pauseButtonTemplate);
      $lastSongNumberCell.html(lastSongNumber);

  };


  var previousSong = function() {

      // Note the difference between this implementation and the one in
      // nextSong()
      var getLastSongNumber = function(index) {
          return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
      };

      var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
      // Note that we're _decrementing_ the index here
      currentSongIndex--;

      if (currentSongIndex < 0) {
          currentSongIndex = currentAlbum.songs.length - 1;
      }

      // Set a new current song
      currentlyPlayingSongNumber = currentSongIndex + 1;
      currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

      // Update the Player Bar information
      $('.currently-playing .song-name').text(currentSongFromAlbum.title);
      $('.currently-playing .artist-name').text(currentAlbum.artist);
      $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
      $('.main-controls .play-pause').html(playerBarPauseButton);

      var lastSongNumber = getLastSongNumber(currentSongIndex);
      var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
      var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

      $previousSongNumberCell.html(pauseButtonTemplate);
      $lastSongNumberCell.html(lastSongNumber);

  };

});
