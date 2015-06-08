TrelloClone.Views.ShowBoard = Backbone.CompositeView.extend({

  template: JST['boards/show'],

  className: 'container',

  initialize: function () {
    this.lists = this.model.lists();

    this.listenTo(this.model, 'sync delete', this.render);
    this.listenTo(this.lists, 'remove', this.removeListView);
    this.listenTo(this.lists, 'add', this.addListView);

    this.lists.each(this.addListView.bind(this));
  },

  events: {
    'click button.add-list': 'addList',
    'submit .add-list': 'addList',
  },

  render: function () {
    this.$el.html(this.template({ board : this.model }));
    this.attachSubviews();
    return this;
  },

  addList: function (event) {
    event.preventDefault();
    // refactor to use serializeJSON
    var listTitle = this.$('.list-title').val();
    this.$('.list-title').val('');
    var newList = new TrelloClone.Models.List(
      { 'title': listTitle, 'board_id': this.model.id });
    newList.save({}, {
      success: function () {
        var boardPath = '#boards/' + this.model.id;
        Backbone.history.navigate('dummyDivert');
        Backbone.history.navigate(boardPath, { trigger: true });
      }.bind(this)
    });
  },

  addListView: function (list) {
    var listSubview = new TrelloClone.Views.ListShow({ model: list });
    this.addSubview('div.board-lists', listSubview);
  },

  removeListView: function (list) {
    this.removeModelSubview("div.board-lists", list);
  }

});
