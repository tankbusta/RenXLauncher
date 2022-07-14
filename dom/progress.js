export class Progress extends Object {
  is_in_progress=false;
  current_action = "";

  total_progress_done = "0";
  progressbars = [];

  data;

  constructor(props) {
    super(props);
  }

  failure_callback() {
    globalThis.progress.is_in_progress = false;
    globalThis.callback_service.publish("progress", globalThis.progress);
  }

  success_callback() {
    globalThis.progress.is_in_progress = false;
    globalThis.callback_service.publish("progress", globalThis.progress);
  }

  callback(progress) {
      globalThis.progress.data = progress;
      globalThis.progress.process_progress(progress);
      globalThis.callback_service.publish("progress", globalThis.progress);
  }

  process_progress(progress) {
    if(Object.keys(progress).length == 5) {
      var download_progress = (progress.download.bytes.maximum != 0) ? progress.download.bytes.value * 100 / progress.download.bytes.maximum : 0.0;

      if (progress.download.bytes.maximum != 0 && progress.hash.maximum == 0) {
        var processed_instructions = 100;
      } else {
        var processed_instructions = (progress.hash.maximum != 0) ? progress.hash.value * 100 / progress.hash.maximum : 0;
      }
      var patch_progress = (progress.patch.maximum != 0) ? progress.patch.value * 100 / progress.patch.maximum : 0;
      
      this.is_in_progress = true;
      this.current_action = progress["action"];
      this.total_progress_done = (processed_instructions + download_progress + patch_progress) / 3;
    }
  }
}