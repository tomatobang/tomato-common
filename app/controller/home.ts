'use strict';
import { Controller } from 'egg';

export default class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;

    // 获得HelloService实例
    const helloService = ctx.grpc.demo.helloService;

    // 向服务端发送请求
    const result = await helloService.sayHello({
      code: '0',
      message: '来自Node客户端的OK',
    });

    // 打印服务端响应内容
    console.log(result);
    ctx.body = result;
    // this.ctx.body = 'hi, ' + this.app.plugins.consul.name;
  
}

/** TEST: unregister consul */
// unregister() {
//   const { app, ctx } = this;
//   ctx.status = 200;
//   app.consul.agent.service.deregister('tomato-server');
//   app.logger.info('服务关闭解除注册');
// }

/**
 * mock producer
 */
async publish() {
  let err = await this.app.rabbitmq.get('producer').publish("Test_Exchange", "Test", Buffer.from(JSON.stringify({
    aa: Math.random() + 'i am'
  })), { persistence: true, mandatory: true });
  if (err) {
    console.log("Publish msg failed, error:", err);
    throw ("could not publish message");
  }

  // let msg = await this.app.rabbitmq.get('consumer').get("Test_Queue", {});
  // await this.app.rabbitmq.get('consumer').ack(msg);

  this.ctx.body = 'ok';//JSON.parse(msg.content);
}

/**
 * mock consumer
 */
async receive() {
  // let msg = await this.app.rabbitmq.get('consumer').get("Test_Queue", {});
  // await this.app.rabbitmq.get('consumer').ack(msg);

  await this.app.rabbitmq.get('consumer').consumer('Test_Queue', async (MSG) => {
    console.log(JSON.parse(MSG.content));
    await this.app.rabbitmq.get('consumer').ack(MSG);
  }, {});

  this.ctx.body = 'ok';//JSON.parse(msg.content);
}


}
