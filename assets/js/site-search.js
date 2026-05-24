(function () {
  var resultsEl = document.getElementById("search-results");
  var params = new URLSearchParams(window.location.search);
  var query = (params.get("q") || "").trim().toLowerCase();
  var searchInput = document.getElementById("_search-input");

  if (searchInput && query) {
    searchInput.value = query;
  }

  if (!resultsEl) {
    return;
  }

  if (!query) {
    resultsEl.innerHTML = "<p>Enter a search term in the top bar.</p>";
    return;
  }

  var base = window._baseURL || "/";
  var jsonUrl = base.replace(/\/$/, "") + "/search.json";

  fetch(jsonUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (items) {
      var matches = items.filter(function (item) {
        var title = (item.title || "").toLowerCase();
        var content = (item.content || "").toLowerCase();
        return title.indexOf(query) !== -1 || content.indexOf(query) !== -1;
      });

      if (!matches.length) {
        resultsEl.innerHTML = "<p>No results found for <strong>" + escapeHtml(query) + "</strong>.</p>";
        return;
      }

      var list = ["<ul>"];
      matches.slice(0, 20).forEach(function (item) {
        var snippet = makeSnippet(item.content || "", query);
        list.push(
          "<li><a href='" + item.url + "'>" +
            escapeHtml(item.title || item.url) +
            "</a><p>" + escapeHtml(snippet) + "</p></li>"
        );
      });
      list.push("</ul>");

      resultsEl.innerHTML =
        "<p>Found " + matches.length + " result(s) for <strong>" + escapeHtml(query) + "</strong>.</p>" +
        list.join("");
    })
    .catch(function () {
      resultsEl.innerHTML = "<p>Search index failed to load. Try refreshing the page.</p>";
    });

  function makeSnippet(text, term) {
    var clean = text.replace(/\s+/g, " ").trim();
    if (!clean) {
      return "";
    }

    var lower = clean.toLowerCase();
    var idx = lower.indexOf(term);
    if (idx === -1) {
      return clean.slice(0, 180) + (clean.length > 180 ? "..." : "");
    }

    var start = Math.max(0, idx - 70);
    var end = Math.min(clean.length, idx + term.length + 110);
    var snippet = clean.slice(start, end);
    if (start > 0) {
      snippet = "..." + snippet;
    }
    if (end < clean.length) {
      snippet += "...";
    }
    return snippet;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
})();
