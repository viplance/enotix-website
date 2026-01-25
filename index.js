const promptInput = document.getElementById('prompt-input');
const sendButton = document.getElementById('send-button');
const resultContainer = document.getElementById('result-container');

async function sendPrompt() {
  const prompt = promptInput.value.trim();
  if (!prompt) return;

  const originalPlaceholder = promptInput.placeholder;
  promptInput.value = '';
  promptInput.disabled = true;
  promptInput.placeholder = 'Thinking...';
  sendButton.disabled = true;
  sendButton.classList.add('loading');

  try {
    const response = await fetch(
      `http://localhost:3007/enotix?prompt=${encodeURIComponent(prompt)}`,
    );

    if (!response.ok) throw new Error('Network response was not ok');
    const html = await response.text();

    // The response might be wrapped in ```html ... ``` or just be the HTML
    let cleanHtml = html;

    if (html.includes('```html')) {
      cleanHtml = html.split('```html')[1].split('```')[0].trim();
    } else if (html.includes('```')) {
      cleanHtml = html.split('```')[1].trim();
    }

    resultContainer.innerHTML = cleanHtml;
    resultContainer.classList.add('visible');
  } catch (error) {
    console.error('Error fetching response:', error);
    resultContainer.innerHTML = `<div class="error-msg">Failed to get response. Is the server running?</div>`;
    resultContainer.classList.add('visible');
  } finally {
    promptInput.disabled = false;
    promptInput.placeholder = originalPlaceholder;
    sendButton.disabled = false;
    sendButton.classList.remove('loading');
    promptInput.focus();
  }
}

sendButton.addEventListener('click', sendPrompt);
promptInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendPrompt();
  }
});
