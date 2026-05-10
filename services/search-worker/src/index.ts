const loop = () => {
  console.log('[search-worker] syncing document updates to Elasticsearch + vectors...');
};
setInterval(loop, 12000);
loop();
