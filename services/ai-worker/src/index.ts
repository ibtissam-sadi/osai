const loop = () => {
  console.log('[ai-worker] polling ai.jobs queue and executing batches...');
};
setInterval(loop, 10000);
loop();
