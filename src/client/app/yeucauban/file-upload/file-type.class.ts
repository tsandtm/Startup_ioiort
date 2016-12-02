export class FileType { 
  /* PSD */
  public static mime_psd:string[] = [
    'image/photoshop',
    'image/x-photoshop',
    'image/psd',
    'application/photoshop',
    'application/psd',
    'zz-application/zz-winassoc-psd'
  ];


  public static getMimeClass(file:any):string {
    let mimeClass = 'application';
    if (this.mime_psd.indexOf(file.type) !== -1) {
      mimeClass = 'image';
    } else if (file.type.match('image.*')) {
      mimeClass = 'image';
    
    } else if (file.type.match('audio.*')) {
      mimeClass = 'audio';
    } else if (file.type === 'application/pdf') {
      mimeClass = 'pdf';
    }
    if (mimeClass === 'application') {
      mimeClass = this.fileTypeDetection(file.name);
    }

    return mimeClass;
  }

  public static fileTypeDetection(inputFilename:string):string {
    let types:{[key:string]:string} = {
      'jpg': 'image',
      'jpeg': 'image',
      'tif': 'image',
      'psd': 'image',
      'bmp': 'image',
      'png': 'image',
      'nef': 'image',
      'tiff': 'image',
      'cr2': 'image',
      'dwg': 'image',
      'cdr': 'image',
      'ai': 'image',
      'indd': 'image',
      'pin': 'image',
      'cdp': 'image',
      'skp': 'image',
      'stp': 'image',
      '3dm': 'image',
      'mp3': 'audio',
      'wav': 'audio',
      'wma': 'audio',
      'mod': 'audio',
      'm4a': 'audio',
    };

    let chunks = inputFilename.split('.');
    if (chunks.length < 2) {
      return 'application';
    }
    let extension = chunks[chunks.length - 1].toLowerCase();
    if (types[extension] === undefined) {
      return 'application';
    } else {
      return types[extension];
    }
  }
}
