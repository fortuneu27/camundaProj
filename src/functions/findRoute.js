function findRoute(elements, startId, endId) {
  const visited = new Set();
  const stack = [{ id: startId, path: [startId] }];

  while (stack.length > 0) {
    const { id, path } = stack.pop();
    if (id === endId) return path;

    if (!visited.has(id)) {
      visited.add(id);
      const element = elements[id];
      if (element && element.outgoing) {
        for (const out of element.outgoing) {
          stack.push({ id: out.targetRef.id, path: [...path, out.targetRef.id] });
        }
      }
    }
  }
  return null;
}

export default findRoute;