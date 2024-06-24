import handler, { config } from './project-handler';

export { config }

export default async function (req, res) {
    await handler(req, res);
}