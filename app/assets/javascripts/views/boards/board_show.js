TrelloClone.Views.ShowBoard = Backbone.CompositeView.extend({

  template: JST['boards/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync delete', this.render);
  },

  events: {
    'click .add-list': 'addList',
    'submit .add-list': 'addList',

    'submit form.add-card': 'addCard',
  },

  render: function () {
    var lists = this.model.lists();
    this.$el.html(this.template({ board : this.model, lists: lists }));
    return this;
  },

  addList: function (event) {
    event.preventDefault();

    var listTitle = this.$('.list-title').val();
    this.$('.list-title').val('');
    var newList = new TrelloClone.Models.List(
      { 'title': listTitle, 'board_id': this.model.id });
    newList.save({}, {
      success: function () {
        var boardPath = '#boards/' + this.model.id;
        Backbone.history.navigate('dummyDivert'); // Refactor?
        Backbone.history.navigate(boardPath, { trigger: true });
      }.bind(this)
    });
  },

  addCard: function (event) {
    event.preventDefault();
    var cardContent = $(event.currentTarget).serializeJSON();
    var newCard = new TrelloClone.Models.Card(cardContent);
    newCard.save({}, {
      success: function () {
        var boardPath = '#boards/' + this.model.id;
        Backbone.history.navigate('dummyDivert'); // Refactor?
        Backbone.history.navigate(boardPath, { trigger: true });
      }.bind(this)
    });
  }
});
