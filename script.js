// For parsing the text into Markdown
const { Marked } = globalThis.marked;

// For code highlighting the code in Markdown
const { markedHighlight } = globalThis.markedHighlight;
const { highlightAuto } = globalThis.hljs;

const textAreaElement = document.querySelector(".text-area");
const previewArea = document.querySelector(".markdown-area");

// Event Listeners for Buttons

function downloadMarkdown() {
    // Capture the text from the input text area
    const markdownText = textAreaElement.value;

    // Create a Blob with the markdown text
    const blob = new Blob([markdownText], { type: 'text/markdown' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link for downloading the markdown blob file created above
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';

    // Append the link into the document and click it
    document.body.appendChild(a);
    a.click();

    // Cleanup the link after 100ms
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

function clearMarkdown() {
    // Clear text area
    textAreaElement.value = "";
    // Clear markdown preview text
    previewArea.innerHTML = "";
}

// Markdown Functionality

// Helper function to enable code highlighting
// This appends a class hljs language-<language name> and automatically highlights it based on the language
const markedWithHighlight = new Marked(
    markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code, _lang, _info) {
            return highlightAuto(code).value;
        }
    })
);

// On every keystroke, capture the value in text area and parse it into markdown
textAreaElement.addEventListener("keyup", (e) => {
    previewArea.innerHTML = markedWithHighlight.parse(textAreaElement.value);
})
