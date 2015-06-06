TrelloClone.Views.NewBoard = Backbone.CompositeView.extend({

  template: JST['boards/new_board'],

  initialize: function () {
  },

  events: {
    'submit form': 'createBoard',
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  createBoard: function (event) {
    event.preventDefault();

    var boardTitle = this.$('.board-title').val();
    var newBoard = new TrelloClone.Models.Board({ 'title': boardTitle });

    newBoard.save({}, {
      success: function () {
        this.collection.add(newBoard);
        var boardPath = '#boards/' + newBoard.id;
        Backbone.history.navigate(boardPath, { trigger: true });
      }.bind(this)
    });

  },

});
