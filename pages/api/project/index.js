import handler from '../../../backend/utils/api/handler';

export default async function(req, res) {
  //console.log("FIRST HANDLER")
  await handler(req, res);
}