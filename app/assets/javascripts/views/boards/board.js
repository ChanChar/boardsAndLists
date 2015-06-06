TrelloClone.Views.BoardView = Backbone.View.extend({

  template: JST['boards/board_item'],

  tagName: 'p',
  className: 'board-item',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click .delete-board': 'deleteBoard',
  },

  render: function() {
    this.$el.html(this.template({ board: this.model }));
    return this;
  },

  deleteBoard: function (event) {
    event.preventDefault();

    this.model.destroy();
    this.remove();
  }
});
