export class Runner {
  ctx;
  constructor(ctx) {
    this.ctx = ctx;
  }
  public performHeavyConstruction(x = 3) {
    this.ctx.logger.log(`Performing heavy construction: ${x}`);
    return x;
  }
  public performHeavyTransformation(x) {
    const y = x * x;
    this.ctx.logger.log(`Performing heavy transformation: ${x} -> ${y}`);
    return y;
  }
}
