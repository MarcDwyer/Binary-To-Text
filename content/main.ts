import { ConvertIDPayload, PayloadTypes } from "../shared/payloadTypes";

let lastElement: undefined | Element;

function handleSelection({ clientX, clientY }) {
  const element = document.elementFromPoint(clientX, clientY);
  if (element) {
    lastElement = element;
  }
}

chrome.runtime.onMessage.addListener(({ payload, type }: ConvertIDPayload) => {
  if (lastElement && type === PayloadTypes.convertID) {
    const textContent = lastElement.textContent;
    const replacedText = textContent?.replace(
      payload.binary,
      payload.replacementTxt
    );
    lastElement.textContent = replacedText ?? textContent;
  }
});

// Add event listeners to detect text selection
document.addEventListener("contextmenu", handleSelection);
