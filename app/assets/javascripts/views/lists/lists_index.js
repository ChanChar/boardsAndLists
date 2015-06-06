TrelloClone.Views.ListsIndex = Backbone.View.extend({

  template: JST['lists/index'],

  render: function () {
    this.$el.html(this.template());
    return this;
  },

});
