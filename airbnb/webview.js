module.exports = Ferdium => {
  // Handle dark mode if needed
  Ferdium.handleDarkMode(isEnabled => {
    // Add dark mode handling if needed
  });

  const getMessages = () => {
    // Find the element containing "unread messages" text
    const unreadTextElement = Array.from(document.querySelectorAll('span')).find(
      el => el.textContent.includes('unread messages')
    );

    if (unreadTextElement) {
      // Get the previous sibling which should contain just the number
      const numberElement = unreadTextElement.previousElementSibling;
      if (numberElement && numberElement.getAttribute('aria-hidden') === 'true') {
        const count = parseInt(numberElement.textContent.trim(), 10);
        if (!isNaN(count)) {
          Ferdium.setBadge(count);
          return;
        }
      }
    }

    // If no count found, set to 0
    Ferdium.setBadge(0);
  };

  // Set up polling for updates
  Ferdium.loop(getMessages);
}; 