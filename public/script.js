const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");
const sampleButton = document.getElementById("sample-button");

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);
sampleButton.addEventListener("click", insertSampleText);

// Disable the submit button by default when the user loads the website
submitButton.disabled = true;

function verifyTextLength(e) {
    const textarea = e.target;

    if (textarea.value.length >= 200 && textarea.value.length <= 100000) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

function insertSampleText() {
    const sampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Curabitur porta ligula in facilisis consequat. Aenean ut quam fringilla, dapibus risus in, pretium sem. Nulla facilisi. Sed egestas orci quis ligula volutpat, et facilisis libero tincidunt.";
    textArea.value = sampleText;

    // Trigger input event to enable the Summarize button if conditions are met
    const event = new Event('input');
    textArea.dispatchEvent(event);
}

function submitData(e) {
    e.preventDefault(); // Prevent the default form submission

    submitButton.classList.add("submit-button--loading");

    const text_to_summarize = textArea.value;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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" // Replace with your actual token
        },
        body: JSON.stringify({
            "inputs": text_to_summarize,
            "parameters": { "max_length": 100, "min_length": 30 }
        }),
        redirect: "follow"
    };

    fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Parse response as JSON
        })
        .then(data => {
            summarizedTextArea.value = data[0].summary_text; // Adjust based on API response structure
            submitButton.classList.remove("submit-button--loading");
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            summarizedTextArea.value = "An error occurred. Please try again.";
            submitButton.classList.remove("submit-button--loading");
        });
}

