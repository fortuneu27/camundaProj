async function FetchBPMNXML() {
  const response = await fetch(`https://n35ro2ic4d.execute-api.eu-central-1.amazonaws.com/prod/engine-rest/process-definition/key/invoice/xml`);
  if (!response.ok) {
    throw new Error('Error fetching BPMN XML: ' + response.statusText);
  }
  const data = await response.json();
  return data;
}
export default FetchBPMNXML;