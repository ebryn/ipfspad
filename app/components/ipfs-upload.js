import Component from "@glimmer/component";
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class IpfsUpload extends Component {
  @service ipfs

  @tracked path;
  @tracked text;

  @action async saveText(e) {
    let content = this.ipfs.Buffer.from(this.text);
    let [{path}] = await this.ipfs.node.add(content);
    this.path = path;
  }


  @action async onchange(e) {
    let file = e.target.files[0];
    let contents = await read(file);
    let content = this.ipfs.Buffer.from(contents);
    let [{path}] = await this.ipfs.node.add(content);
    this.path = path;
  }
}

function read(file) {
  return new Promise(function(resolve, reject) {
    let reader = new FileReader();
    reader.onload = function(event) { resolve(event.target.result); };
    reader.onerror = function(event) { reject(error); }
    reader.readAsText(file);
  });
}