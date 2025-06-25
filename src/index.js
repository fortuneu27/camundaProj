import express from 'express';
import FetchBPMNXML from './functions/fetchBPMNXML.js';
import convertXML from './functions/convertXML.js';
import findRoute from './functions/findRoute.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/path', async (req, res) => {
  const { from, to } = req.query;
  if (!from || !to) {
    return res.status(400).send({ error: 'Missing from or to' });
  }
  let bpmnResult = await FetchBPMNXML();
  let bpmnElements = await convertXML(bpmnResult.bpmn20Xml);

  if (Object.keys(bpmnElements).includes(from) === false || Object.keys(bpmnElements).includes(to) === false) {
    return res.status(404).send({ from, to, error: 'No path found' });
  }

  let path = findRoute(bpmnElements, from, to);
  if (path) {
    res.send({ from, to, path });
  } else {
    res.status(404).send({ from, to, error: 'No path found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
