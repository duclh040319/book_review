const highlightText = (text, search) => {
    if (!search) {
      return text;
    }
    const regex = new RegExp(search, 'gi');
    return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
  }

  module.exports = {highlightText}