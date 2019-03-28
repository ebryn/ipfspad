import Service from "@ember/service";

export default class IpfsService extends Service {
  node = null;
  Buffer = null;

  async connect() {
    const node = this.node = window.node = new window.Ipfs();
    this.Buffer = node.types.Buffer;

    return new Promise(function(resolve, reject) {
      node.on('ready', () => {
        resolve(node);
      })
    });
  }
}