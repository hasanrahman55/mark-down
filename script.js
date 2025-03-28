document.addEventListener("DOMContentLoaded", function () {
  const textarea = document.getElementById("markdown-input");
  const preview = document.getElementById("preview");
  const clearBtn = document.getElementById("clear-btn");

  function parseMarkdown(text) {
    let html = text
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/\*\*(.*?)\*\*/gim, "<b>$1</b>")
      .replace(/\*(.*?)\*/gim, "<i>$1</i>")
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
      .replace(/\n{2,}/g, "<br><br>"); // Adds extra breaks for paragraphs

    // Handle Unordered Lists
    html = html.replace(/(?:\n|^)(- .*)/gim, function (match) {
      return "<ul><li>" + match.split("\n").join("</li><li>") + "</li></ul>";
    });

    // Handle Ordered Lists
    html = html.replace(/(?:\n|^)(\d+\..*)/gim, function (match) {
      return "<ol><li>" + match.split("\n").join("</li><li>") + "</li></ol>";
    });

    return html;
  }

  function updatePreview() {
    preview.innerHTML = parseMarkdown(textarea.value);
  }

  textarea.addEventListener("input", updatePreview);

  clearBtn.addEventListener("click", function () {
    textarea.value = "";
    preview.innerHTML = "";
  });

  updatePreview();
});
