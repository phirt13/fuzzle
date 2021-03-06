$(function() {

  var fuzzlePlayers = [];
  var $fuzzlePlayerCards = $('#fuzzle-player-cards');

  var Fuzzler = function(name, options) {
    this.name = name;
    this.email = options.email;
    this.neighborhood = options.neighborhood;
    this.skillLevel = options.skillLevel;
    this.gender = options.gender;
  };

  $.ajax({
    type: 'GET',
    url: '/api/tennis/getUsers',
    datatype: 'json',
    beforeSend: function cleanSlate() {
      $('.fuzzler').each(function() {
        $(this).remove();
      });
    },
    success: function playerCompile(data) {
      console.log('MongoDB says: "awww yeaa!"')
      for(var i = 0; i < data.length; i++) {
        fuzzlePlayers.push(new Fuzzler(data[i].name, {
          email : data[i].basic.email,
          neighborhood : data[i].neighborhood,
          skillLevel : data[i].skillLevel,
          gender : data[i].gender
        }));
      }
      console.log(data);
      console.log(fuzzlePlayers)
    },
    error: function() {
      console.log('MongoDB says: "eff u!"');
    },
    complete: function makeTemplates() {
      console.log(fuzzlePlayers[0].email);
      var fuzzleCards = [];
      for(var i = 0; i < fuzzlePlayers.length; i++) {
        var card = ''
        card += '<section class="bit-2 player_card">';
        card += '<section class="player_card_info">';
        card += '<h1>'+ fuzzlePlayers[i].name + '</h1>';
        card += '<p>Neighborhood: <span class="bold card_info">' + fuzzlePlayers[i].neighborhood + '</span></p>';
        card += '<p>Skill Level: <span class="bold card_info">' + fuzzlePlayers[i].skillLevel + '</span></p>';
        card += '<p>Gender: <span class="bold card_info">' + fuzzlePlayers[i].gender + '</span></p>';
        card += '<a href="mailto:' + fuzzlePlayers[i].email + '?subject=Someone wants to fuzzle with you!">Invite</a>';
        card += '</section>';
        card += '</section>';

        $fuzzlePlayerCards.append(card);
      }
    }
  });

});
