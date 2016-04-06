
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


//generates song row content
var createSongRow = function (songNumber, songName, songLength) {

  var template =
     '<tr class="album-view-song-item">'
   + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
   + '  <td class="song-item-title">' + songName + '</td>'
   + '  <td class="song-item-duration">' + songLength + '</td>'
   + '</tr>'
   ;

  return template;

};



var setCurrentAlbum = function(album) {
  var albumTitle = document.getElementsByClassName('album-view-title')[0];
  var albumArtist = document.getElementsByClassName('album-view-artist')[0];
  var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
  var albumImage = document.getElementsByClassName('album-cover-art')[0];
  var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

    albumTitle.textContent = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);

    albumSongList.innerHTML = '';

    for (var i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    }
};

var child = document.getElementsByClassName('album-view-title')['0'];
var noParent = document.querySelector('html');

var findParentByClassName = function(element, targetClass)  {
    if (element) {
        var currentParent = element.parentElement;
        while (currentParent.className != targetClass) {
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }
};


findParentByClassName(child, 'album-view-title');

var getSongItem = function(element) {
   switch (element.className) {
     case 'album-song-button':
     case 'ion-play':
     case 'ion-pause':
        return findParentByClassName(element, 'song-item-number');
     case 'album-view-song-item':
        return element.querySelector('.song-item-number');
     case 'song-item-title':
     case 'song-item-duration':
       return findParentByClassName(element, 'album-view-song-item').querySelector('song-item-number');
     case 'song-item-number':
       return element;
    default:
      return;
   }
};

var clickHandler = function(targetElement) {

  var songItem = getSongItem(targetElement);

   if (currentlyPlayingSong === null) {
       songItem.innerHTML = pauseButtonTemplate;
       currentlyPlayingSong = songItem.getAttribute('data-song-number');
   } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
       songItem.innerHTML = playButtonTemplate;
       currentlyPlayingSong = null;
   } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
       var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
       currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
       songItem.innerHTML = pauseButtonTemplate;
       currentlyPlayingSong = songItem.getAttribute('data-song-number');
   }

};


window.onload = function() {

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

  var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
// created after setCurrentAlbum runs
  var songRows = document.getElementsByClassName('album-view-song-item');

  var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

  var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
  var currentlyPlayingSong = null;


  songListContainer.addEventListener('mouseover', function(event) {

    if (event.target.parentElement.className === 'album-view-song-item') {
      var songItem = getSongItem(event.target);
      if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
        songItem.innerHTML = playButtonTemplate;
      }
    }
  });


  for (var i = 0; i < songRows.length; i++) {
    songRows[i].addEventListener('mouseleave', function(event) {
      var songItem = getSongItem(event.target);
      var songItemNumber = songItem.getAttribute('data-song-number');

      if (songItemNumber !== currentlyPlayingSong) {
           songItem.innerHTML = songItemNumber;
      }

  });

    songRows[i].addEventListener('click', function(event) {
      clickHandler(event.target);
    });
  }
};
