// album template
var buildCollectionItemTemplate = function() {
    var template =
    '<div class="collection-album-container column fourth">'
  + '  <img src="assets/images/album_covers/03.png"/>'
  + '  <div class="collection-album-info caption">'
  + '    <p>'
  + '      <a class="album-name" href="/album.html"> The Colors </a>'
  + '      <br/>'
  + '      <a href="/album.html"> Pablo Picasso </a>'
  + '      <br/>'
  + '      X songs'
  + '      <br/>'
  + '    </p>'
  + '  </div>'
  + '</div>'
  ;

  return $(template);
};
// add albums to collection page with template variable
$(window).load(function() {
    // #3
    var $collectionContainer = $('.album-covers');
    // #4
    $collectionContainer.empty();

    // #3
    for (var i = 0; i < 12; i++) {
      var $newThumbnail = buildCollectionItemTemplate();
      $collectionContainer.append($newThumbnail);

    }
});
