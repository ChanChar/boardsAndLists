TrelloClone.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.boards = new TrelloClone.Collections.Boards();
  },

  routes: {
    '': 'boardIndex',
    'boards/new': 'createBoard',
    'boards/:id': 'showBoard',
  },

  boardIndex: function () {
    this.boards.fetch();
    var boardsView = new TrelloClone.Views.BoardsIndex({ collection: this.boards });
    this._swapView(boardsView);
  },

  createBoard: function () {
    this.boards.fetch();
    var newBoardView = new TrelloClone.Views.NewBoard({ collection: this.boards });
    this._swapView(newBoardView);
  },

  showBoard: function (id) {
    var board = this.boards.getOrFetch(id);
    var showBoardView = new TrelloClone.Views.ShowBoard({ model: board });
    this._swapView(showBoardView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
