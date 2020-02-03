//includeHeader();
//includeHTML();
reloadPage();

function reloadPage() {
  if (module.hot) {
    module.hot.accept(function() {
      window.location.reload();
    });
  }
}
