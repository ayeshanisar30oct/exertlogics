import handler from './handler';

export default async function(req, res) {
  await handler(req, res);
}