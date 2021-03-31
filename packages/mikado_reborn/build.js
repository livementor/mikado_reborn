// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

async function getFigmaObjTree(figmaApiKey, figmaId) {
  axios.get(`https://api.figma.com/v1/files/${figmaId}`, {
    headers: {
      'X-Figma-Token': figmaApiKey,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      const result = res.data;
      console.log(JSON.stringify(result));
    })
    .catch((err) => {
      console.log('errors');
      console.log(err);
    });
}
getFigmaObjTree('180099-fa13d4ce-ef8e-4a17-92c1-a51e6bdc61d5', 't3Tz3tkERrOwg42esRbLeH');
