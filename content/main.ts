import { CONVERT_ID } from "../shared/identifiers";
import { ConvertIDPayload, PayloadTypes } from "../shared/payloadTypes";
import { generateRandomString } from "../util/generateRandomString";

let lastElement: undefined | Element;

function handleSelection({ clientX, clientY }) {
  const element = document.elementFromPoint(clientX, clientY);
  if (element) {
    lastElement = element;
  }
}

chrome.runtime.onMessage.addListener(({ payload, type }: ConvertIDPayload) => {
  if (lastElement && type === PayloadTypes.convertID) {
    lastElement.textContent = payload.replacementTxt;
  }
});

// Add event listeners to detect text selection
document.addEventListener("contextmenu", handleSelection);
