const loop = () => {
  console.log('[workflow-worker] processing approvals, escalations and notifications...');
};
setInterval(loop, 8000);
loop();
