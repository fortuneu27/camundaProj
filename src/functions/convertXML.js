import BpmnModdle from 'bpmn-moddle';

async function convertXML(xml){
  const moddle = new BpmnModdle();
  
  let elementsById = {};
  let adjacencyList = {};

  const {
  rootElement: definitions
  } = await moddle.fromXML(xml);

  definitions.rootElements.forEach(element => {
    if (element.$type === 'bpmn:Process') {
      element.flowElements.forEach(flowElement => {
        elementsById[flowElement.id] = flowElement;
      });
    }
  });

  for (const flowElement of Object.values(elementsById)) {
    adjacencyList[flowElement.id] = {
      incoming: flowElement.incoming ? flowElement.incoming.map(inc => inc.sourceRef.id) : [],
      outgoing: flowElement.outgoing ? flowElement.outgoing.map(out => out.targetRef.id) : []
    };
  }
  return elementsById;
}
export default convertXML;