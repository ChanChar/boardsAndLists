TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({

  template: JST['boards/index'],

  tagName: 'div',
  className: 'container text-center',

  initialize: function () {
    this.listenTo(this.collection, 'sync add', this.render);
    this.listenTo(this.collection, 'add', this.addBoardView);
    this.listenTo(this.collection, 'remove', this.removeBoardView);
    this.collection.each(this.addBoardView.bind(this));
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  addBoardView: function (board) {
    var subview = new TrelloClone.Views.BoardView({ model: board });
    this.addSubview('ul.board-index', subview);
  },

  removeBoardView: function (board) {
    this.removeModelSubview('ul.board-index', board);
  }

});
