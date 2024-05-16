import { ConvertIDPayload, PayloadTypes } from "../shared/payloadTypes";
import { ASCIITable } from "../shared/ASCIITable";

function binaryToText(binaryText: string): string {
  // Parse the binary byte as an integer with base 2
  let text = "";
  const binaryList = binaryText.split(" ");

  for (const binary of binaryList) {
    const decimal = parseInt(binary, 2);
    text += ASCIITable.get(decimal);
  }
  return text;
}

chrome.contextMenus.create({
  id: "1",
  title: "Convert Binary to Text",
  contexts: ["selection"],
});
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const binaryTxt = info.selectionText ?? "1011";
  const replacementTxt = binaryToText(binaryTxt);
  const data: ConvertIDPayload = {
    type: PayloadTypes.convertID,
    payload: { replacementTxt },
  };
  chrome.tabs.sendMessage(tab?.id ?? -1, data);
});
