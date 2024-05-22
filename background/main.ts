import { ConvertIDPayload, PayloadTypes } from "../shared/payloadTypes";
import { ASCIITable } from "../shared/ASCIITable";
import { checkIfValidBinary } from "../shared/checkIfValidBinary";

function binaryToText(binaryText: string): string {
  let text = "";
  const binaryList = binaryText.split(" ");

  for (const binary of binaryList) {
    // Parse the binary byte as an integer with base 2
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
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!info.selectionText) return;
  if (!checkIfValidBinary(info.selectionText)) return;
  const binaryTxt = info.selectionText;
  const replacementTxt = binaryToText(binaryTxt);
  const data: ConvertIDPayload = {
    type: PayloadTypes.convertID,
    payload: { replacementTxt, binary: binaryTxt },
  };
  chrome.tabs.sendMessage(tab?.id ?? -1, data);
});
