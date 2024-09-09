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
    submitButton.classList.add("submit-button--loading");

    const text_to_summarize = textArea.value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer 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");

    const raw = JSON.stringify({
        "text_to_summarize": text_to_summarize
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch('/summarize', requestOptions)
        .then(response => response.text())
        .then(summary => {
            summarizedTextArea.value = summary;
            submitButton.classList.remove("submit-button--loading");
        })
        .catch(error => {
            console.log(error.message);
        });
}
