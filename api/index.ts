import Telegraf from 'telegraf';
import { TelegrafContext } from 'telegraf/typings/context'
import { about, greeting } from '../src';
import { ok } from '../src/lib/responses';
import { startBot, setWebhook } from '../src/lib';
import { NowRequest, NowResponse } from '@vercel/node';

export const bot = new Telegraf<TelegrafContext>(process.env.BOT_TOKEN);

bot
	.start((ctx => ctx.reply('This is a test bot.')))
	.command('about', about())
	.on('text', greeting())


if (!process.env.IS_NOW)
	startBot(bot).then(() => {
		console.info('Started bot');
	});

export default async (req: NowRequest, res: NowResponse) => {
await setWebhook(bot)

	if (!req.body) {
		ok(res,'Nothing to see here...');
			return;
	}
	return bot.handleUpdate(req.body, res)

}
